"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";

import * as React from "react";
import { NavMain } from "./nav-main";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/src/hooks/use-confirm";
import { accountLogout } from "@/src/actions/account-logout";
import { IconChevronDown, IconHome } from "@tabler/icons-react";

import {
  AnalyticsIcon,
  CustomerIcon,
  DashboardIcon,
  DesignOpsIcon,
  FinanceIcon,
  InventoryIcon,
  MarketingIcon,
  OrdersIcon,
  SettingsIcon,
  StoreOpsIcon,
  WalletIcon,
} from "./svg";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: CustomerIcon,
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: OrdersIcon,
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: InventoryIcon,
    },
    {
      title: "Wallet",
      url: "/dashboard/wallet",
      icon: WalletIcon,
    },
    {
      title: "Design Operations",
      url: "#",
      icon: DesignOpsIcon,
      children: [
        {
          title: "Catalogue",
          url: "/dashboard/design-operations/catalogue",
        },
        {
          title: "Moodboards",
          url: "/dashboard/design-operations/mood-boards",
        },
        {
          title: "Notes",
          url: "/dashboard/design-operations/notes",
        },
      ],
    },
    {
      title: "Store Operations",
      url: "#",
      icon: StoreOpsIcon,
      children: [
        {
          title: "Staffs",
          url: "/dashboard/store-operations/staffs",
        },
        {
          title: "Vendors & Materials",
          url: "/dashboard/store-operations/vendors-and-materials",
        },
        {
          title: "Appointment",
          url: "/dashboard/store-operations/appointments",
        },
        {
          title: "Shipping",
          url: "/dashboard/store-operations/shipping",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: AnalyticsIcon,
      children: [
        {
          title: "Business Analytics",
          url: "/dashboard/analytics/business-analytics",
          isActive: true,
        },
        {
          title: "Marketing Analytics",
          url: "/dashboard/analytics/marketing-analytics",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: MarketingIcon,
      children: [
        {
          title: "Website",
          url: "/dashboard/marketing/website",
        },
        {
          title: "Newsletter",
          url: "/dashboard/marketing/newsletter",
        },
        {
          title: "Blog",
          url: "/dashboard/marketing/blog",
        },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: FinanceIcon,
      children: [
        {
          title: "Financing",
          url: "/dashboard/finance/financing",
        },
        {
          title: "Finance Report",
          url: "/dashboard/finance/finance-report",
        },
        {
          title: "Expenditure",
          url: "/dashboard/finance/expenditure",
        },
        {
          title: "Invoicing",
          url: "/dashboard/finance/invoicing",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Confirm Logout",
    "You are about to log out of your account. Confirm to proceed.",
  );

  const handleLogout = async () => {
    const isConfirmed = await confirm();

    if (isConfirmed) {
      await accountLogout();
      console.log("User confirmed logout");
      window.location.href = "/sign-in";
    }
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="text-white fixed left-0 top-0 h-screen">
      <ConfirmationDialog />
      <SidebarHeader className="border-b border-[#374151] py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary text-lg font-semibold uppercase">
              LOGO
            </span>
          </div>
        </div>
        <div className="mt-1 mb-3">
          <Button
            variant="ghost"
            className="w-full justify-between bg-[#111827] hover:bg-[#111827] text-white hover:text-white border border-[#374151] h-auto py-2.5 px-3">
            <div className="flex items-center gap-2">
              <IconHome className="size-4" />
              <span className="text-sm">John Stiches</span>
            </div>
            <IconChevronDown className="size-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <NavMain items={data.navMain} />
        <p
          className="text-sm text-[#9CA3AF] px-4 py-2 cursor-pointer"
          onClick={handleLogout}>
          <LogOut className="size-4 inline mr-2" /> Logout
        </p>
      </SidebarContent>
      <SidebarFooter className="border-t border-[#374151]">
        <div className="space-y-4">
          <div className="text-center text-sm text-[#9CA3AF]">Academy</div>
          <div className="relative rounded-lg overflow-hidden bg-[#111827]">
            <div className="aspect-video bg-linear-to-br from-gray-600 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="size-12 mx-auto mb-2 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="size-6 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">
                  Watch Guides
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF] text-center">
            Learn how to get the best out of your tools
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
