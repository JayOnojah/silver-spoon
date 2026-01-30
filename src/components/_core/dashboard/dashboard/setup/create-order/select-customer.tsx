"use client";

import { useState } from "react";
import { IconSearch, IconUsers, IconPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CreateCustomer from "../create-customer";

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface SelectCustomerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed?: (customerId: string) => void;
  customers?: Customer[];
}

const SelectCustomer = ({
  open,
  onOpenChange,
  onProceed,
  customers = [],
}: SelectCustomerProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProceed = () => {
    if (selectedCustomer) {
      onProceed?.(selectedCustomer);
    }
  };

  const handleCreateCustomer = () => {
    setIsCreateCustomerOpen(true);
  };

  const handleCustomerCreated = (newCustomers: any[]) => {
    // After customer is created, close the create dialog
    setIsCreateCustomerOpen(false);
    // You might want to refresh the customers list here
    // For now, we'll just close the dialog
  };

  const isEmpty = customers.length === 0;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={true}
          className="max-w-150 w-full rounded-xl p-4 sm:p-5 overflow-y-auto max-h-[90vh]"
        >
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#9AA4B2]">
              <span>Step 1 of 2</span>
              <span>—</span>
              <span>Create Order</span>
            </div>
            <DialogTitle>
              <div className="text-xl font-extrabold text-foreground">
                Select A Customer
              </div>
              <p className="text-xs font-normal text-[#9AA4B2] mt-1">
                Choose an existing customer or add a new one.
              </p>
            </DialogTitle>
          </DialogHeader>

          {isEmpty ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-white rounded-xl p-8 w-full max-w-md space-y-4">
                <div className="flex justify-center">
                  <div className="size-20 rounded-full border-2 border-primary/20 bg-[#FFF1EC] flex items-center justify-center">
                    <IconUsers className="size-10 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-base font-bold text-foreground">
                    No Customer Added Yet!
                  </h3>
                  <p className="text-sm text-[#9AA4B2]">
                    Add your first customer to get started.
                  </p>
                </div>
                <div className="flex justify-center pt-2">
                  <Button
                    type="button"
                    onClick={handleCreateCustomer}
                    className="h-11 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 px-6"
                  >
                    <IconPlus className="size-5 mr-2" />
                    Create Customer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Field State with Customers
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9AA4B2]" />
                <Input
                  type="text"
                  placeholder="Search Customer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-xl"
                />
              </div>

              {/* Customer List */}
              <div className="space-y-2 max-h-75 overflow-y-auto">
                <RadioGroup
                  value={selectedCustomer}
                  onValueChange={setSelectedCustomer}
                  className="space-y-2"
                >
                  {filteredCustomers.map((customer) => (
                    <label
                      key={customer.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] cursor-pointer hover:bg-[#F9FAFB] transition-colors",
                        selectedCustomer === customer.id &&
                          "border-primary bg-[#FFF1EC]",
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="size-10 rounded-full bg-[#FFF1EC] flex items-center justify-center">
                          <IconUsers className="size-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {customer.name}
                        </span>
                      </div>
                      <RadioGroupItem value={customer.id} />
                    </label>
                  ))}
                </RadioGroup>

                {filteredCustomers.length === 0 && (
                  <div className="text-center py-8 text-sm text-[#9AA4B2]">
                    No customers found matching "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Add New Customer Link */}
              <button
                type="button"
                onClick={handleCreateCustomer}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium w-full"
              >
                <IconPlus className="size-4" />
                Add New Customer
              </button>

              {/* Proceed Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  onClick={handleProceed}
                  disabled={!selectedCustomer}
                  className="h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Customer Dialog */}
      <CreateCustomer
        open={isCreateCustomerOpen}
        onOpenChange={setIsCreateCustomerOpen}
        onSubmit={handleCustomerCreated}
      />
    </>
  );
};

export default SelectCustomer;
