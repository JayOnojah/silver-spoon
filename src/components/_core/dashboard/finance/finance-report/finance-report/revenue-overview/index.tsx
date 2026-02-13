"use client";

import { useState } from "react";
import { FormatCurrency } from "../../../../shared/format-currency";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";


type OrderType = "In-Store Orders" | "Online Orders" | "All Orders";

interface DataPoint {
    date: string;
    value: number;
}

const formatAxisValue = (value: number): string => {
    if (value === 0) return "0";
    return value.toLocaleString();
};

// Mock data per order type

const DATA: Record<OrderType, DataPoint[]> = {
    "In-Store Orders": [
        { date: "May 10", value: 16000 },
        { date: "May 10", value: 19500 },
        { date: "May 10", value: 17500 },
        { date: "May 10", value: 22500 },
        { date: "May 10", value: 24000 },
        { date: "May 10", value: 28500 },
        { date: "May 10", value: 25000 },
        { date: "May 10", value: 23000 },
        { date: "May 10", value: 27000 },
        { date: "May 10", value: 29500 },
        { date: "May 10", value: 31000 },
    ],
    "Online Orders": [
        { date: "May 10", value: 12000 },
        { date: "May 10", value: 15000 },
        { date: "May 10", value: 14000 },
        { date: "May 10", value: 18000 },
        { date: "May 10", value: 21000 },
        { date: "May 10", value: 24000 },
        { date: "May 10", value: 22000 },
        { date: "May 10", value: 20000 },
        { date: "May 10", value: 23000 },
        { date: "May 10", value: 26000 },
        { date: "May 10", value: 28000 },
    ],
    "All Orders": [
        { date: "May 10", value: 28000 },
        { date: "May 10", value: 34500 },
        { date: "May 10", value: 31500 },
        { date: "May 10", value: 40500 },
        { date: "May 10", value: 45000 },
        { date: "May 10", value: 52500 },
        { date: "May 10", value: 47000 },
        { date: "May 10", value: 43000 },
        { date: "May 10", value: 50000 },
        { date: "May 10", value: 55500 },
        { date: "May 10", value: 59000 },
    ],
};

// Custom Tooltip
interface CustomTooltipPayload {
    value: number;
}

const CustomTooltip = ({
    active,
    payload,
}: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const item = payload[0] as { payload: DataPoint; value: number };

    return (
        <div className="bg-[#121926] text-white rounded-xl px-4 py-3 shadow-xl text-sm">
            <p className="font-semibold mb-1">Mar 20, 2025</p>
            <p className="text-white/90">{FormatCurrency(item.value)}</p>
        </div>
    );
};

// Main Component

export const RevenueOverview = () => {
    const [selectedType, setSelectedType] = useState<OrderType>("In-Store Orders");

    const data = DATA[selectedType];

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 w-full">
            {/* Header row */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div className="">
                    <p className="text-sm text-[#9AA4B2] font-bold">Revenue Overview</p>
                    <p className="text-[28px] font-black text-[#121926] leading-tight">
                        {FormatCurrency(300000)}
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-between gap-2 border border-[#E3E8EF] rounded-lg px-4 py-2.5 text-sm font-bold text-[#9AA4B2] hover:bg-gray-50 transition-colors focus:outline-none">
                            {selectedType}
                            <ChevronDown className="w-4 h-4 text-[#9AA4B2]" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="md:w-44 w-76 rounded-xl">
                        {(Object.keys(DATA) as OrderType[]).map((type) => (
                            <DropdownMenuItem
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`text-sm cursor-pointer ${selectedType === type ? "font-semibold text-[#E8703A]" : ""
                                    }`}
                            >
                                {type}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E8703A" stopOpacity={0.18} />
                            <stop offset="100%" stopColor="#E8703A" stopOpacity={0.01} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        vertical={false}
                        stroke="#F0F2F5"
                        strokeDasharray=""
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9AA4B2", fontSize: 12 }}
                        dy={10}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9AA4B2", fontSize: 12 }}
                        tickFormatter={formatAxisValue}
                        ticks={[0, 7500, 15000, 22500, 30000]}
                        dx={-8}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: "#9AA4B2",
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                        }}
                    />

                    <Area
                        type="linear"
                        dataKey="value"
                        stroke="#E8703A"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                        dot={false}
                        activeDot={{
                            r: 5,
                            fill: "#E8703A",
                            stroke: "#fff",
                            strokeWidth: 2,
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};