import WalletLayout from "@/components/layouts/WalletLayout";
import SessionPage from "@/components/walletPage/SessionPage";

import React from "react";

type Props = {};

const Sessions = (props: Props) => {
  return (
    <div>
      <SessionPage />
    </div>
  );
};

Sessions.PageLayout = WalletLayout;

export default Sessions;
