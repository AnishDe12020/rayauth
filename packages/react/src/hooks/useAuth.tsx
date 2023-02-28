import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { authInterface } from "../interfaces/auth";
import { userConstructor } from "../classes";
import { getUser } from "../helpers/fetchUser";
import { useConfig } from "../providers";

export function useAuth(): authInterface {
  const [user, setUser] = useState<userConstructor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, _, removeCookie] = useCookies(["jwt-rayauth"]);

  const config = useConfig();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      if (!cookies["jwt-rayauth"]) {
        setIsLoading(false);
        return;
      }
      const user = await getUser(cookies["jwt-rayauth"]);
      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, [cookies]);

  const handleCallback = () => {
    console.log("RUNNING CALLBACK");
    const [cookies, setCookie, removeCookie] = useCookies(["jwt-rayauth"]);
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("jwt");
    if (!jwt) return;
    if (cookies["jwt-rayauth"]) {
      removeCookie("jwt-rayauth");
      setCookie("jwt-rayauth", jwt);
    }
  };

  const signIn = () => {
    const url = new URL(`http://localhost:8080/auth/${config.provider}`);
    url.searchParams.append("cb", config.callbackUrl);
    url.searchParams.append("id", config.clientId);
    console.log(url.toString());
    window.location.replace(url.toString());
  };

  const signOut = () => {
    removeCookie("jwt-rayauth");
  };

  return { signIn, signOut, user, isLoading, handleCallback };
}
