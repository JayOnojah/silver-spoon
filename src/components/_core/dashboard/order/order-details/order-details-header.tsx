"use client";

import React, { useState } from "react";
import { Badge } from "@/src/components/ui/badge";
import { Switch } from "@/src/components/ui/switch";
import { Input } from "@/src/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";
import {
  BinSvg,
  CarSvg,
  DocSvg,
  EditSvg,
  LinkSvg,
  MoreSvg,
  NotificationSvg,
} from "../svg";
import { IconChevronDown, IconCircle } from "@tabler/icons-react";

const OrderDetailsHeader = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Not Started");
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");
  const [partialAmount, setPartialAmount] = useState("");
  const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);

  const orderStatuses = ["Not Started", "In Progress", "Ready", "Fitting"];
  const paymentStatuses = [
    "Not Paid",
    "Partial Payment",
    "Paid In Full",
    "Overdue",
  ];

  const moreOptions = [
    {
      title: "Edit Order",
      icon: <EditSvg />,
    },
    {
      title: "Generate Invoice",
      icon: <DocSvg />,
    },
    { title: "Generate Payment Link", icon: <LinkSvg /> },
    { title: "Ship Order", icon: <CarSvg /> },
    { title: "Delete Order", icon: <BinSvg /> },
  ];

  return (
    <div className="bg-white rounded-xl p-6 relative mt-6">
      {/* Three-dot menu icon */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="absolute top-6 right-6 h-8 w-8 border flex justify-center items-center rounded-full text-[#4B5565] hover:text-foreground transition-colors"
            aria-label="More options"
          >
            <MoreSvg />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {moreOptions.map((item, index) => (
            <>
              <DropdownMenuItem
                key={index}
                onClick={() => setOrderStatus(item.title)}
              >
                <div className="flex gap-2 items-center">
                  <div>{item.icon}</div>
                  <span>{item.title}</span>
                </div>
              </DropdownMenuItem>
              {index !== orderStatuses.length - 1 && <DropdownMenuSeparator />}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 pr-8">
        <h1 className="text-2xl font-bold text-foreground">Order 5734</h1>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "border text-xs font-medium px-2 py-0.5",
              "bg-[#F9FAFB] border-[#9AA4B2] text-[#9AA4B2]",
            )}
          >
            Not Started
          </Badge>
          <Badge
            className={cn(
              "border text-xs font-medium px-2 py-0.5",
              "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
            )}
          >
            Not Paid
          </Badge>
        </div>
      </div>

      {/* Order Metadata */}
      <p className="text-sm text-[#6B7280] mb-6">
        Created on Dec 10, 2025 • Last updated 2 hours ago
      </p>

      {/* Status Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full rounded-full sm:w-fit h-10 px-4 border border-[#CDD5DF] bg-white flex gap-2 items-center justify-between text-sm text-foreground hover:bg-[#F9FAFB] transition-colors">
              <span>{orderStatus}</span>
              <IconChevronDown className="size-4 text-[#9AA4B2]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {orderStatuses.map((status, index) => (
              <React.Fragment key={status}>
                <DropdownMenuItem onClick={() => setOrderStatus(status)}>
                  {status}
                </DropdownMenuItem>
                {index !== orderStatuses.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu
          open={paymentDropdownOpen}
          onOpenChange={setPaymentDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <button className="w-full sm:w-fit h-10 px-4 gap-2 border border-[#CDD5DF] rounded-full bg-white flex items-center justify-between text-sm text-foreground hover:bg-[#F9FAFB] transition-colors">
              <span>{paymentStatus}</span>
              <IconChevronDown className="size-4 text-[#9AA4B2]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {paymentStatuses.map((status, index) => (
              <React.Fragment key={status}>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setPaymentStatus(status);
                    if (status !== "Partial Payment") {
                      setPartialAmount("");
                      setPaymentDropdownOpen(false);
                    }
                    // Keep dropdown open if Partial Payment is selected
                  }}
                  className="flex items-center justify-between"
                >
                  <span>{status}</span>
                  <div
                    className={cn(
                      "w-4 h-4 border rounded-full flex items-center justify-center",
                      `${paymentStatus === status ? "border-primary" : "border-[#9AA4B2]"}`,
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 border  rounded-full",
                        `${paymentStatus === status ? "border-primary" : "border-transparent"}`,
                      )}
                    ></div>
                  </div>
                </DropdownMenuItem>
                {status === "Partial Payment" &&
                  paymentStatus === "Partial Payment" && (
                    <div
                      className="px-2 py-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Input
                        type="text"
                        placeholder="Specify Amount"
                        value={partialAmount}
                        onChange={(e) => setPartialAmount(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onFocus={(e) => e.stopPropagation()}
                        className="w-full border border-[#CDD5DF] rounded-md text-sm"
                      />
                    </div>
                  )}
                {index !== paymentStatuses.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Separator */}
      <div className="border-t border-[#E5E7EB] mb-6"></div>

      {/* Order Notifications Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <NotificationSvg />
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">
              Order Notifications
            </h3>
            <p className="text-sm text-[#6B7280]">
              Receive reminders about this order
            </p>
          </div>
        </div>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={setNotificationsEnabled}
        />
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
