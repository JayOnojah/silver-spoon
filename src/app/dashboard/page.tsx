"use client";
import DashboardContent from "@/src/components/_core/dashboard/dashboard/dashboard-content";
import Header from "@/src/components/_core/dashboard/dashboard/dashboard-content/header";
import Setup from "@/src/components/_core/dashboard/dashboard/setup";
import { Button } from "@/src/components/ui/button";
import React from "react";

const Dashboard = () => {
  return (
    <>
      {/* Header Section */}
      <Header />
      {!isFilled && <Setup />}
      <DashboardContent isFilled={isFilled} />
      <Button onClick={() => setIsFilled(!isFilled)} className="fixed bottom-6 right-6 rounded shadow-lg hover:shadow-xl">
        show {!isFilled ? "Data " : "Empty "} State
      </Button>
    </>
  );
};

export default Dashboard;
