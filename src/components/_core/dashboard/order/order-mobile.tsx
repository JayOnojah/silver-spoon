import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { cn } from "@/src/lib/utils";

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

interface OrderMobileProps {
  orders: Order[];
  selectedOrders: string[];
  handleSelectOrder: (orderId: string, checked: boolean) => void;
  getPaymentStatusBadgeClass: (variant: string) => string;
  getOrderStatusBadgeClass: (variant: string) => string;
}

const OrderMobile = ({
  orders,
  selectedOrders,
  handleSelectOrder,
  getPaymentStatusBadgeClass,
  getOrderStatusBadgeClass,
}: OrderMobileProps) => {
  return (
    <div className="sm:hidden space-y-2">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl p-4 border border-[#E5E7EB]"
        >
          {/* Checkbox */}
          <div className="mb-4">
            <Checkbox
              checked={selectedOrders.includes(order.id)}
              onCheckedChange={(checked) =>
                handleSelectOrder(order.id, checked as boolean)
              }
            />
          </div>

          {/* Order Details */}
          <div className="space-y-3">
            {/* Order ID */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">Order ID</span>
              <span className="text-sm font-bold text-foreground">
                Order {order.id.split("-")[0]}
              </span>
            </div>

            {/* Client */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">Client</span>
              <span className="text-sm font-bold text-foreground">
                {order.client}
              </span>
            </div>

            {/* Order Amount */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">Order Amount</span>
              <span className="text-sm font-bold text-foreground">
                {order.amount}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">Payment Status</span>
              <Badge
                className={cn(
                  "border text-xs font-medium px-2 py-0.5",
                  getPaymentStatusBadgeClass(order.paymentStatus.variant),
                )}
              >
                {order.paymentStatus.label}
              </Badge>
            </div>

            {/* Order Status */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">Order Status</span>
              <Badge
                className={cn(
                  "border text-xs font-medium px-2 py-0.5",
                  getOrderStatusBadgeClass(order.orderStatus.variant),
                )}
              >
                {order.orderStatus.label}
              </Badge>
            </div>

            {/* Due Date */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7280]">Due Date</span>
              <span className="text-sm font-bold text-foreground">
                {order.createdDate}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              className="w-full rounded-lg border border-[#E5E7EB] bg-white text-[#4B5565] hover:bg-[#F9FAFB] font-medium"
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderMobile;
