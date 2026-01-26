import React from "react";
import { navItems } from "./constant";
import { cn } from "@/src/lib/utils";

interface IProps {
  activeNav: string
  setActiveNav: React.Dispatch<React.SetStateAction<string>>
}
const SideNav = ({activeNav, setActiveNav}: IProps) => {
  return (
    <div className="w-64 px-6 pb-6 flex flex-col shrink-0">
      <nav className="flex rounded-xl overflow-auto bg-white flex-col p-4 gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors",
              activeNav === item.id
                ? "bg-[#FEEDE9] text-primary font-bold"
                : "text-foreground hover:bg-primary/10",
            )}
          >
            {item.icon}
            <span className="text-xs whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
