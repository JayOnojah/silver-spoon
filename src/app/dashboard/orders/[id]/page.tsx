import OrderDetailsContent from "@/src/components/_core/dashboard/order/order-details";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const OrderDetails = () => {
  return (
    <div>
      <Link
        href={"/dashboard/orders"}
        role="button"
        className="flex cursor-pointer"
      >
        <ArrowLeft />
        <span>Back</span>
      </Link>
      <OrderDetailsContent />
    </div>
  );
};

export default OrderDetails;
