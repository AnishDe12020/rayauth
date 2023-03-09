import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { userConstructor } from "../classes";
import { WALLET } from "../constants";
import { sleep } from "../helpers";
import { txnHookInterface } from "../interfaces";
import { store } from "../store";


export function useTxns(user: userConstructor):txnHookInterface {
    const state:any = store()
     function sendTransaction(
        transaction: Transaction | VersionedTransaction,
        isgassless: boolean,
        options?: {}
      ) {
        try {
          const url = new URL(`${WALLET}/send-transaction`);
          url.searchParams.append("txn", transaction.serialize().toString());
          url.searchParams.append(
            "options",
            options?.toString() || String({ data: "empty" })
          );
          url.searchParams.append("isgasless", String(isgassless));
          toggleIframe(url.toString(), true)
        } catch {
          throw new Error("Can't execute send transaction");
        }
      }
      
      function signAllTransactions(
        transactions: Transaction[] | VersionedTransaction[]
      ) {
        try {
          const url = new URL(`${WALLET}/sign-all-transactions`);
          url.searchParams.append(
            "txns",
            transactions.map((tx) => tx.serialize().toString()).toString()
          );
          toggleIframe(url.toString(), true)
          
        } catch {
          throw new Error("Can't execute signing of all transactions");
        }
      }

      function signMessage(message: string, isgasless: boolean, options?: {}) {
        try {
          const url = new URL(`${WALLET}/sign-message`);
          url.searchParams.append("msg", message);
          url.searchParams.append("address", user.address || "NOT-FOUND");
          url.searchParams.append("isgasless", String(isgasless));
          toggleIframe(url.toString(), true)
        } catch {
          throw new Error("Can't execute signing of message");
        }
      }

      function signTxn(transaction?: Transaction | VersionedTransaction | null, msg?: string):any {
        try {
          const url = new URL(`${"http://localhost:3000"}?msg=${msg}`);
          url.searchParams.append("txn", msg || "");
          toggleIframe(url.toString(), true)
          const result = loopTxnData()
          return result
          return  ""
        } catch {
          throw new Error("Can't execute send transaction");
        }
      }

    function signTransaction(transaction: Transaction | VersionedTransaction) {
        try {
          const url = new URL(`${WALLET}/sign-transaction`);
          url.searchParams.append("txn", transaction.serialize().toString());
          toggleIframe(url.toString(), true)
        } catch {
          throw new Error("Can't execute send transaction");
        }
      }


     function toggleIframe(src: string, isVisible: boolean) {
        state?.setSrc(src);
        state.setVisable(isVisible);
      }


      return {
        sendTransaction,
        signAllTransactions,
        signTransaction,
        signMessage,
        signTxn
      }
}


function loopTxnData():any {
    const startTime = new Date().getTime();
    let data = null
    console.log("pre loob", data)
    while (data == null || startTime - new Date().getTime() >= 15000) {
      
      console.log("loop running")
      
      window.onmessage = function(e) {
        console.log(e.data)
        if (e.data.type == 'signtransac') {
          console.log(true)
        }
        if(e.data.type == "txnData") {
          console.log(true); 
          console.log("loop data", e.data)
          data = e.data
          console.log("data be like", data)
        }
        
    }; 
      const sleepAwait = async() => {
      await sleep(1000);
      }
      sleepAwait() // assuming sleep() is an async function that waits for a specified amount of time
    }
    return data;
  }