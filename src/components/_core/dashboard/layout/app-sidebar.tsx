"use client";

import * as React from "react";
import {
  IconChevronDown,
  IconHome,
  IconChevronLeft,
  IconSquare,
} from "@tabler/icons-react";

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconSquare,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconSquare,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: IconSquare,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: IconSquare,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: IconSquare,
    },
    {
      title: "Design Operations",
      url: "#",
      icon: IconSquare,
      children: [
        {
          title: "Catalogue",
          url: "/catalogue",
        },
        {
          title: "Moodboards",
          url: "/mood-dashboard",
        },
        {
          title: "Notes",
          url: "/notes",
        },
      ],
    },
    {
      title: "Store Operations",
      url: "#",
      icon: IconSquare,
      children: [
        {
          title: "Store Operations",
          url: "/store-operations",
        },
        {
          title: "Appointment",
          url: "/appointment",
        },
        {
          title: "Shipping",
          url: "/shipping",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconSquare,
      children: [
        {
          title: "Business Analytics",
          url: "/business-analytics",
          isActive: true,
        },
        {
          title: "Marketing Analytics",
          url: "/marketing-analytics",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: IconSquare,
      children: [
        {
          title: "Website",
          url: "/website",
        },
        {
          title: "Newsletter",
          url: "/newsletter",
        },
        {
          title: "Blog",
          url: "/blog",
        },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: IconSquare,
      children: [
        {
          title: "Finance Report",
          url: "/finance-report",
        },
        {
          title: "Expenditure",
          url: "/expenditure",
        },
        {
          title: "Invoicing",
          url: "/invoicing",
        },
        {
          title: "Financing",
          url: "/financing",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSquare,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="text-white fixed left-0 top-0 h-screen"
    >
      <SidebarHeader className="border-b border-[#374151] py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary text-lg font-semibold uppercase">
              LOGO
            </span>
          </div>
          {/* <SidebarTrigger className="bg-primary rounded-full text-white hover:bg-primary/90 border-0 absolute -right-3.5">
            <IconChevronLeft className="size-4" />
          </SidebarTrigger> */}
        </div>
        <div className="mt-1 mb-3">
          <Button
            variant="ghost"
            className="w-full justify-between bg-[#111827] hover:bg-[#111827] text-white hover:text-white border border-[#374151] h-auto py-2.5 px-3"
          >
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
                    viewBox="0 0 20 20"
                  >
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
