import React from "react";
import Navbar from "../dashboard/Navbar";

type Props = {};

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default WalletLayout;
