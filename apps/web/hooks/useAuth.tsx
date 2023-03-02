import { useState } from "react";
import { getCookie, removeCookies } from "cookies-next";
import { decodeJwt, JWTPayload } from "jose";
import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";
import { idbConfig } from "lib/indexeddbConfig";
import { NextRouter, Router, useRouter } from "next/router";
import { useDeviceShare } from "./useDeviceShare";

const useAuth = () => {
  const [user, setUser] = useState<JWTPayload>();
  const [needsRecovery, setNeedsRecovery] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { add, getByID } = useIndexedDBStore("keyshare");

  const { deviceShare, setDeviceShare } = useDeviceShare();

  const signIn = (provider: string) => {
    const url = new URL(`http://localhost:8080/auth/${provider}`);

    window.location.replace(url.toString());
  };

  const handleCallback = async (router: NextRouter) => {
    if (!router.isReady) {
      return;
    }

    setLoading(true);
    const jwt = getCookie("jwt-rayauth");

    console.log(jwt);

    if (!jwt) {
      throw new Error("No JWT found");
    }

    const decoded = decodeJwt(jwt.toString());

    setUser(decoded);

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
        window.location.replace("/");
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
          window.location.replace("/");
        }
      } else {
        setNeedsRecovery(true);
      }

      setLoading(false);
    }
  };

  const signOut = () => {
    removeCookies("rayauth-jwt");
  };

  return { signIn, signOut, handleCallback, user, needsRecovery, loading };
};

export default useAuth;
