"use client";

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

const data = [
    { date: "May 10", value: 15 },
    { date: "May 10", value: 17 },
    { date: "May 10", value: 16 },
    { date: "May 10", value: 18 },
    { date: "May 10", value: 17.5 },
    { date: "May 10", value: 18, label: "Mar 20, 2025" },
    { date: "May 10", value: 21 },
    { date: "May 10", value: 19 },
    { date: "May 10", value: 22 },
    { date: "May 10", value: 23 },
];

// Give each point a unique key for recharts
const chartData = data.map((d, i) => ({ ...d, key: i }));

interface CustomTooltipProps extends TooltipProps<number, string> { }

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const point = payload[0].payload;
        return (
            <div
                style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    color: "#fff",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <p style={{ fontWeight: 600, marginBottom: 2 }}>
                    {point.label || "Mar 20, 2025"}
                </p>
                <p style={{ color: "#d1d5db" }}>{payload[0].value} Orders</p>
                {/* Arrow */}
                <div
                    style={{
                        position: "absolute",
                        bottom: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid #1a1f2e",
                    }}
                />
            </div>
        );
    }
    return null;
};

const CustomDot = (props: any) => {
    const { cx, cy, active } = props;
    if (!active) return null;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill="#F4511E"
            stroke="#fff"
            strokeWidth={2}
        />
    );
};

export default function OrderOverviewChart() {
    return (
        <div className="w-full bg-white px-6 pt-5 pb-4 rounded-2xl mt-6">
            {/* Header */}
            <p className="text-sm text-[#121926] mb-1">Order Overview</p>
            <p className="text-[18px] font-bold text-[#121926] mb-6">
                3000{" "}
                <span className="text-sm font-normal text-[#121926]">Orders</span>
            </p>

            <ResponsiveContainer width="100%" height={260}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F4511E" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="#F4511E" stopOpacity={0.01} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        stroke="#f0f0f0"
                        strokeDasharray=""
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        dy={10}
                    />

                    <YAxis
                        domain={[0, 28]}
                        ticks={[0, 7, 14, 21, 28]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        tickFormatter={(v) => (v === 0 ? "0" : v)}
                        width={28}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: "#9ca3af",
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#F4511E"
                        strokeWidth={1.5}
                        fill="url(#orderGradient)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#F4511E", stroke: "#fff", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}