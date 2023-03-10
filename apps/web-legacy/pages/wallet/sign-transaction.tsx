import React, { useEffect, useState } from "react";
import WalletLayout from "@/components/layouts/WalletLayout";
import { useRouter } from "next/router";
import useCluster from "@/hooks/useCluster";
import bs58 from "bs58";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";

import { Keypair, Transaction } from "@solana/web3.js";
import Button from "@/components/common/Button";
import arr from "hex-array";
const Wallet = () => {
  const router = useRouter();

  const { jwt } = useAuth();

  const { deviceShare } = useDeviceShare();

  const { connection } = useCluster();

  const handleSignTransaction = async () => {
    const transactionBase58 = router.query.txn as string;
    console.log(transactionBase58)
    const transactionBytes = arr.fromString(transactionBase58)
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
    <div className="flex flex-col items-center justify-center max-w-2xl p-6 mx-auto my-1 space-y-6 font-sans text-white border border-transparent rounded-lg shadow md:my-6">
      <h1 className="text-4xl font-bold text-center">Approve Transaction</h1>

      <Button onClick={handleSignTransaction}>Approve</Button>
    </div>
  );
};

Wallet.PageLayout = WalletLayout;

export default Wallet;
