import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import WalletPage from "@/components/dashboard/Wallet";
type Props = {};

const Wallet = (props: Props) => {
  return (
    <div>
      <WalletPage />
    </div>
  );
};

Wallet.PageLayout = DashboardLayout;

export default Wallet;
