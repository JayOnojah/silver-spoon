"use client"

import * as React from "react"
import { IconChevronDown, IconChevronUp, type Icon } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  url: string
  icon?: Icon
  children?: NavItem[]
  isActive?: boolean
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const [expandedItem, setExpandedItem] = React.useState<string | null>("Analytics")

  const toggleItem = (title: string) => {
    setExpandedItem((prev) => {
      // If clicking the same item, close it. Otherwise, open the new one.
      return prev === title ? null : title
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItem === item.title

            return (
              <SidebarMenuItem key={item.title}>
                {hasChildren ? (
                  <>
                    <SidebarMenuButton
                      onClick={() => toggleItem(item.title)}
                      className="w-full justify-between text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="size-4" />}
                        <span className={cn(
                          "text-sm",
                          isExpanded && "font-semibold text-white"
                        )}>{item.title}</span>
                      </div>
                      {isExpanded ? (
                        <IconChevronUp className="size-4" />
                      ) : (
                        <IconChevronDown className="size-4" />
                      )}
                    </SidebarMenuButton>
                    {isExpanded && (
                      <SidebarMenuSub className="border-l border-white/20">
                        {item.children?.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={child.isActive}
                              className={cn(
                                "relative pl-6 text-white/80",
                                child.isActive && "font-semibold text-white"
                              )}
                            >
                              <a href={child.url}>
                                {child.isActive && (
                                  <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-primary" />
                                )}
                                <span>{child.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild className="text-white/80 hover:text-white hover:bg-white/10">
                    <a href={item.url}>
                      {item.icon && <item.icon className="size-4" />}
                      <span className="text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
