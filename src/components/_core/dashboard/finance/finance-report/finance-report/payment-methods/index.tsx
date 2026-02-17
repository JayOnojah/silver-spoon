"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
    Cell,
} from "recharts";
import { Wallet } from "../../../../wallet/svg";

interface PaymentMethod {
    name: string;
    value: number;
    dotColor: string;
}

// Data
const PAYMENT_DATA: PaymentMethod[] = [
    { name: "Not Paid", value: 33, dotColor: "#F5A623" },
    { name: "Partial Payment", value: 33, dotColor: "#3B5BDB" },
    { name: "Paid In Full", value: 56, dotColor: "#4CAF82" },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div className="bg-[#121926] text-white rounded-xl px-4 py-2.5 shadow-xl text-sm">
            <p className="font-semibold">{label}</p>
            <p className="text-white/80 mt-0.5">{payload[0].value} orders</p>
        </div>
    );
};

// Custom Bar Shape — flat top, square bottom

const SquareBar = (props: any) => {
    const { x, y, width, height } = props;
    if (!height || height <= 0) return <g />;
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={0}
            ry={0}
            fill="#E8441A"
        />
    );
};

// Main Component

export const PaymentMethodsUsed = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <>
            <div className="bg-white rounded-2xl md:p-6 p-4 w-full mt-6">
                {/* Title */}
                <p className="text-sm font-bold text-[#121926] mb-6">Payment Methods Used</p>

                <div className="flex flex-col md:flex-row items-stretch gap-8">

                    {/* ── Bar Chart ── */}
                    <div className="flex-1 min-w-0">
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                                data={PAYMENT_DATA}
                                barSize={150}
                                barGap={0}
                                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#F0F2F5"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9AA4B2", fontSize: 12, radius: 20 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#9AA4B2", fontSize: 12, radius: 20 }}
                                    ticks={[0, 7, 14, 21, 28]}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: "#F9FAFB" }}
                                />
                                <Bar
                                    dataKey="value"
                                    shape={<SquareBar />}
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    radius={[0, 0, 0, 0]}
                                >
                                    {PAYMENT_DATA.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill="#E8441A"
                                            opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* ── Legend Cards ── */}
                    <div className="flex flex-col gap-3 justify-center md:w-85 shrink-0">
                        {PAYMENT_DATA.map((item, index) => (
                            <div
                                key={item.name}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                className={`flex items-center justify-between border rounded-2xl px-4 py-4 cursor-pointer transition-all duration-200 ${activeIndex === index
                                    ? "border-[#E3E8EF] shadow-md bg-gray-50"
                                    : "border-[#E3E8EF] bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: item.dotColor }}
                                    />
                                    <span className="text-sm text-[#364152]">{item.name}</span>
                                </div>
                                <span className="text-lg font-black text-[#121926]">{item.value}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            {isEmpty && (
                <div className="w-full mt-6 py-30 bg-white flex flex-col justify-center rounded-2xl">
                    <div className="flex justify-center mb-5">
                        <Wallet />
                    </div>
                    <h1 className="text-black mb-2 font-bold text-[18px] text-center">No payment data available yet</h1>
                    <p className="text-[#9AA4B2] text-sm text-center">Payment method insights will appear after transactions are recorded.</p>
                </div>
            )}
        </>
    );
};