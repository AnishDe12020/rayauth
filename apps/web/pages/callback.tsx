import { NextPage } from "next";
import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";

const CallbackPage: NextPage = () => {
  const { handleCallback, needsRecovery, loading, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    handleCallback(router);
  }, [router.isReady, handleCallback, router]);

  return (
    <div className="text-white">
      <h1>{loading ? "loading" : "done"}</h1>
      <p>{JSON.stringify(user)}</p>

      {needsRecovery && <p>Needs recovery</p>}
    </div>
  );
};

export default CallbackPage;
