import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";
import { useConfig } from "../providers";
import { BASEURL } from "../constants";
import { walletListener } from "../classes/eventListener";
import { store } from "../store";

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

      const user = await getUser(cookies[cookieName]);
      console.log("USER CHAL RHA")

      setUser(user);
      user.syncState(syncstore)
      setIsLoading(false);
      console.log("PURA CHAL RHA")

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

  return { signIn, signOut, user, isLoading, handleCallback, walletListener };
}
