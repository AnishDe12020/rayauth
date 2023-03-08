import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";
import { useConfig } from "../providers";
import { BASEURL } from "../constants";
import { walletListener } from "../classes/eventListener";

export function useAuth(cookieName: string = "rayauth-jwt"): authInterface {
  const config = useConfig();
  console.log("cookieName", cookieName);
  const [user, setUser] = useState<userConstructor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      if (!cookies[cookieName]) {
        setIsLoading(false);
        return;
      }
      const user = await getUser(cookies[cookieName]);
      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, [cookies]);

  const handleCallback = () => {
    console.log("RUNNING CALLBACK");

    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("jwt");
    if (cookies[cookieName]) {
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
