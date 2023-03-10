import { WalletListener } from "../classes/eventListener";
import { userConstructor } from "../classes";
import { Transaction, VersionedTransaction } from "@solana/web3.js";

export interface authInterface {
  signIn: () => void;
  signOut: () => void;
  handleCallback: () => void;
  user: userConstructor | null;
  isLoading: boolean;
  walletListener: WalletListener,
  signTransaction: (transaction: Transaction | VersionedTransaction) => void
}
