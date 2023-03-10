import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";
import { useConfig } from "../providers";
import { BASEURL, WALLET } from "../constants";
import { walletListener } from "../classes/eventListener";
import { store } from "../store";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
import { sleep } from "../helpers";
import hex from "hex-array"
export function useAuth(cookieName: string = "jwt-rayauth"): authInterface {
  const config = useConfig();
  const syncstore = store()
  const [user, setUser] = useState<userConstructor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  useEffect(() => {
    const fetchUser = async () => {
      console.log("CHAL RHA")
      setIsLoading(true);
      if (!cookies[cookieName]) {
        setIsLoading(false);
        return;
      }
      console.log("YAHA BHI CHAL RHA")

      const user = await getUser(cookies[cookieName], syncstore);
      console.log("USER CHAL RHA")

      setUser(user);

      setIsLoading(false);
      console.log("PURA CHAL RHA", user.state)

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

  function signTransaction(transaction: Transaction | VersionedTransaction) {
    try {
      console.log(user)
      console.log(user?.state)
      console.log("waw");
      const url = new URL(`${WALLET}/sign-transaction`);
      url.searchParams.append(
        "txn",
       hex.toString(transaction.serialize({ requireAllSignatures: false }))
      );
      console.log("hex", hex.toString(transaction.serialize({ requireAllSignatures: false })))
      console.log("url", url.toString())
       user?.state.setSrc(url.toString());
       user?.state.setVisible(true);
       const res = loopTxnData();
       return res
    } catch (e) {
      console.error(e);
      throw new Error("Can't execute send transaction");
    }
  }

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
  return { signIn, signOut, user, isLoading, handleCallback, walletListener, signTransaction };
}


