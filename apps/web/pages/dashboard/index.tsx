import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardPage from "@/components/dashboard";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      <DashboardPage />
    </div>
  );
};
Dashboard.PageLayout = DashboardLayout;
export default Dashboard;
