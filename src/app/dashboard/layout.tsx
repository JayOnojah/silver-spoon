import { AppSidebar } from "@/components/_core/dashboard/layout/app-sidebar";
import { SiteHeader } from "@/components/_core/dashboard/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "260px",
          "--header-height": "80px",
        } as React.CSSProperties
      }
      className="bg-[#FFF1EC]"
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="m-0! rounded-none! shadow-none!" style={{ backgroundColor: "transparent" }}>
        <SiteHeader />
        <div className="p-4 sm:p-5" style={{ backgroundColor: "#FFF1EC", minHeight: "100vh", paddingTop: "104px" }}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
