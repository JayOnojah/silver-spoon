import React from "react";
import { Button } from "@/src/components/ui/button";
import { IconShoppingCart, IconPlus } from "@tabler/icons-react";

const EmptyOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Shopping Cart Icon */}
      <div className="mb-6">
        <IconShoppingCart className="size-16 text-primary stroke-2" />
      </div>

      {/* Main Message */}
      <h3 className="text-xl font-bold text-foreground mb-2 text-center">
        Your orders will appear here
      </h3>

      {/* Secondary Message */}
      <p className="text-sm text-[#4B5565] mb-8 text-center">
        Start by adding customers and creating orders
      </p>

      {/* New Order Button */}
      <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-10 px-4">
        <IconPlus className="size-4 mr-2" />
        New Order
      </Button>
    </div>
  );
};

export default EmptyOrder;
