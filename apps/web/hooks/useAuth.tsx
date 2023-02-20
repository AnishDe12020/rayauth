import { useState } from "react";
import { getCookie, removeCookies } from "cookies-next";
import { decodeJwt, JWTPayload } from "jose";

const useAuth = () => {
  const [user, setUser] = useState<JWTPayload>();

  const signIn = (
    provider: string,
    clientId?: string,
    callbackUrl?: string
  ) => {
    const url = new URL(`http://localhost:8080/auth/${provider}`);

    if (clientId) {
      url.searchParams.append("clientId", clientId);
    }

    if (callbackUrl) {
      url.searchParams.append("callbackUrl", callbackUrl);
    }

    window.location.replace(url.toString());
  };

  const handleCallback = () => {
    const jwt = getCookie("next-auth.csrf-token");

    console.log(jwt);

    if (!jwt) {
      throw new Error("No JWT found");
    }

    const decoded = decodeJwt(jwt.toString());

    console.log(decoded);

    setUser(decoded);
  };

  const signOut = () => {
    removeCookies("rayauth-jwt");
  };

  return { signIn, signOut, handleCallback, user };
};

export default useAuth;
