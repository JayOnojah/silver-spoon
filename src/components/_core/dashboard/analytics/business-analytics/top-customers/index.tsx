"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const customers = [
    { rank: 1, name: "Sarah Jones", orders: 30, revenue: 240 },
    { rank: 2, name: "Sarah Jones", orders: 8, revenue: 210 },
    { rank: 3, name: "Sarah Jones", orders: 8, revenue: 195 },
    { rank: 4, name: "Sarah Jones", orders: 8, revenue: 180 },
    { rank: 5, name: "Sarah Jones", orders: 8, revenue: 175 },
    { rank: 6, name: "Sarah Jones", orders: 8, revenue: 160 },
    { rank: 7, name: "Michael Brown", orders: 5, revenue: 130 },
    { rank: 8, name: "Emily White", orders: 12, revenue: 310 },
    { rank: 9, name: "David Green", orders: 7, revenue: 95 },
    { rank: 10, name: "David Green", orders: 7, revenue: 85 },
];

const sortOptions = ["By Orders", "By Revenue", "By Name"];

const MAX_ORDERS = Math.max(...customers.map((c) => c.orders));

export default function TopCustomers() {
    const [sortBy, setSortBy] = useState("By Orders");

    return (
        <div className="w-full bg-white rounded-2xl p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-[#121926]">Top Customers</h2>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1.5 text-sm text-[#9AA4B2] border border-gray-200 h-11 rounded-lg px-3 py-1.5 font-bold hover:bg-gray-50 transition-colors outline-none">
                            {sortBy}
                            <ChevronDown className="w-4 h-4 text-[#9AA4B2]" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl shadow-md border border-gray-100 text-sm">
                        {sortOptions.map((opt) => (
                            <DropdownMenuItem
                                key={opt}
                                onClick={() => setSortBy(opt)}
                                className={`cursor-pointer ${sortBy === opt ? "font-medium text-[#121926]" : "text-gray-500"}`}
                            >
                                {opt}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* List */}
            <div className="flex flex-col divide-y divide-gray-50">
                {customers.map((customer) => {
                    const barWidth = (customer.orders / MAX_ORDERS) * 100;

                    return (
                        <div
                            key={`${customer.rank}-${customer.name}`}
                            className="flex items-center gap-3 py-2.5"
                        >
                            {/* Rank */}
                            <span className="w-5 text-sm font-medium text-[#F74F25] text-right shrink-0">
                                {customer.rank}
                            </span>

                            {/* Name */}
                            <span className="flex-1 text-sm text-gray-700 truncate">
                                {customer.name}
                            </span>

                            {/* Bar + Value — fixed right zone */}
                            <div className="flex items-center gap-2 w-45 shrink-0">
                                <div className="flex-1 h-1.25 rounded-full overflow-hidden bg-transparent flex items-center justify-end">
                                    <div
                                        className="h-full rounded-full bg-[#F4511E]"
                                        style={{ width: `${barWidth}%` }}
                                    />
                                </div>
                                <span className="w-4 text-sm font-medium text-[#121926] text-right shrink-0">
                                    {customer.orders}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}