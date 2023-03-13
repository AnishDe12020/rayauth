import { useEffect, useState } from "react";
import { decodeJwt, JWTPayload } from "jose";
import { useCookies } from "react-cookie";
import { NextRouter } from "next/router";
import { useDeviceShare } from "./useDeviceShare";
import { BACKEND_URL } from "@/lib/constants";
import { IRayAuthJWT } from "@/types/jwt";
import { PublicKey } from "@solana/web3.js";

const useAuth = () => {
  const [user, setUser] = useState<IRayAuthJWT>();
  const [jwt, setJwt] = useState<string>();
  const [needsRecovery, setNeedsRecovery] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-rayauth"]);

  const [publickey, setPublickey] = useState<PublicKey>();

  const { deviceShare, setDeviceShare } = useDeviceShare();

  useEffect(() => {
    if (user?.address) {
      setPublickey(new PublicKey(user?.address));
    }
  }, [user?.address]);

  useEffect(() => {
    setLoading(true);
    const jwt = cookies["jwt-rayauth"];
    console.log("cookie?", jwt);
    if (jwt) {
      const decoded = decodeJwt(jwt.toString());

      setUser(decoded as unknown as IRayAuthJWT);
      setJwt(jwt.toString());
      console.log(setCookie("jwt-rayauth", jwt.toString()));
    }

    setLoading(false);
  }, []);

  const signIn = (provider: string) => {
    const url = new URL(`${BACKEND_URL}/auth/${provider}`);

    window.location.replace(url.toString());
  };

  const handleCallback = async (router: NextRouter) => {
    if (!router.isReady) {
      return;
    }

    setLoading(true);
    const jwt = cookies["jwt-rayauth"];

    console.log(jwt);

    if (!jwt) {
      throw new Error("No JWT found");
    }

    const decoded = decodeJwt(jwt.toString());

    setUser(decoded as unknown as IRayAuthJWT);

    console.log("checking if already added");

    console.log("router.query", router.query);

    if (deviceShare) {
      setLoading(false);
      setNeedsRecovery(false);

      console.log("deviceShare", deviceShare);

      if (router.query.callback) {
        const callbackUrl = new URL(router.query.callback as string);

        if (!router.query.jwt) {
          console.log("no jwt");
        }

        callbackUrl.searchParams.append("jwt", router.query.jwt as string);

        window.location.replace(callbackUrl.toString());
      } else {
        window.location.replace("/wallet");
      }
    } else {
      if (router.query.share) {
        console.log("router.query.share", router.query.share);

        setDeviceShare(router.query.share as string);

        if (router.query.callback) {
          const callbackUrl = new URL(router.query.callback as string);

          if (!router.query.jwt) {
            console.log("no jwt");
            return;
          }

          callbackUrl.searchParams.append("jwt", router.query.jwt as string);

          window.location.replace(callbackUrl.toString());
        } else {
          window.location.replace("/wallet");
        }
      } else {
        setNeedsRecovery(true);
      }

      setLoading(false);
    }
  };

  const signOut = () => {
    removeCookie("jwt-rayauth");
    window.location.replace("/");
  };

  const handleNewDeviceShare = (share: string, router: NextRouter) => {
    setDeviceShare(share);

    if (router.query.callback) {
      const callbackUrl = new URL(router.query.callback as string);

      if (!router.query.jwt) {
        console.log("no jwt");
        return;
      }

      callbackUrl.searchParams.append("jwt", router.query.jwt as string);

      window.location.replace(callbackUrl.toString());
    } else {
      window.location.replace("/");
    }
  };

  return {
    signIn,
    signOut,
    handleCallback,
    user,
    needsRecovery,
    loading,
    publickey,
    jwt,
    handleNewDeviceShare,
  };
};

export default useAuth;
