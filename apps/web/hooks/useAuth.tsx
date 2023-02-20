import { useState } from "react";
import { getCookie, removeCookies } from "cookies-next";
import { decodeJwt, JWTPayload } from "jose";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { idbConfig } from "lib/indexeddbConfig";
import { useRouter } from "next/router";

const useAuth = () => {
  const [user, setUser] = useState<JWTPayload>();
  const [needsRecovery, setNeedsRecovery] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { add, getByID } = useIndexedDBStore("keyshare");

  const router = useRouter();

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

  const handleCallback = async () => {
    setLoading(true);
    const jwt = getCookie("jwt-rayauth");

    console.log(jwt);

    if (!jwt) {
      throw new Error("No JWT found");
    }

    const decoded = decodeJwt(jwt.toString());

    console.log(decoded);

    setUser(decoded);

    if (await getByID(1)) {
      setLoading(false);
      return;
    }

    if (router.query.share) {
      setupIndexedDB(idbConfig)
        .then(() => console.log("success"))
        .catch((e) => console.error("error / unsupported", e));

      add({ key: router.query.share }).then(console.log);
    } else {
      console.log("no share");
      setNeedsRecovery(true);
    }

    setLoading(false);
  };

  const signOut = () => {
    removeCookies("rayauth-jwt");
  };

  return { signIn, signOut, handleCallback, user, needsRecovery, loading };
};

export default useAuth;
