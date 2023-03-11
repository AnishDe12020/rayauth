import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";
import { useConfig } from "../providers";
import { BASEURL, WALLET } from "../constants";
import { walletListener } from "../classes/eventListener";
import { store } from "../store";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { sleep } from "../helpers";
import hex from "hex-array";

export function useAuth(cookieName: string = "jwt-rayauth") {
  const config = useConfig();
  const syncstore = store();
  const [user, setUser] = useState<userConstructor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("CHAL RHA");
      setIsLoading(true);
      if (!cookies[cookieName]) {
        setIsLoading(false);
        return;
      }
      console.log("YAHA BHI CHAL RHA");

      const user = await getUser(cookies[cookieName], syncstore);
      console.log("USER CHAL RHA");

      setUser(user);

      setIsLoading(false);
      console.log("PURA CHAL RHA", user.state);
    };
    fetchUser();
  }, [cookies]);

  const handleCallback = () => {
    console.log("RUNNING CALLBACK");

    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("jwt");
    if (jwt && cookies[cookieName]) {
      console.log("exists", cookies[cookieName]);
      removeCookie(cookieName);
      console.log(setCookie(cookieName, jwt));
    }
    if (jwt && !cookies[cookieName]) {
      console.log(setCookie(cookieName, jwt.toString()));
    }
  };

  const signIn = () => {
    const url = new URL(`${BASEURL}/auth/${config.provider}`);
    url.searchParams.append("cb", config.callbackUrl);
    url.searchParams.append("id", config.clientId);
    console.log(url.toString());
    window.location.replace(url.toString());
  };

  const signOut = () => {
    removeCookie(cookieName);
  };

  async function signTransaction(
    transaction: Transaction | VersionedTransaction
  ): Promise<Transaction | VersionedTransaction> {
    try {
      console.log(user);
      console.log(user?.state);
      console.log("waw");
      const url = new URL(`${WALLET}/sign-transaction`);

      if (
        transaction instanceof Transaction &&
        transaction.recentBlockhash === null
      ) {
        let blockhash = (await connection.getLatestBlockhash("finalized"))
          .blockhash;

        transaction.recentBlockhash = blockhash;
      }

      url.searchParams.append(
        "txn",
        hex.toString(transaction.serialize({ requireAllSignatures: false }))
      );
      console.log(
        "hex",
        hex.toString(transaction.serialize({ requireAllSignatures: false }))
      );
      console.log("url", url.toString());
      user?.state.setSrc(url.toString());
      user?.state.setVisible(true);
      const res = loopTxnData();
      return res;
    } catch (e) {
      console.error(e);
      throw new Error("Can't execute send transaction");
    }
  }

  const sendTransaction = async (
    transaction: Transaction | VersionedTransaction
  ) => {
    try {
      const signedTransaction = await signTransaction(transaction);
      console.log("signed", signedTransaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      return signature;
    } catch (e) {
      console.error(e);
      throw new Error("Can't execute send transaction");
    }
  };

  async function loopTxnData(): Promise<any> {
    const startTime = new Date().getTime();
    let data = null;
    console.log("pre loob", data);
    while (data == null || startTime - new Date().getTime() >= 15000) {
      console.log("loop running");

      window.onmessage = function (e) {
        console.log(e.data);
        if (e.data.type == "signtransac") {
          console.log(true);
        }
        if (e.data.type == "txnData") {
          console.log(true);
          console.log("loop data", e.data);
          data = e.data;
          console.log("data be like", data);
        }
      };

      await sleep(1000); // assuming sleep() is an async function that waits for a specified amount of time
    }
    return data;
  }
  return {
    signIn,
    signOut,
    user,
    isLoading,
    handleCallback,
    walletListener,
    signTransaction,
    sendTransaction,
  };
}
