"use client";

import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/_core/dashboard/shared/file-upload";
import { cn } from "@/lib/utils";

interface CustomerData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
}

interface CreateCustomerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (customers: CustomerData[]) => void;
}

const CreateCustomer = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateCustomerProps) => {
  const [customers, setCustomers] = useState<CustomerData[]>([
    { fullName: "", phoneNumber: "", emailAddress: "", address: "" },
  ]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    {},
  );

  const handleCustomerChange = (
    index: number,
    field: keyof CustomerData,
    value: string,
  ) => {
    setCustomers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // Clear error for this field
    if (errors[index]?.[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        if (updated[index]) {
          const { [field]: _, ...rest } = updated[index];
          updated[index] = rest;
        }
        return updated;
      });
    }
  };

  const handleAddCustomer = () => {
    setCustomers((prev) => [
      ...prev,
      { fullName: "", phoneNumber: "", emailAddress: "", address: "" },
    ]);
  };

  const handleRemoveCustomer = (index: number) => {
    if (customers.length > 1) {
      setCustomers((prev) => prev.filter((_, i) => i !== index));
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[index];
        // Reindex errors
        const reindexed: Record<number, Record<string, string>> = {};
        Object.keys(updated).forEach((key) => {
          const numKey = parseInt(key);
          if (numKey > index) {
            reindexed[numKey - 1] = updated[numKey];
          } else if (numKey < index) {
            reindexed[numKey] = updated[numKey];
          }
        });
        return reindexed;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<number, Record<string, string>> = {};

    customers.forEach((customer, index) => {
      const customerErrors: Record<string, string> = {};

      if (!customer.fullName.trim()) {
        customerErrors.fullName = "Full Name is required";
      }
      if (!customer.phoneNumber.trim()) {
        customerErrors.phoneNumber = "Phone Number is required";
      }
      if (!customer.emailAddress.trim()) {
        customerErrors.emailAddress = "Email Address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.emailAddress)) {
        customerErrors.emailAddress = "Invalid email address";
      }
      if (!customer.address.trim()) {
        customerErrors.address = "Address is required";
      }

      if (Object.keys(customerErrors).length > 0) {
        newErrors[index] = customerErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit?.(customers);
      // Reset form
      setCustomers([
        { fullName: "", phoneNumber: "", emailAddress: "", address: "" },
      ]);
      setUploadedFile(null);
      setErrors({});
      onOpenChange(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create a simple CSV template
    const csvContent =
      "Full Name,Phone Number,Email Address,Address\nJohn Doe,+1234567890,john@example.com,123 Main St";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-200! w-full rounded-xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="space-y-2">
          <DialogTitle>
            <div className="text-xl font-extrabold text-foreground">
              Create Customer
            </div>
            <p className="text-xs font-normal text-[#9AA4B2] mt-1">
              Add your customer(s) manually or in bulk by{" "}
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="text-primary hover:underline"
              >
                downloading this template
              </button>
            </p>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Upload File Section */}
          <FileUpload
            label="Upload file"
            accept=".csv,.xlsx,.xls"
            value={uploadedFile}
            onChange={setUploadedFile}
            showPreview={false}
          />

          {/* Customer(s) Section */}
          <h3 className="text-sm font-bold text-foreground mt-10">Customer(s)</h3>
          <div className="space-y-4 flex-1 w-full mt-2">
            <div className="space-y-2 w-full  border py-3">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center px-4 border-[#E5E7EB] rounded-xl"
                >
                  {/* Full Name */}
                  <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-medium text-[#4B5565]">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter Full Name"
                      value={customer.fullName}
                      onChange={(e) =>
                        handleCustomerChange(index, "fullName", e.target.value)
                      }
                      className={cn(
                        "h-10 rounded-xl flex-1",
                        errors[index]?.fullName && "border-destructive",
                      )}
                    />
                    {errors[index]?.fullName && (
                      <p className="text-xs text-destructive">
                        {errors[index].fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-medium text-[#4B5565]">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter Phone Number"
                      value={customer.phoneNumber}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "phoneNumber",
                          e.target.value,
                        )
                      }
                      className={cn(
                        "h-10 rounded-xl flex-1",
                        errors[index]?.phoneNumber && "border-destructive",
                      )}
                    />
                    {errors[index]?.phoneNumber && (
                      <p className="text-xs text-destructive">
                        {errors[index].phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-medium text-[#4B5565]">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter Email Address"
                      value={customer.emailAddress}
                      onChange={(e) =>
                        handleCustomerChange(
                          index,
                          "emailAddress",
                          e.target.value,
                        )
                      }
                      className={cn(
                        "h-10 rounded-xl flex-1",
                        errors[index]?.emailAddress && "border-destructive",
                      )}
                    />
                    {errors[index]?.emailAddress && (
                      <p className="text-xs text-destructive">
                        {errors[index].emailAddress}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-medium text-[#4B5565]">
                      Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter Address"
                      value={customer.address}
                      onChange={(e) =>
                        handleCustomerChange(index, "address", e.target.value)
                      }
                      className={cn(
                        "h-10 rounded-xl flex-1",
                        errors[index]?.address && "border-destructive",
                      )}
                    />
                    {errors[index]?.address && (
                      <p className="text-xs text-destructive">
                        {errors[index].address}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-end h-10">
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomer(index)}
                      className="p-2 text-[#9AA4B2] hover:text-destructive transition-colors"
                      disabled={customers.length === 1}
                    >
                      <IconTrash className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Another Customer */}
            <button
              type="button"
              onClick={handleAddCustomer}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              <IconPlus className="size-4" />
              Add Another Customer
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="h-12 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90 px-8"
            >
              Create Customer(s)
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomer;
