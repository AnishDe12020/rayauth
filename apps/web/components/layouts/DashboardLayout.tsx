import React from "react";
import Navbar from "../dashboard/Navbar";

type Props = {};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default DashboardLayout;
