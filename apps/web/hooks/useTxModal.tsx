import {
  signAllTxModalOpen,
  signedTransactionAtom,
  signTxModalOpen,
  transactionAtom,
} from "@/store/txModal";
import { Transaction } from "@solana/web3.js";
import base58 from "bs58";
import { useAtom } from "jotai";
import useAuth from "./useAuth";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const useTxModal = () => {
  const [signModalOpen, setSignModalOpen] = useAtom(signTxModalOpen);
  const [signAllModalOpen, setSignAllTxModalOpen] = useAtom(signAllTxModalOpen);

  const [hookTx, setTransaction] = useAtom(transactionAtom);
  const [signedTransaction, setSignedTransaction] = useAtom(
    signedTransactionAtom
  );

  const { user } = useAuth();

  console.log("hookTx", hookTx);
  console.log("signedTransaction", signedTransaction);

  const signTransaction = async (tx: Transaction) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    setTransaction(tx);
    setSignModalOpen(true);

    const data = await loopSignedTransaction();

    const transaction = Transaction.from(base58.decode(data));

    return transaction;
  };

  const signAllTransactions = async (transactions: Transaction[]) => {
    if (!user) {
      throw new Error("User not logged in");
    }

    setTransaction(transactions);
    setSignAllTxModalOpen(true);

    const data = await loopSignedTransaction();

    return data;
  };

  const loopSignedTransaction = async () => {
    const startTime = new Date().getTime();
    let data = null;

    while (data == null || startTime - new Date().getTime() >= 15000) {
      window.onmessage = function (e) {
        console.log(e.data);
        if (e.data.type == "txnData") {
          data = e.data.tx;
        }
      };

      await sleep(1000); // assuming sleep() is an async function that waits for a specified amount of time
    }

    return data;
  };

  return {
    signModalOpen,
    setSignModalOpen,
    signAllModalOpen,
    setSignAllTxModalOpen,
    hookTx,
    setTransaction,
    signTransaction,
    signAllTransactions,
    setSignedTransaction,
  };
};

export default useTxModal;
