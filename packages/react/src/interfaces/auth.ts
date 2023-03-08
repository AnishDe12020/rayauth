import { WalletListener } from "../classes/eventListener";
import { userConstructor } from "../classes";

export interface authInterface {
  signIn: () => void;
  signOut: () => void;
  handleCallback: () => void;
  user: userConstructor | null;
  isLoading: boolean;
  handleWallet: () => void
  walletListener: WalletListener
}
