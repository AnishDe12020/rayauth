import WalletLayout from "@/components/layouts/WalletLayout";
import Session from "@/components/walletPage/Session";
import React from "react";

type Props = {};

const Sessions = (props: Props) => {
  return (
    <div>
      <Session />
    </div>
  );
};

Sessions.PageLayout = WalletLayout;

export default Sessions;
