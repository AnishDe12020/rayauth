import React from "react";
import Navbar from "../common/Navbar";

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
