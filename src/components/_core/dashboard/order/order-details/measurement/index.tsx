"use client";
import { cn } from "@/src/lib/utils";
import React from "react";
import Designs from "./designs";
import CustomersMeasurement from "./customer-measurement";
import OrderCost from "./order-cost";
import MoodBoard from "../moodboard";
import { TodosAndTask } from "./todos-and-task";

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
      <div className="flex bg-white rounded-lg mb-2 items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative w-fit py-3 px-2 text-sm font-bold transition-colors whitespace-nowrap",
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
      <div className="bg-white rounded-xl p-6">
        {activeTab === "customer-measurements" && <CustomersMeasurement />}

        {/* Order Cost Content */}
        {activeTab === "order-cost" && <OrderCost />}

        {/* Designs Content */}
        {activeTab === "designs" && <Designs />}

        {/* Moodboard Content */}
        {activeTab === "moodboard" && <MoodBoard />}

        {/* Todos & Tasks Content */}
        {activeTab === "todos-tasks" && <TodosAndTask />}

        {/* Placeholder for other tabs */}
        {activeTab !== "customer-measurements" &&
          activeTab !== "order-cost" &&
          activeTab !== "designs" &&
          activeTab !== "moodboard" &&
          activeTab !== "todos-tasks" && (
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
