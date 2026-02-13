"use client";

import { useState } from "react";
import { FormatCurrency } from "../../../../shared/format-currency";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
    LabelList,
} from "recharts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Period = "First 6 months" | "Last 6 months" | "Full Year";

interface MonthData {
    month: string;
    orderCost: number;
    expenditure: number;
    revenue: number;
}

// Data

const DATA: Record<Period, MonthData[]> = {
    "First 6 months": [
        { month: "Jan", orderCost: 300000, expenditure: 240000, revenue: 130000 },
        { month: "Feb", orderCost: 280000, expenditure: 230000, revenue: 160000 },
        { month: "Mar", orderCost: 300000, expenditure: 260000, revenue: 175000 },
        { month: "Apr", orderCost: 220000, expenditure: 120000, revenue: 150000 },
        { month: "May", orderCost: 290000, expenditure: 235000, revenue: 145000 },
        { month: "Jun", orderCost: 300000, expenditure: 220000, revenue: 210000 },
    ],
    "Last 6 months": [
        { month: "Jul", orderCost: 310000, expenditure: 250000, revenue: 190000 },
        { month: "Aug", orderCost: 295000, expenditure: 210000, revenue: 180000 },
        { month: "Sep", orderCost: 275000, expenditure: 200000, revenue: 165000 },
        { month: "Oct", orderCost: 320000, expenditure: 270000, revenue: 200000 },
        { month: "Nov", orderCost: 340000, expenditure: 290000, revenue: 220000 },
        { month: "Dec", orderCost: 360000, expenditure: 310000, revenue: 240000 },
    ],
    "Full Year": [
        { month: "Jan", orderCost: 300000, expenditure: 240000, revenue: 130000 },
        { month: "Mar", orderCost: 300000, expenditure: 260000, revenue: 175000 },
        { month: "May", orderCost: 290000, expenditure: 235000, revenue: 145000 },
        { month: "Jul", orderCost: 310000, expenditure: 250000, revenue: 190000 },
        { month: "Sep", orderCost: 275000, expenditure: 200000, revenue: 165000 },
        { month: "Nov", orderCost: 340000, expenditure: 290000, revenue: 220000 },
    ],
};

// Series config

const SERIES = [
    { key: "orderCost", label: "Order Cost", fill: "#FDDDD5", stroke: "#E8441A", textColor: "#E8441A" },
    { key: "expenditure", label: "Expenditure", fill: "#DBEAFE", stroke: "#4A90D9", textColor: "#4A90D9" },
    { key: "revenue", label: "Revenue", fill: "#D1FAE5", stroke: "#4CAF82", textColor: "#4CAF82" },
];

// Custom Tooltip

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div className="bg-[#121926] text-white rounded-xl px-4 py-3 shadow-xl text-sm space-y-1.5">
            <p className="font-semibold mb-1">{label}</p>
            {payload.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-white/70">{entry.name}:</span>
                    <span className="font-medium">{FormatCurrency(entry.value as number)}</span>
                </div>
            ))}
        </div>
    );
};

// Pill bar shape with colored border

const makePillBar = (fill: string, stroke: string) => (props: any) => {
    const { x, y, width, height } = props;
    if (!width || width <= 0) return <g />;
    const r = height / 2;
    return (
        <rect
            x={x} y={y}
            width={width} height={height}
            rx={r} ry={r}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.2}
        />
    );
};

// Inside label, right-aligned

const makeInsideLabel = (textColor: string) => (props: any) => {
    const { x, y, width, height, value } = props;
    if (!value || width < 80) return null;
    return (
        <text
            x={x + width - 10}
            y={y + height / 2 + 4}
            fill={textColor}
            fontSize={11}
            fontWeight={700}
            textAnchor="end"
        >
            {FormatCurrency(value)}
        </text>
    );
};

// Legend

const Legend = () => (
    <div className="flex items-center justify-center gap-6 mt-5">
        {SERIES.map(({ label, stroke }) => (
            <div key={label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stroke }} />
                <span className="text-sm text-[#6B7280]">{label}</span>
            </div>
        ))}
    </div>
);

// Main Component

export const RevenueCostsBreakdown = () => {
    const [period, setPeriod] = useState<Period>("First 6 months");

    const data = DATA[period];
    const periods: Period[] = ["First 6 months", "Last 6 months", "Full Year"];
    const chartHeight = data.length * 95 + 20;

    return (
        <div className="bg-white rounded-2xl md:p-6 p-4 w-full mt-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6">
                <p className="text-sm font-bold text-[#121926]">Revenue vs Costs Breakdown</p>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-between gap-2 border border-[#E3E8EF] rounded-xl px-4 py-2.5 text-sm font-medium text-[#9AA4B2] hover:bg-gray-50 transition-colors focus:outline-none">
                            {period}
                            <ChevronDown className="w-4 h-4 text-[#9AA4B2]" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl w-79 md:w-44">
                        {periods.map((p) => (
                            <DropdownMenuItem
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`text-sm cursor-pointer ${period === p ? "font-semibold text-[#E8441A]" : ""}`}
                            >
                                {p}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                    layout="vertical"
                    data={data}
                    barSize={14}
                    barGap={4}
                    barCategoryGap={28}
                    margin={{ top: 0, right: 16, left: 10, bottom: 0 }}
                >
                    <XAxis type="number" hide domain={[0, "dataMax"]} />
                    <YAxis
                        type="category"
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#121926", fontSize: 13, fontWeight: 600 }}
                        width={36}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                    {SERIES.map(({ key, fill, stroke, textColor, label }) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            name={label}
                            shape={makePillBar(fill, stroke)}
                            isAnimationActive
                        >
                            <LabelList
                                dataKey={key}
                                content={makeInsideLabel(textColor)}
                            />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <Legend />
        </div>
    );
};