"use client";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { IconEdit, IconEyeOff } from "@tabler/icons-react";
import React from "react";
import CustomersMeasurement from "./customers-measurement";
import OrderCost from "./order-cost";

const Measurement = () => {
  const [activeTab, setActiveTab] = React.useState("customer-measurements");

  const tabs = [
    { id: "customer-measurements", label: "Customer Measurements" },
    { id: "order-cost", label: "Order Cost" },
    { id: "designs", label: "Designs" },
    { id: "moodboard", label: "Moodboard" },
    { id: "todos-tasks", label: "Todos & Tasks" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div>
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-4 overflow-x-auto border-b border-[#E5E7EB]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative w-fit pb-3 text-sm font-bold transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "text-foreground border-b-2 border-primary"
                  : "text-[#9AA4B2]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Customer Measurements Content */}
        {activeTab === "customer-measurements" && <CustomersMeasurement />}

        {/* Order Cost Content */}
        {activeTab === "order-cost" && <OrderCost />}

        {/* Placeholder for other tabs */}
        {activeTab !== "customer-measurements" &&
          activeTab !== "order-cost" && (
            <div className="mt-6 text-center py-12 text-[#6B7280]">
              {tabs.find((t) => t.id === activeTab)?.label} content coming
              soon...
            </div>
          )}
      </div>
    </div>
  );
};

export default Measurement;
