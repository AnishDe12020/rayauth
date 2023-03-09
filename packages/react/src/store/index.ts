import { create } from 'zustand'

const store = create(set => ({
  count: 1,
  isHidden: true,
  src: "http://localhost:3000/",
  txnData: {},
  setTxnData: (value: {}) => set((state: {txnData: {}}) => ({txnData: value})),
  setVisable: (value: boolean) => set((state: { isHidden: boolean }) => ({ isHidden: !value  })),
  setSrc: (value: string) => set((state: {src: string}) => ({src: value}))
}))


export {store}