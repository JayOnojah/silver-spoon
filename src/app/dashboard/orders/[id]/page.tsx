import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

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
    </div>
  );
};

export default OrderDetails;
