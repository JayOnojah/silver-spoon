"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { useState } from "react";

interface Order {
  id: string;
  client: string;
  amount: string;
  paymentStatus: {
    label: string;
    variant: "notPaid" | "overdue" | "paid" | "partial";
  };
  orderStatus: {
    label: string;
    variant: "notStarted" | "inProgress" | "ready" | "fitting";
  };
  dueDate: string;
}

const RecentOrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const orders: Order[] = [
    {
      id: "Order 233",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Not Paid", variant: "notPaid" },
      orderStatus: { label: "Not Started", variant: "notStarted" },
      dueDate: "Dec 17, 2025",
    },
    {
      id: "Order 233",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Not Paid", variant: "notPaid" },
      orderStatus: { label: "In Progress", variant: "inProgress" },
      dueDate: "Dec 17, 2025",
    },
    {
      id: "Order 233",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Overdue", variant: "overdue" },
      orderStatus: { label: "Ready", variant: "ready" },
      dueDate: "Dec 17, 2025",
    },
    {
      id: "Order 233",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Paid In Full", variant: "paid" },
      orderStatus: { label: "Fitting", variant: "fitting" },
      dueDate: "Dec 17, 2025",
    },
    {
      id: "Order 233",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Partial Payment", variant: "partial" },
      orderStatus: { label: "Fitting", variant: "fitting" },
      dueDate: "Dec 17, 2025",
    },
  ];

  const getPaymentStatusBadgeClass = (variant: string) => {
    switch (variant) {
      case "notPaid":
        return "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]";
      case "overdue":
        return "bg-[#FEE2E2] border-[#EF4444] text-[#EF4444]";
      case "paid":
        return "bg-[#D1FAE5] border-[#10B981] text-[#10B981]";
      case "partial":
        return "bg-[#DBEAFE] border-[#3B82F6] text-[#3B82F6]";
      default:
        return "bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5565]";
    }
  };

  const getOrderStatusBadgeClass = (variant: string) => {
    switch (variant) {
      case "notStarted":
        return "bg-[#F9FAFB] border-[#9AA4B2] text-[#9AA4B2]";
      case "inProgress":
        return "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]";
      case "ready":
        return "bg-[#D1FAE5] border-[#10B981] text-[#10B981]";
      case "fitting":
        return "bg-[#EDE9FE] border-[#8B5CF6] text-[#8B5CF6]";
      default:
        return "bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5565]";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
        <Link
          href="#"
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          View All
          <IconChevronRight className="size-4" />
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#FEEDE9] hover:bg-[#FEEDE9]">
            <TableHead className="text-[#4B5565] font-medium">
              Order ID
            </TableHead>
            <TableHead className="text-[#4B5565] font-medium">Client</TableHead>
            <TableHead className="text-[#4B5565] font-medium">
              Order Amount
            </TableHead>
            <TableHead className="text-[#4B5565] font-medium">
              Payment Status
            </TableHead>
            <TableHead className="text-[#4B5565] font-medium">
              Order Status
            </TableHead>
            <TableHead className="text-[#4B5565] font-medium">
              Due Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              key={index}
              className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
            >
              <TableCell className="font-medium text-foreground">
                {order.id}
              </TableCell>
              <TableCell className="text-[#4B5565]">{order.client}</TableCell>
              <TableCell className="text-[#4B5565]">{order.amount}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "border text-xs font-medium px-2 py-0.5",
                    getPaymentStatusBadgeClass(order.paymentStatus.variant),
                  )}
                >
                  {order.paymentStatus.label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "border text-xs font-medium px-2 py-0.5",
                    getOrderStatusBadgeClass(order.orderStatus.variant),
                  )}
                >
                  {order.orderStatus.label}
                </Badge>
              </TableCell>
              <TableCell className="text-[#4B5565]">{order.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#E5E7EB]">
        {/* Page Status */}
        <div className="text-sm text-[#4B5565]">
          Page {currentPage} of {totalPages}
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                currentPage === page
                  ? "bg-primary text-white"
                  : "text-[#4B5565] hover:text-foreground",
              )}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={cn(
              "w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center transition-colors",
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#F9FAFB] hover:border-[#D1D5DB]",
            )}
          >
            <IconChevronLeft className="size-4 text-[#4B5565]" />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={cn(
              "w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center transition-colors",
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#F9FAFB] hover:border-[#D1D5DB]",
            )}
          >
            <IconChevronRight className="size-4 text-[#4B5565]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
