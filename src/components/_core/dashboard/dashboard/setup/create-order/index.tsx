"use client";

import { useState } from "react";
import SelectCustomer from "./select-customer";
import OrderDetails from "./order-details";
import OrderSuccessDialog from "./success";

interface CreateOrderProps {
  isSelectCustomerOpen: boolean
  setIsSelectCustomerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Dummy customer data
const dummyCustomers = [
  {
    id: "1",
    name: "Sarah Jones",
    email: "sarah.jones@example.com",
    phone: "+1234567890",
  },
  {
    id: "2",
    name: "Eden Jones",
    email: "eden.jones2@example.com",
    phone: "+1234567891",
  },
  {
    id: "3",
    name: "Bello Jones",
    email: "bello.jones3@example.com",
    phone: "+1234567892",
  },
  {
    id: "4",
    name: "Jane Jones",
    email: "jane.jones4@example.com",
    phone: "+1234567893",
  },
  {
    id: "5",
    name: "Adams Jones",
    email: "adams.jones5@example.com",
    phone: "+1234567894",
  },
];

const CreateOrder = ({ isSelectCustomerOpen, setIsSelectCustomerOpen }: CreateOrderProps) => {
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  const handleProceed = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsSelectCustomerOpen(false);
    setIsOrderDetailsOpen(true);
  };

  const handleBack = () => {
    setIsOrderDetailsOpen(false);
    setIsSelectCustomerOpen(true);
  };

  const handleOrderSubmit = (data: any) => {
    console.log("Order data:", { ...data, customerId: selectedCustomerId });
    // Handle order submission
    setIsOrderDetailsOpen(false);
    setIsOrderSuccessOpen(true);
  };

  const handleAddDesigns = () => {
    // Navigate to order details page
    console.log("Navigate to order details");
  };

  const handleCreateAnother = () => {
    // Reset and start new order flow
    setSelectedCustomerId("");
    setIsOrderSuccessOpen(false);
    setIsSelectCustomerOpen(true);
  };

  return (
    <div>
      <SelectCustomer
        open={isSelectCustomerOpen}
        onOpenChange={setIsSelectCustomerOpen}
        onProceed={handleProceed}
        customers={dummyCustomers}
      />
      <OrderDetails
        open={isOrderDetailsOpen}
        onOpenChange={setIsOrderDetailsOpen}
        onBack={handleBack}
        onSubmit={handleOrderSubmit}
      />
      <OrderSuccessDialog
        open={isOrderSuccessOpen}
        onOpenChange={setIsOrderSuccessOpen}
        onAddDesigns={handleAddDesigns}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
};

export default CreateOrder;
