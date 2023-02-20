import { NextPage } from "next";
import { useEffect, useState } from "react";

import useAuth from "hooks/useAuth";

const CallbackPage: NextPage = () => {
  const { handleCallback, needsRecovery, loading, user } = useAuth();

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div>
      <h1>{loading ? "loading" : "done"}</h1>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

export default CallbackPage;
