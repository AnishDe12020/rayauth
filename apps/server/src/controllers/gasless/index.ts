import {
  Connection,
  Keypair,
  sendAndConfirmRawTransaction,
  Transaction,
} from "@solana/web3.js";
import base58 from "bs58";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { validateTransaction } from "../../helpers/validateTransaction";

export const connection = new Connection(
  //   "https://api.mainnet-beta.solana.com/",
  "https://api.devnet.solana.com/",
  { commitment: "confirmed" }
);

const handleGasless = async (req: Request, res: Response) => {
  const clientSecret = req.headers["x-client-secret"];

  if (!clientSecret) {
    res.status(400).send({
      status: "error",
      message: "request should contain client secret",
    });
    return;
  }

  const clientSecretDb = await prisma.clientSecret.findUnique({
    where: {
      key: clientSecret as string,
    },
  });

  if (!clientSecretDb) {
    res.status(400).send({
      status: "error",
      message: "client secret is invalid",
    });
    return;
  }

  const gasTank = await prisma.gasTank.findUnique({
    where: {
      projectId: clientSecretDb.projectId,
    },
  });

  if (!gasTank) {
    res.status(400).send({
      status: "error",
      message: "gas tank is not found",
    });
    return;
  }

  const feePayer = Keypair.fromSecretKey(base58.decode(gasTank.privateKey));

  const serialized = req.body?.transaction;

  if (typeof serialized !== "string") {
    res
      .status(400)
      .send({ status: "error", message: "request should contain transaction" });
    return;
  }

  let transaction: Transaction;
  try {
    transaction = Transaction.from(base58.decode(serialized));
  } catch (e) {
    res
      .status(400)
      .send({ status: "error", message: "can't decode transaction" });
    return;
  }

  console.log("transaction", transaction);

  let signature: string;
  try {
    signature = (
      await validateTransaction(connection, transaction, feePayer, 2, 5000)
    ).signature;
  } catch (e) {
    res.status(400).send({ status: "error", message: "bad transaction" });
    return;
  }

  try {
    await connection.simulateTransaction(transaction);
  } catch (e) {
    res.status(400).send({ status: "error", message: "simulation failed" });
    return;
  }

  transaction.addSignature(
    feePayer.publicKey,
    Buffer.from(base58.decode(signature))
  );

  console.log("txBefore", transaction);

  const txid = await sendAndConfirmRawTransaction(
    connection,
    transaction.serialize(),
    { commitment: "confirmed" }
  );

  res.status(200).json({ status: "ok", txid });
};

export default handleGasless;
