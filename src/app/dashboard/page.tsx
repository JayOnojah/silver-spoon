import DashboardContent from "@/src/components/_core/dashboard/dashboard/dashboard-content";
import DashboardMain from "@/src/components/_core/dashboard/dashboard/dashboard-content";
import Header from "@/src/components/_core/dashboard/dashboard/dashboard-content/header";
import Setup from "@/src/components/_core/dashboard/dashboard/setup";
import { Button } from "@/src/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const Dashboard = () => {
  return (
    <>
      {/* Header Section */}
      <Header />
      <Setup />

      <DashboardContent />
    </>
  );
};

export default Dashboard;
