"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconChevronUp, type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
  children?: NavItem[];
  isActive?: boolean;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = React.useState<string | null>("");

  const toggleItem = (title: string) => {
    setExpandedItem((prev) => {
      // If clicking the same item, close it. Otherwise, open the new one.
      return prev === title ? null : title;
    });
  };

  const isActive = (url: string) => {
    if (url === "#") return false;
    return pathname === url || pathname?.startsWith(url + "/");
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItem === item.title;
            const itemIsActive = isActive(item.url);
            const hasActiveChild =
              hasChildren &&
              item.children?.some((child) => isActive(child.url));

            return (
              <SidebarMenuItem key={item.title} className="gap-4">
                {hasChildren ? (
                  <>
                    <SidebarMenuButton
                      onClick={() => toggleItem(item.title)}
                      className={cn(
                        "w-full justify-between rounded hover:bg-white/10",
                        itemIsActive || hasActiveChild
                          ? "text-white bg-transparent"
                          : "text-[#9AA4B2] hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-4" />}
                        <span
                          className={cn(
                            "text-sm",
                            (isExpanded || itemIsActive || hasActiveChild) &&
                              "font-semibold"
                          )}
                        >
                          {item.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <IconChevronUp className="size-4" />
                      ) : (
                        <IconChevronDown className="size-4" />
                      )}
                    </SidebarMenuButton>
                    {isExpanded && (
                      <SidebarMenuSub className="border-l border-white/20">
                        {item.children?.map((child) => {
                          const childIsActive = isActive(child.url);
                          return (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={childIsActive}
                                className={cn(
                                  "relative pl-4",
                                  childIsActive
                                    ? "font-semibold text-white bg-transparent!"
                                    : "text-[#9AA4B2]"
                                )}
                              >
                                <a href={child.url} className="flex items-center">
                                  <div>{child.title}</div>
                                  {childIsActive && (
                                    <div className="size-1.5 rounded-full bg-primary mt-1" />
                                  )}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "rounded hover:bg-white/10",
                      itemIsActive
                        ? "text-white bg-transparent"
                        : "text-[#9AA4B2] hover:text-white"
                    )}
                  >
                    <a href={item.url}>
                      {item.icon && <item.icon className="size-4" />}
                      <span
                        className={cn(
                          "text-sm",
                          itemIsActive && "font-semibold"
                        )}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
