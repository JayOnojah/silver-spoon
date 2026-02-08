"use client";

import { useEffect, useRef, useState } from "react";

export type TabItem = {
  id: string;
  label: string;
  count?: number;
};

type MoodboardTabsProps = {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

export function MoodboardTabs({ tabs, activeTab, setActiveTab }: MoodboardTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = () => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeEl = tabRefs.current[activeIndex];
    const containerEl = containerRef.current;

    if (!activeEl || !containerEl) return;

    setIndicatorStyle({
      left: activeEl.offsetLeft - containerEl.scrollLeft,
      width: activeEl.offsetWidth,
    });
  };

  useEffect(() => {
    updateIndicator();

    // keep active tab visible when overflow-x-auto
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeTab, tabs]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const onScroll = () => updateIndicator();
    containerEl.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(containerEl);

    return () => {
      containerEl.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [tabs, activeTab]);

  return (
    <div className="w-full bg-white rounded-xl pr-6 mb-4">
      <div ref={containerRef} className="relative overflow-x-auto">
        <div className="flex gap-8 px-6 whitespace-nowrap">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                "relative py-4 text-sm cursor-pointer font-bold transition-colors duration-200",
                activeTab === tab.id ? "text-[#121926]" : "text-[#9AA4B2] hover:text-gray-600",
              ].join(" ")}
            >
              {tab.label}
              {typeof tab.count === "number" ? ` (${tab.count})` : ""}
            </button>
          ))}
        </div>

        {/* Animated underline indicator */}
        <div
          className="absolute bottom-0 h-1 bg-[#F74F25] transition-all duration-300 ease-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      </div>
    </div>
  );
}
