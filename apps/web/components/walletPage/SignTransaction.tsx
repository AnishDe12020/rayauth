import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";
import { useRouter } from "next/router";
import React, { useState } from "react";
import bs58 from "bs58";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

import { Keypair, Transaction } from "@solana/web3.js";
import Button from "@/components/common/Button";
import arr from "hex-array";
import useTxModal from "@/hooks/useTxModal";

const SignTransaction = ({ useHook = false }: { useHook?: boolean }) => {
  const router = useRouter();

  const { jwt } = useAuth();

  const { deviceShare } = useDeviceShare();

  const { hookTx, setSignModalOpen } = useTxModal();

  const [loading, setLoading] = useState(false);

  const handleSignTransaction = async () => {
    setLoading(true);

    let transaction;

    if (useHook) {
      if (!hookTx) {
        console.error("hookTx empty");
        return;
      }

      transaction = hookTx as Transaction;
    } else {
      const transactionBase58 = router.query.txn as string;
      console.log(transactionBase58);
      const transactionBytes = arr.fromString(transactionBase58);
      const transactionBuffer = Buffer.from(transactionBytes);
      transaction = Transaction.from(transactionBuffer);
    }

    console.log("deviceShare", deviceShare);

    const {
      data: { key },
    } = await axios.get(`${BACKEND_URL}/private-key`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "AuthorizationBasic": `Basic ${deviceShare}`
      },
    });
    console.log("key", key);
    const keypair = Keypair.fromSecretKey(arr.fromString(key));

    console.log(keypair.publicKey.toBase58());

    console.log("transactionBeforeSigning", transaction);

    transaction.partialSign(keypair);

    console.log("transactionAfterSigning", transaction);

    const signedTransactionBase58 = bs58.encode(
      transaction.serialize({ requireAllSignatures: false })
    );

    if (hookTx) {
      window.postMessage({ type: "txnData", tx: signedTransactionBase58 }, "*");
      setSignModalOpen(false);
    } else {
      window.parent.postMessage(
        { type: "txnData", tx: signedTransactionBase58 },
        "*"
      );
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Approve Transaction</h1>

      <p>Click on the button below to approve the transaction</p>

      <Button onClick={handleSignTransaction} processing={loading}>
        Approve
      </Button>
    </>
  );
};

export default SignTransaction;
