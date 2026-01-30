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
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

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
  const totalPages = 10;

  const subTabs = [
    { id: "all", label: "All Orders", count: 30 },
    { id: "not-started", label: "Not Started", count: 30 },
    { id: "in-progress", label: "In Progress", count: 30 },
    { id: "fitting", label: "Fitting", count: 30 },
    { id: "ready", label: "Ready", count: 30 },
  ];

  const orders: Order[] = [
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

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full">
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
            In-Store Orders (30)
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
            Online Orders (30)
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
                <SelectItem value="created-date">Created Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="client">Client Name</SelectItem>
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

        {/* Orders Table */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E5E7EB]">
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Order ID
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Client
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Order Amount
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Payment Status
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Order Status
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Created Date
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOrder(order.id, checked as boolean)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {order.id.split("-")[0]}
                  </TableCell>
                  <TableCell className="text-[#4B5565]">
                    {order.client}
                  </TableCell>
                  <TableCell className="text-[#4B5565]">
                    {order.amount}
                  </TableCell>
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
                  <TableCell className="text-[#4B5565]">
                    {order.createdDate}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto font-medium text-sm"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="sm:flex items-center justify-between mt-6 pt-6 border-t border-[#E5E7EB]">
          {/* Page Status */}
          <div className="text-sm text-[#4B5565]">
            Page {currentPage} of {totalPages}
          </div>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {renderPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "size-8 rounded-full text-sm font-medium transition-colors",
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-white text-[#4B5565] border border-[#E5E7EB] hover:bg-[#F9FAFB]",
                )}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="size-8 rounded-full border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="size-8 rounded-full border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderContent;
