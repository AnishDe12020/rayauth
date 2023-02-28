import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import WalletPage from "@/components/dashboard/Wallet";
import WalletLayout from "@/components/layouts/WalletLayout";
type Props = {};

const Wallet = (props: Props) => {
  return (
    <div>
      <WalletPage />
    </div>
  );
};

// Wallet.PageLayout = WalletLayout;
Wallet.PageLayout = DashboardLayout;

export default Wallet;
