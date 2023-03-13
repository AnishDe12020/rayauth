import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { useEffect, useMemo } from "react";
import { Buffer } from "buffer";

import { IDL, DappHunt } from "../types/dapp_hunt";
import useAuth from "./useAuth";
import useTxModal from "./useTxModal";
import { useSessionProgram } from "./useSessionProgram";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import base58 from "bs58";
import { toast } from "sonner";

export const DAPP_HUNT_PROGRAM_ID =
  "8JajHSCMD6p7XoPLe8sMCM6x41sURpT1WZT4JcA3Ffsc";
export const GASLESS_PUBKEY = new PublicKey(
  "5xALDevGgZVpwEs8d2Miyu9cAhvjkg2sumKiBjm7ZaJY"
);

export const useDappHuntProgram = () => {
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);
  const { user } = useAuth();
  const { signTransaction, signAllTransactions } = useTxModal();

  const { sessionKeypair, sessionProgram } = useSessionProgram();

  useEffect(() => {
    window.Buffer = Buffer;
  });

  const anchorWallet = useMemo(() => {
    if (!user?.address) return;

    return {
      publicKey: new PublicKey(user.address),
      signTransaction: signTransaction,
      signAllTransactions: signAllTransactions,
    };
  }, [user]);

  const anchorProvider = useMemo(() => {
    if (!anchorWallet) return;

    return new AnchorProvider(connection, anchorWallet as any, {
      commitment: "confirmed",
    });
  }, [connection, anchorWallet]);

  console.log("anchorWallet", anchorWallet);
  console.log("anchorProvider", anchorProvider);

  const dappHuntProgram: Program<DappHunt> | undefined = useMemo(() => {
    if (!anchorProvider) return;

    return new Program(IDL, DAPP_HUNT_PROGRAM_ID, anchorProvider);
  }, [anchorProvider]);

  const postNewProduct = async (
    productName: string,
    makerTwitter: string,
    twitterUrl: string,
    websiteUrl: string,
    logoUrl: string,
    description: string
  ) => {
    if (!sessionKeypair) {
      throw new Error("No session keypair");
    }

    if (!dappHuntProgram) {
      throw new Error("No dapp hunt program");
    }

    if (!sessionProgram) {
      throw new Error("No session program");
    }

    const [sessionKeyPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      sessionProgram.programId
    );

    const [productPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    const productIx = await dappHuntProgram.methods
      .createProduct(
        makerTwitter,
        productName,
        description,
        logoUrl,
        websiteUrl,
        twitterUrl
      )
      .accounts({
        hunterSigner: sessionKeyPda,
        payer: GASLESS_PUBKEY,
        product: productPda,
        signer: sessionKeypair.publicKey,
      })
      .instruction();

    const tx = new Transaction({
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      feePayer: GASLESS_PUBKEY,
    }).add(productIx);

    tx.partialSign(sessionKeypair);

    const signedTx = await anchorWallet?.signTransaction(tx);

    if (!signedTx) return;

    const {
      data: { txid },
    } = await axios.post(`${BACKEND_URL}/gasless`, {
      transaction: base58.encode(
        (signedTx as Transaction).serialize({ requireAllSignatures: false })
      ),
    });

    toast.success("Product hunted successfully", {
      action: {
        label: "View Transaction",
        onClick: () =>
          window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`),
      },
    });

    return;
  };

  const upvoteProduct = async (productName: string) => {
    if (!sessionKeypair) {
      throw new Error("No session keypair");
    }

    if (!dappHuntProgram) {
      throw new Error("No dapp hunt program");
    }

    if (!sessionProgram) {
      throw new Error("No session program");
    }

    if (!anchorWallet) {
      throw new Error("No anchor wallet");
    }

    const [sessionKeyPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("session_key"), sessionKeypair.publicKey.toBuffer()],
      sessionProgram.programId
    );

    const [productPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("product"), Buffer.from(productName)],
      dappHuntProgram.programId
    );

    const [upvotePda] = await PublicKey.findProgramAddress(
      [
        Buffer.from("upvote"),
        Buffer.from(productName),
        anchorWallet?.publicKey.toBuffer(),
      ],
      dappHuntProgram.programId
    );

    const upvoteIx = await dappHuntProgram.methods
      .upvoteProduct()
      .accounts({
        payer: GASLESS_PUBKEY,
        product: productPda,
        voterSigner: sessionKeyPda,
        signer: sessionKeypair.publicKey,
        upvoteAccount: upvotePda,
      })
      .instruction();

    const tx = new Transaction({
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      feePayer: GASLESS_PUBKEY,
    }).add(upvoteIx);

    tx.partialSign(sessionKeypair);

    const signedTx = await anchorWallet?.signTransaction(tx);

    if (!signedTx) return;

    const {
      data: { txid },
    } = await axios.post(`${BACKEND_URL}/gasless`, {
      transaction: base58.encode(
        (signedTx as Transaction).serialize({ requireAllSignatures: false })
      ),
    });

    toast.success("Product upvoted successfully", {
      action: {
        label: "View Transaction",
        onClick: () =>
          window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`),
      },
    });
  };

  return {
    dappHuntProgram,
    postNewProduct,
    upvoteProduct,
  };
};
