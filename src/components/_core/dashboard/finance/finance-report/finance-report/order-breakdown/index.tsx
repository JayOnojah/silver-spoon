"use client";

import { useState, useRef, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import { Cart } from "../../../svg";

type Period = "Daily" | "Weekly" | "Monthly";

interface DataPoint {
    label: string;
    inStore: number;
    online: number;
}

// Mock Data

const DATA: Record<Period, DataPoint[]> = {
    Daily: [
        { label: "Mon", inStore: 220, online: 180 },
        { label: "Tue", inStore: 160, online: 140 },
        { label: "Wed", inStore: 230, online: 190 },
        { label: "Thur", inStore: 170, online: 150 },
        { label: "Fri", inStore: 225, online: 185 },
        { label: "Sat", inStore: 155, online: 130 },
        { label: "Sun", inStore: 150, online: 125 },
    ],
    Weekly: [
        { label: "Wk 1", inStore: 900, online: 750 },
        { label: "Wk 2", inStore: 1100, online: 820 },
        { label: "Wk 3", inStore: 950, online: 700 },
        { label: "Wk 4", inStore: 1200, online: 900 },
    ],
    Monthly: [
        { label: "Jan", inStore: 3200, online: 2800 },
        { label: "Feb", inStore: 2900, online: 2400 },
        { label: "Mar", inStore: 3500, online: 3100 },
        { label: "Apr", inStore: 3100, online: 2700 },
        { label: "May", inStore: 3800, online: 3300 },
        { label: "Jun", inStore: 3400, online: 2900 },
    ],
};

const TOTALS: Record<Period, number> = {
    Daily: 400,
    Weekly: 1800,
    Monthly: 9200,
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div className="bg-[#121926] text-white rounded-xl px-4 py-3 shadow-xl text-sm">
            <p className="font-semibold mb-2">{label}</p>
            {payload.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                    <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-white/80 capitalize">{entry.name}:</span>
                    <span className="font-medium">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

// Legend

const Legend = () => (
    <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E8441A]" />
            <span className="text-sm text-[#6B7280]">In-Store Orders</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FDDDD5]" />
            <span className="text-sm text-[#6B7280]">Online Orders</span>
        </div>
    </div>
);

// Main Component

export const OrderBreakdown = () => {
    const [activePeriod, setActivePeriod] = useState<Period>("Daily");
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
    const periodRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [isEmpty, setIsEmpty] = useState(false);

    const periods: Period[] = ["Daily", "Weekly", "Monthly"];

    const data = DATA[activePeriod];
    const total = TOTALS[activePeriod];

    useEffect(() => {
        const activeIndex = periods.indexOf(activePeriod);
        const activeEl = periodRefs.current[activeIndex];
        if (activeEl) {
            setPillStyle({
                left: activeEl.offsetLeft,
                width: activeEl.offsetWidth,
            });
        }
    }, [activePeriod]);

    return (
        <>
            <div className="bg-white rounded-2xl md:p-6 p-4 w-full h-full">
                {/* Header row */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                    <div className="">
                        <p className="text-sm text-[#9AA4B2] font-bold">Order Breakdown</p>
                        {/* Total count */}
                        <p className="text-[28px] font-black text-[#121926] leading-tight">
                            {total.toLocaleString()}{" "}
                            <span className="text-[22px] font-bold">orders</span>
                        </p>
                    </div>


                    <div className="relative flex items-center border border-[#1a1a1a] rounded-full p-1">
                        {/* Sliding pill */}
                        <span
                            className="absolute top-1 bottom-1 rounded-full bg-[#E8441A] shadow-sm transition-all duration-300 ease-out"
                            style={{
                                left: pillStyle.left,
                                width: pillStyle.width,
                            }}
                        />
                        {periods.map((period, idx) => (
                            <button
                                key={period}
                                ref={(el) => { periodRefs.current[idx] = el; }}
                                onClick={() => setActivePeriod(period)}
                                className={`relative z-10 px-5 py-2 w-full rounded-full text-sm font-medium transition-colors duration-300 ${activePeriod === period
                                    ? "text-white"
                                    : "text-[#9AA4B2] hover:text-[#364152]"
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        barSize={activePeriod === "Daily" ? 64 : activePeriod === "Weekly" ? 80 : 60}
                        barGap={0}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} stroke="#F0F2F5" />

                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9AA4B2", fontSize: 13 }}
                            dy={10}
                        />

                        <YAxis hide />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "transparent" }}
                        />

                        {/* Online orders (light, bottom visually = rendered first as stacked) */}
                        <Bar
                            dataKey="online"
                            name="Online Orders"
                            stackId="orders"
                            fill="#FDDDD5"
                            radius={[0, 0, 0, 0]}
                        />

                        {/* In-store orders (dark orange, top of stack) */}
                        <Bar
                            dataKey="inStore"
                            name="In-Store Orders"
                            stackId="orders"
                            fill="#E8441A"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>

                {/* Legend */}
                <Legend />
            </div>

            {isEmpty && (
                <div className="w-full py-30 bg-white flex flex-col justify-center rounded-2xl">
                    <div className="flex justify-center mb-5">
                        <Cart />
                    </div>
                    <h1 className="text-black mb-2 font-bold text-[18px] text-center">No order recorded yet</h1>
                    <p className="text-[#9AA4B2] text-sm text-center">Your order insights will appear once orders are made.</p>
                </div>
            )}
        </>
    );
};