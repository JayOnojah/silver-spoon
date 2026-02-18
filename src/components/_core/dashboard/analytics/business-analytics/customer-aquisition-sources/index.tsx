"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { GraphBarSm } from "../../../finance/svg";

//Types

interface ExpenseItem {
    name: string;
    value: number;
    color: string;
}

//Data

const EXPENSES: ExpenseItem[] = [
    { name: "Organic Social", value: 28, color: "#4CAF82" },
    { name: "Facebook", value: 22, color: "#F5A623" },
    { name: "Referrals", value: 10, color: "#E8441A" },
    { name: "Direct", value: 35, color: "#4A90D9" },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;
    const item = payload[0];
    return (
        <div className="bg-[#121926] text-white rounded-xl px-4 py-2 shadow-xl text-sm">
            <p className="font-semibold">{item.name}</p>
            <p className="text-white/80">{item.value}%</p>
        </div>
    );
};

// Main Component

export const CustomerAcquisitionSources = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <>
            <div className="bg-white rounded-2xl p-6 w-full">
                {/* Title */}
                <p className="text-sm font-bold text-[#121926] mb-6">Customer Acquisition Sources</p>

                <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Pie Chart */}
                    <div className="shrink-0 w-55 h-55 mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={EXPENSES}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={105}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    stroke="white"
                                    strokeWidth={0}
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    {EXPENSES.map((entry, index) => (
                                        <Cell
                                            key={entry.name}
                                            fill={entry.color}
                                            opacity={activeIndex === null || activeIndex === index ? 1 : 0.55}
                                            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 flex flex-col gap-5">
                        {EXPENSES.map((item, index) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between cursor-pointer"
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-3 h-3 rounded-full shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span
                                        className={`text-sm transition-colors duration-200 ${activeIndex === index ? "text-[#121926] font-medium" : "text-[#9AA4B2]"
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-[#121926]">({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isEmpty && (
                <div className="w-full mt-6 py-30 bg-white flex flex-col justify-center rounded-2xl">
                    <div className="flex justify-center mb-5">
                        <GraphBarSm />
                    </div>
                    <h1 className="text-black mb-2 font-bold text-[18px] text-center">No expenses recorded yet</h1>
                    <p className="text-[#9AA4B2] text-sm text-center">Track your business expenses to see a breakdown here.</p>
                </div>
            )}
        </>
    );
};