"use client";

import React from "react";
import { CustomerIcon, FinanceIcon, OrdersIcon } from "../../../layout/svg";
import { CalendarMarkIcon } from "../svg";
import { cn } from "@/lib/utils";

interface MetricData {
  id: string;
  label: string;
  value: string;
  subLabel: string;
  icon: React.ComponentType;
  change?: string; // For percentage change like "+12%"
  isFilled?: boolean; // Flag to determine filled/empty state
}

interface MetricProps {
  isFilled?: boolean; // Flag to determine filled/empty state
}

const Metric = ({ isFilled = false }: MetricProps) => {

  const metrics: MetricData[] = [
    {
      id: "activeOrders",
      label: "Active Orders",
      value: isFilled ? "34" : "0",
      subLabel: "Active",
      icon: OrdersIcon,
      isFilled,
    },
    {
      id: "appointments",
      label: "Appointments",
      value: isFilled ? "34" : "0",
      subLabel: "Today",
      icon: CalendarMarkIcon,
      isFilled,
    },
    {
      id: "revenue",
      label: "Revenue (Month To Date)",
      value: isFilled ? "₦450K" : "0.00",
      subLabel: isFilled ? "+12%" : "---",
      icon: FinanceIcon,
      change: isFilled ? "+12%" : undefined,
      isFilled,
    },
    {
      id: "customers",
      label: "Total Customers",
      value: isFilled ? "34" : "0",
      subLabel: isFilled ? "+12%" : "---",
      icon: CustomerIcon,
      change: isFilled ? "+12%" : undefined,
      isFilled,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.id}
            className="bg-white rounded-xl p-5 border border-[#FFF1EC]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-primary">
                <Icon />
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  metric.change
                    ? "text-[#10B981]"
                    : "text-[#9AA4B2]",
                )}
              >
                {metric.subLabel}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">
                {metric.value}
              </p>
              <p className="text-sm text-[#4B5565]">{metric.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Metric;
