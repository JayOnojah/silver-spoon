"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IconChevronLeft, IconNotification } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <header
      className="fixed top-0 right-0 z-20 flex h-(--header-height) shrink-0 items-center gap-2 border-b border-[#CDD5DF] transition-[width,height,left] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
      style={{
        backgroundColor: "#FFF1EC",
        left: state === "collapsed" ? "0px" : "var(--sidebar-width)",
        transition: "left 0.2s ease-linear",
      }}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Button
          onClick={toggleSidebar}
          className={cn(
            "bg-primary border-2 border-white rounded-full text-white hover:bg-primary/90 absolute top-4 size-9",
            state === "expanded" ? "-left-3.5" : "left-4"
          )}
          size="icon"
        >
          <IconChevronLeft className="size-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>

        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full border border-[#CDD5DF] hover:bg-transparent"
          >
            <IconNotification className="h-5 w-5 text-foreground" />
          </Button>

          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[#10B981] text-white font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold">John Doe</span>
              <span className="text-xs text-[#9AA4B2]">Fashion Designer</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
