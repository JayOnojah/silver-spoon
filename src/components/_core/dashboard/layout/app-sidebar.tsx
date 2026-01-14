"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Customer",
      url: "customers",
      icon: IconListDetails,
    },
    {
      title: "Orders",
      url: "orders",
      icon: IconChartBar,
    },
    {
      title: "Inventory",
      url: "inventory",
      icon: IconFolder,
    },
    {
      title: "Wallet",
      url: "wallet",
      icon: IconUsers,
    },
    {
      title: "Design Operations",
      url: "#",
      icon: IconUsers,
      children: [
        {
          title: "Catalogue",
          url: "catalogue",
        },
        {
          title: "Moodboards",
          url: "mood-dashboard",
        },
        {
          title: "Notes",
          url: "notes",
        },
      ],
    },
    {
      title: "Store Operations",
      url: "#",
      icon: IconUsers,
      children: [
        {
          title: "Store Operations",
          url: "store-operations",
        },
        {
          title: "Appointment",
          url: "appointment",
        },
        {
          title: "Shipping",
          url: "shipping",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconUsers,
      children: [
        {
          title: "Business Analytics",
          url: "business-analytics",
        },
        {
          title: "Marketing Analytics",
          url: "marketing-analytics",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: IconUsers,
      children: [
        {
          title: "Website",
          url: "we",
        },
        {
          title: "Newsletter",
          url: "newsletter",
        },
        {
          title: "Blog",
          url: "blog",
        },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: IconUsers,
      children: [
        {
          title: "Finance Report",
          url: "finance-report",
        },
        {
          title: "Expenditure",
          url: "expenditure",
        },
        {
          title: "Invoicing",
          url: "invoicing",
        },
        {
          title: "Financing",
          url: "financing",
        },
      ],
    },
    {
      title: "Settings",
      url: "settings",
      icon: IconUsers,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
