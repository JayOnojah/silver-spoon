"use client";

import React from "react";

export type TabItem = {
  id: string;
  label: string;
  count?: number; 
};

type MoodboardTabsProps = {
  tabs: TabItem[];
  defaultActiveId?: string;
};

export function MoodboardTabs({ tabs, defaultActiveId }: MoodboardTabsProps) {
  const firstId = tabs[0]?.id ?? "";
  const [activeId, setActiveId] = React.useState<string>(defaultActiveId ?? firstId);

  return (
    <div className="w-full rounded-lg bg-white shadow-sm overflow-x-auto md:overflow-x-visible py-2 mb-4">
      <div className="flex min-w-max md:min-w-0 items-center gap-8 px-5 md:gap-12 md:flex-wrap">
        {tabs.map((t) => {
          const isActive = t.id === activeId;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={[
                "relative whitespace-nowrap pb-3 text-sm transition",
                isActive
                  ? "font-bold text-[#121926]"
                  : "font-semibold text-[#9AA4B2] hover:text-[#121926]/70",
              ].join(" ")}
            >
              <span>
                {t.label}
                {typeof t.count === "number" ? ` (${t.count})` : ""}
              </span>

              <span
                className={[
                  "absolute left-0 right-0 -bottom-0.5 h-1 rounded-full transition-opacity",
                  isActive ? "bg-[#F74F25] opacity-100" : "opacity-0",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
