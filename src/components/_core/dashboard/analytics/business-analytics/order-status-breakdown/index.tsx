"use client";

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

const data = [
    { label: "Not Started", value: 28 },
    { label: "In Progress", value: 20 },
    { label: "Fitting", value: 15 },
    { label: "Completed", value: 14 },
    { label: "Delivered", value: 9 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#121926] text-white rounded-lg px-3 py-2 shadow-md text-xs">
                <p className="font-semibold">{label}</p>
                <p className="text-[#F74F25] font-bold">{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export default function OrderStatusChart() {
    return (
        <div className="w-full bg-white rounded-2xl p-5">
            <h2 className="text-sm font-bold text-[#121926] mb-4 tracking-tight">
                Order Status Breakdown
            </h2>

            <ResponsiveContainer width="100%" height={220}>
                <BarChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                    barCategoryGap="10%"
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#f0f0f0"
                        strokeDasharray=""
                    />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        dy={8}
                    />
                    <YAxis
                        domain={[0, 28]}
                        ticks={[0, 7, 14, 21, 28]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        tickFormatter={(v) => (v === 0 ? "" : v)}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    />
                    <Bar
                        dataKey="value"
                        fill="#F74F25"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={64}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}