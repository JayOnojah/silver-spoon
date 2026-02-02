"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import OrderTable from "./order-table";
import OrderMobile from "./order-mobile";
import EmptyOrder from "./empty-order";
import Pagination from "./pagination";

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
  createdDate: string;
}

const OrderContent = () => {
  const [mainTab, setMainTab] = useState("in-store");
  const [subTab, setSubTab] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilled, setIsFilled] = React.useState(false);
  const totalPages = 10;

  const subTabs = [
    { id: "all", label: "All Orders", count: isFilled ? 30 : 0 },
    { id: "not-started", label: "Not Started", count: isFilled ? 30 : 0 },
    { id: "in-progress", label: "In Progress", count: isFilled ? 30 : 0 },
    { id: "fitting", label: "Fitting", count: isFilled ? 30 : 0 },
    { id: "ready", label: "Ready", count: isFilled ? 30 : 0 },
  ];

  const allOrders: Order[] = [
    {
      id: "5734-1",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Not Paid", variant: "notPaid" },
      orderStatus: { label: "Not Started", variant: "notStarted" },
      createdDate: "Dec 17, 2025",
    },
    {
      id: "5734-2",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Partial Payment", variant: "partial" },
      orderStatus: { label: "In Progress", variant: "inProgress" },
      createdDate: "Dec 17, 2025",
    },
    {
      id: "5734-3",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Overdue", variant: "overdue" },
      orderStatus: { label: "In Progress", variant: "inProgress" },
      createdDate: "Dec 17, 2025",
    },
    {
      id: "5734-4",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Partial Payment", variant: "partial" },
      orderStatus: { label: "Ready", variant: "ready" },
      createdDate: "Dec 17, 2025",
    },
    {
      id: "5734-5",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Paid In Full", variant: "paid" },
      orderStatus: { label: "Fitting", variant: "fitting" },
      createdDate: "Dec 17, 2025",
    },
    {
      id: "5734-6",
      client: "Sarah Anderson",
      amount: "₦40,000",
      paymentStatus: { label: "Paid In Full", variant: "paid" },
      orderStatus: { label: "Fitting", variant: "fitting" },
      createdDate: "Dec 17, 2025",
    },
  ];

  const orders: Order[] = isFilled ? allOrders : [];

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Reset selected orders when switching states
  React.useEffect(() => {
    setSelectedOrders([]);
  }, [isFilled]);

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  const isAllSelected =
    selectedOrders.length === orders.length && orders.length > 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsFilled(!isFilled)}
        className="fixed bottom-20 right-6 sm:bottom-6 rounded shadow-lg hover:shadow-xl z-50 bg-primary text-white"
      >
        Show {!isFilled ? "Data" : "Empty"} State
      </Button>
      {/* Main Navigation Tabs */}
      <div className="mb-4">
        <div className="flex sm:inline-flex p-1 rounded-full border-2 border-foreground overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setMainTab("in-store")}
            className={cn(
              "w-1/2 whitespace-nowrap",
              "px-4 py-2 text-xs sm:text-sm transition-colors rounded-full font-bold",
              mainTab === "in-store"
                ? "bg-primary text-white"
                : "bg-white text-foreground",
            )}
          >
            In-Store Orders ({isFilled ? 30 : 0})
          </button>
          <button
            type="button"
            onClick={() => setMainTab("online")}
            className={cn(
              "w-1/2 whitespace-nowrap",
              "px-4 py-2 text-xs sm:text-sm font-bold transition-colors rounded-full",
              mainTab === "online"
                ? "bg-primary text-white "
                : "bg-white text-foreground",
            )}
          >
            Online Orders ({isFilled ? 30 : 0})
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="mb-6 sm:mb-2 bg-white rounded-md">
        <div className="flex items-center gap-8 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id)}
              className={cn(
                "relative p-3 text-sm font-semibold transition-colors whitespace-nowrap",
                subTab === tab.id
                  ? "text-foreground border-b-2 border-primary"
                  : "text-[#9AA4B2] font-normal",
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="sm:bg-white rounded-xl sm:p-6">
        {orders.length === 0 ? (
          <EmptyOrder />
        ) : (
          <>
            <div className="flex justify-between sm:items-center gap-5 mb-3">
              <h2 className="text-lg font-bold text-foreground">All Orders</h2>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-[#6B7280] mr-2 hidden sm:inline">
                  Sort by:
                </span>
                <Select defaultValue="due-date">
                  <SelectTrigger className="w-45 border-2! sm:border! border-[#CDD5DF]! sm:border-[#CDD5DF]! py-5!">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due-date">Due Date</SelectItem>
                    <SelectItem value="created-date">Customer Name</SelectItem>
                    <SelectItem value="amount">Order Value</SelectItem>
                    <SelectItem value="client">Created Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
                <Input
                  type="text"
                  placeholder="Search by title, customer name..."
                  className="pl-10 w-full border-2! sm:border! border-[#CDD5DF]! sm:border-[#CDD5DF]! py-5"
                />
              </div>
              {/* Payment Status Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-45 border-2! sm:border! border-[#CDD5DF]! sm:border-[#CDD5DF]! py-5!">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="not-paid">Not Paid</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                  <SelectItem value="paid">Paid In Full</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Orders Table for Desktop view */}
            <OrderTable
              orders={orders}
              selectedOrders={selectedOrders}
              isAllSelected={isAllSelected}
              handleSelectAll={handleSelectAll}
              handleSelectOrder={handleSelectOrder}
              getPaymentStatusBadgeClass={getPaymentStatusBadgeClass}
              getOrderStatusBadgeClass={getOrderStatusBadgeClass}
            />

            {/* Mobile Card View */}
            <OrderMobile
              orders={orders}
              selectedOrders={selectedOrders}
              handleSelectOrder={handleSelectOrder}
              getPaymentStatusBadgeClass={getPaymentStatusBadgeClass}
              getOrderStatusBadgeClass={getOrderStatusBadgeClass}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderContent;
