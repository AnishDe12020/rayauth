import { userOptions } from "../interfaces";
import {Transaction, VersionedTransaction} from "@solana/web3.js"
import { WALLET } from "../constants";
import { EventEmitter } from "sweet-event-emitter";
export class userConstructor {
  public id!: string | undefined;
  public createdAt!: string | undefined;
  public updatedAt!: string | undefined;
  public email!: string | undefined;
  public address!: string | undefined;
  public avatar!: string | undefined;
  public event: EventEmitter;
  constructor(options?: userOptions) {
    this.id = options?.id;
    this.createdAt = options?.createdAt;
    this.updatedAt = options?.updatedAt;
    this.email = options?.email;
    this.address = options?.address;
    this.avatar = options?.address;
    this.event = new EventEmitter();
  }

  public sendTransaction(transaction: Transaction | VersionedTransaction, isgassless: boolean, options?: {}) {
      try {
        const url = new URL(`${WALLET}/send-transaction`)
        url.searchParams.append("txn", transaction.serialize().toString())
        url.searchParams.append("options", options?.toString() || String({data: "empty"}))
        url.searchParams.append("isgasless", String(isgassless))
        window.open(url.toString(), "_blank")?.focus();
      }catch {
        throw new Error("Can't execute send transaction")
      }
    }
    
    public signTransaction(transaction: Transaction | VersionedTransaction, isgasless:boolean, options?: {}) { 
      try {
        const url = new URL(`${WALLET}/sign-transaction`)
        url.searchParams.append("txn", transaction.serialize().toString())
        url.searchParams.append("options", options?.toString() || String({data: "empty"}))
        url.searchParams.append("isgasless", String(isgasless))
        window.open(url.toString(), "_blank")?.focus();
      }catch {
        throw new Error("Can't execute send transaction")
      }
    }

    public signMessage(message: string, isgasless: boolean, options?: {}) {
      try {
        const url = new URL(`${WALLET}/sign-message`)
        url.searchParams.append("msg", message)
        url.searchParams.append("address", this.address || "NOT-FOUND")
        url.searchParams.append("isgasless", String(isgasless))
        window.open(url.toString(), "_blank")?.focus();
      }catch {
        throw new Error("Can't execute signing of message")
      }
    }

   
}


