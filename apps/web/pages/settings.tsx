import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import SettingPage from "@/components/walletPage/Settings";
import WalletLayout from "@/components/layouts/WalletLayout";
type Props = {};

const Settings = (props: Props) => {
  return (
    <>
      <SettingPage />
    </>
  );
};

Settings.PageLayout = WalletLayout;

export default Settings;
