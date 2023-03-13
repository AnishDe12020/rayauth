import React from "react";
import { useRouter } from "next/router";
import bs58 from "bs58";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";
import { useDeviceShare } from "@/hooks/useDeviceShare";

import { Keypair, Transaction } from "@solana/web3.js";
import Button from "@/components/common/Button";
import arr from "hex-array";
import useTxModal from "@/hooks/useTxModal";

const SignAllTransactions = ({ useHook = false }: { useHook?: boolean }) => {
  const router = useRouter();

  const { jwt } = useAuth();

  const { deviceShare } = useDeviceShare();

  const { hookTx, setSignedTransaction } = useTxModal();

  const handleSignTransaction = async () => {
    let transactions;

    if (useHook) {
      if (!hookTx) {
        console.error("hookTx empty");
        return;
      }

      transactions = hookTx as Transaction[];
    } else {
      transactions = JSON.parse(router.query.txns as string);
    }

    const {
      data: { key },
    } = await axios.get(`${BACKEND_URL}/private-key?deviceKey=${deviceShare}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const keypair = Keypair.fromSecretKey(arr.fromString(key));

    const signedTransactions = transactions.map((tx: any) => {
      let transaction;

      if (useHook) {
        transaction = tx;
      } else {
        const transactionBytes = arr.fromString(tx);
        const transactionBuffer = Buffer.from(transactionBytes);
        transaction = Transaction.from(transactionBuffer);
      }

      transaction.sign(keypair);

      if (useHook) {
        return transaction;
      } else {
        const signedTransactionBase58 = bs58.encode(
          transaction.serialize({ requireAllSignatures: false })
        );

        return signedTransactionBase58;
      }
    });

    if (useHook) {
      setSignedTransaction(signedTransactions);
    } else {
      window.parent.postMessage(
        { type: "txnData", tx: signedTransactions },
        "*"
      );
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Approve Transaction</h1>

      <p className="text-center">
        You are about to approve multiple transactions. Click on the button
        below to approve them
      </p>

      <Button onClick={handleSignTransaction}>Approve</Button>
    </>
  );
};

export default SignAllTransactions;
