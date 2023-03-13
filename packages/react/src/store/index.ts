import { create } from "zustand";
import { WALLET } from "../constants";
const store = create((set) => ({
  count: 1,
  isHidden: true,
  src: WALLET,
  txnData: {},
  setTxnData: (value: {}) =>
    set((state: { txnData: {} }) => ({ txnData: value })),
  setVisible: (value: boolean) =>
    set((state: { isHidden: boolean }) => ({ isHidden: !value })),
  setSrc: (value: string) => set((state: { src: string }) => ({ src: value })),
}));

export { store };
