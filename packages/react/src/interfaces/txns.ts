import { Transaction, VersionedTransaction } from "@solana/web3.js"

export interface signTxnInterface {
    txn : string 
    //implement 
}

export interface sendTxnInterface {
    txn : string 
    //implement 
}



export interface txnHookInterface {
  sendTransaction: (transaction: Transaction | VersionedTransaction, isgassless: boolean, options?: {}) => void,
   signTransaction: (transaction: Transaction | VersionedTransaction) => void,
   signAllTransactions: ( transactions: Transaction[] | VersionedTransaction[]) => void,
   signMessage: (msg: string, isgasless: boolean) => void,
   signTxn: (transaction?: Transaction | VersionedTransaction | null, msg?: string) => void

}