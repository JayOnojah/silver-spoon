"use client";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, Link2 } from "lucide-react";
import { FormatCurrency } from "@/src/components/_core/dashboard/shared/format-currency";

export interface PaymentEntry {
  id: string;
  orderId: string;
  dateTime: string;
  amount: number;
  status: "Completed" | "In Progress" | "Pending";
}

const DUMMY_PAYMENTS: PaymentEntry[] = [
  {
    id: "1",
    orderId: "ORD-1001",
    dateTime: "Dec 19, 2025, 10:30 AM",
    amount: 45_000,
    status: "Completed",
  },
  {
    id: "2",
    orderId: "ORD-1001",
    dateTime: "Dec 19, 2025, 10:30 AM",
    amount: 45_000,
    status: "Completed",
  },
];

const PaymentHistory = () => {
  const handleGeneratePaymentLink = () => {
    // TODO: open generate payment link flow
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#121926]">Payment History</h3>
        <Button
          type="button"
          variant="ghost"
          onClick={handleGeneratePaymentLink}
          className="font-semibold text-primary hover:bg-primary/10 hover:text-primary rounded-xl h-10 px-4 gap-2"
        >
          <span className="flex items-center justify-center size-5 rounded-full bg-primary/20">
            <Link2 className="size-3 text-primary" />
          </span>
          Generate Payment Link
        </Button>
      </div>

      <div className="space-y-3">
        {DUMMY_PAYMENTS.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#CDD5DF] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
                <ArrowDownLeft className="size-5 text-[#40B773]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#121926]">
                  {payment.orderId}
                </p>
                <p className="text-xs text-[#9AA4B2] mt-0.5">
                  {payment.dateTime}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-sm font-bold text-[#40B773]">
                +{FormatCurrency(payment.amount)}
              </p>
              <Badge
                variant="outline"
                className="rounded-full text-xs font-medium bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]"
              >
                {payment.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
