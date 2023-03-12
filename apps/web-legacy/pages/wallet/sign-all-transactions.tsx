import React from "react";
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

  const handleSignTransaction = async () => {
    const transactions = JSON.parse(router.query.txns as string);

    console.log("transactions", transactions);

    const {
      data: { key },
    } = await axios.get(`${BACKEND_URL}/private-key?deviceKey=${deviceShare}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const keypair = Keypair.fromSecretKey(arr.fromString(key));

    const signedTransactions = transactions.map((tx: any) => {
      const transactionBytes = arr.fromString(tx);
      const transactionBuffer = Buffer.from(transactionBytes);
      const transaction = Transaction.from(transactionBuffer);
      transaction.sign(keypair);

      const signedTransactionBase58 = bs58.encode(
        transaction.serialize({ requireAllSignatures: false })
      );

      return signedTransactionBase58;
    });

    window.parent.postMessage({ type: "txnData", tx: signedTransactions }, "*");
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl p-6 mx-auto my-1 space-y-8 font-sans text-white border border-transparent rounded-lg shadow md:my-6">
      <h1 className="text-4xl font-bold text-center">Approve Transaction</h1>

      <p className="text-center">
        You are about to approve multiple transactions. Click on the button
        below to approve them
      </p>

      <Button onClick={handleSignTransaction}>Approve</Button>
    </div>
  );
};

Wallet.PageLayout = WalletLayout;

export default Wallet;
