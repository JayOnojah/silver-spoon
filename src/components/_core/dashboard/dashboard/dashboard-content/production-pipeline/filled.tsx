"use client";

import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const Filled = () => {
  const stages = [
    {
      id: "new",
      label: "New Orders",
      count: 3,
      color: "blue",
      orders: [
        { id: 1, label: "Order 233" },
        { id: 2, label: "Order 233" },
        { id: 3, label: "Order 233" },
        { id: 4, label: "Order 233" },
      ],
      moreCount: null,
    },
    {
      id: "progress",
      label: "In Progress",
      count: 3,
      color: "yellow",
      orders: [
        { id: 1, label: "Order 233" },
        { id: 2, label: "Order 233" },
        { id: 3, label: "Order 233" },
      ],
      moreCount: 5,
    },
    {
      id: "fitting",
      label: "Fitting",
      count: 3,
      color: "purple",
      orders: [
        { id: 1, label: "Order 233" },
        { id: 2, label: "Order 233" },
      ],
      moreCount: null,
    },
    {
      id: "ready",
      label: "Ready",
      count: 3,
      color: "green",
      orders: [{ id: 1, label: "Order 233" }],
      moreCount: null,
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-[#E0F2FE]",
          border: "border-[#0EA5E9]",
          text: "text-[#0EA5E9]",
          badge: "bg-[#0EA5E9]",
        };
      case "yellow":
        return {
          bg: "bg-[#FEF3C7]",
          border: "border-[#F59E0B]",
          text: "text-[#F59E0B]",
          badge: "bg-[#F59E0B]",
        };
      case "purple":
        return {
          bg: "bg-[#EDE9FE]",
          border: "border-[#8B5CF6]",
          text: "text-[#8B5CF6]",
          badge: "bg-[#8B5CF6]",
        };
      case "green":
        return {
          bg: "bg-[#D1FAE5]",
          border: "border-[#10B981]",
          text: "text-[#10B981]",
          badge: "bg-[#10B981]",
        };
      default:
        return {
          bg: "bg-[#F9FAFB]",
          border: "border-[#E5E7EB]",
          text: "text-[#4B5565]",
          badge: "bg-[#4B5565]",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Production Pipeline</h3>
        <Link
          href="#"
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          View All
          <IconChevronRight className="size-4" />
        </Link>
      </div>

      {/* Pipeline Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {stages.map((stage) => {
          const colors = getColorClasses(stage.color);
          return (
            <div
              key={stage.id}
              className={`${colors.bg} ${colors.border} border rounded-xl p-4 min-w-60 shrink-0`}
            >
              {/* Header with Badge */}
              <div className="flex items-center justify-between mb-4">
                <h4 className={`${colors.text} font-bold text-sm`}>
                  {stage.label}
                </h4>
                <div
                  className={`${colors.badge} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold`}
                >
                  {stage.count}
                </div>
              </div>

              {/* Orders */}
              <div className="space-y-2">
                {stage.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg p-3 border border-[#E5E7EB]"
                  >
                    <p className="text-sm text-[#4B5565]">{order.label}</p>
                  </div>
                ))}
                {stage.moreCount && (
                  <p className="text-sm text-[#9AA4B2] pt-1">
                    + {stage.moreCount} More
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filled;
