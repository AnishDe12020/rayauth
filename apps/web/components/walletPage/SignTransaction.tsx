import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";
import { useRouter } from "next/router";
import React from "react";
import bs58 from "bs58";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

import { Keypair, Transaction } from "@solana/web3.js";
import Button from "@/components/common/Button";
import arr from "hex-array";

const SignTransaction = () => {
  const router = useRouter();

  const { jwt } = useAuth();

  const { deviceShare } = useDeviceShare();

  const handleSignTransaction = async () => {
    const transactionBase58 = router.query.txn as string;
    console.log(transactionBase58);
    const transactionBytes = arr.fromString(transactionBase58);
    const transactionBuffer = Buffer.from(transactionBytes);
    const transaction = Transaction.from(transactionBuffer);

    console.log("deviceShare", deviceShare);

    const {
      data: { key },
    } = await axios.get(`${BACKEND_URL}/private-key?deviceKey=${deviceShare}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("key", key);
    const keypair = Keypair.fromSecretKey(arr.fromString(key));

    console.log(keypair.publicKey.toBase58());

    transaction.sign(keypair);

    const signedTransactionBase58 = bs58.encode(
      transaction.serialize({ requireAllSignatures: false })
    );

    window.parent.postMessage(
      { type: "txnData", tx: signedTransactionBase58 },
      "*"
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Approve Transaction</h1>

      <p>Click on the button below to approve the transaction</p>

      <Button onClick={handleSignTransaction}>Approve</Button>
    </>
  );
};

export default SignTransaction;
