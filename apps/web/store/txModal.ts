import { Transaction } from "@solana/web3.js";
import { atom } from "jotai";

export const signTxModalOpen = atom(false);
export const signAllTxModalOpen = atom(false);
export const transactionAtom = atom<Transaction | Transaction[] | null>(null);
export const signedTransactionAtom = atom<Transaction | Transaction[] | null>(
  null
);
