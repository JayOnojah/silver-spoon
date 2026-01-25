"use client";

import { useState } from "react";
import { format } from "date-fns";
import { IconPlus, IconTrash, IconCalendarEvent } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  title: string;
  description: string;
  quantity: string;
  unitPrice: string;
}

interface OrderDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onSubmit?: (data: {
    items: OrderItem[];
    startDate: Date | undefined;
    endDate: Date | undefined;
    orderStatus: string;
    paymentStatus: string;
    subtotal: number;
    total: number;
  }) => void;
}

const OrderDetails = ({
  open,
  onOpenChange,
  onBack,
  onSubmit,
}: OrderDetailsProps) => {
  const [items, setItems] = useState<OrderItem[]>([
    {
      id: "1",
      title: "",
      description: "",
      quantity: "",
      unitPrice: "",
    },
  ]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("not-paid");

  // Calculate subtotal and total
  const subtotal = items.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + quantity * price;
  }, 0);

  const total = subtotal; // Can add tax, discount, etc. here if needed

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        quantity: "",
        unitPrice: "",
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (
    id: string,
    field: keyof OrderItem,
    value: string,
  ) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSubmit = () => {
    onSubmit?.({
      items,
      startDate,
      endDate,
      orderStatus,
      paymentStatus,
      subtotal,
      total,
    });
  };

  const formatCurrency = (amount: number) => {
    return `N${amount.toFixed(2)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="max-w-150 w-full rounded-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#9AA4B2]">
            <span>Step 2 of 2</span>
            <span>—</span>
            <span>Create Order</span>
          </div>
          <DialogTitle>
            <div className="text-xl font-extrabold text-foreground">
              Order Details
            </div>
            <p className="text-xs font-normal text-[#9AA4B2] mt-1">
              Provide basic order Information. You can complete measurements,
              references, and other details after creating the order.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Order Items Section */}
          <div className="space-y-2 border p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#4B5565]">
                Order Items
              </h3>
              <Button
                type="button"
                onClick={handleAddItem}
                variant="ghost"
                className="text-primary hover:text-primary/80 hover:bg-[#FFF1EC]"
              >
                <IconPlus className="size-4 mr-2" />
                Add Another Item
              </Button>
            </div>

            <div className="space-y-4 pb-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`space-y-4  ${items.length > 1 && "border-b pb-4"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4B5565]">
                      Item {index + 1}
                    </span>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <IconTrash className="size-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#4B5565] text-sm">
                        Item Title *
                      </Label>
                      <Input
                        placeholder="Enter Item Title"
                        value={item.title}
                        onChange={(e) =>
                          handleItemChange(item.id, "title", e.target.value)
                        }
                        className="h-11 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#4B5565] text-sm">
                        Quantity *
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(item.id, "quantity", e.target.value)
                        }
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#4B5565] text-sm">
                      Description *
                    </Label>
                    <Textarea
                      placeholder="Type here..."
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      className="min-h-24 rounded-xl resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#4B5565] text-sm">
                      Unit Price *
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(item.id, "unitPrice", e.target.value)
                      }
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Summary */}
          <div className="bg-[#F9FAFB] border rounded-xl p-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-sm text-[#9AA4B2]">Subtotal</span>
              <span className="text-sm text-foreground">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-foreground">
                Total
              </span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#4B5565] text-sm">Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 rounded-xl justify-start text-left font-normal",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <IconCalendarEvent className="mr-2 size-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Select Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-[#4B5565] text-sm">End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 rounded-xl justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <IconCalendarEvent className="mr-2 size-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Select End Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-2">
            <Label className="text-[#4B5565] text-sm">Order Status *</Label>
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger className="w-full h-11! rounded-xl">
                <SelectValue placeholder="Select Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Status */}
          <div className="space-y-2">
            <Label className="text-[#4B5565] text-sm">Payment Status *</Label>
            <RadioGroup
              value={paymentStatus}
              onValueChange={setPaymentStatus}
              className="flex flex-row gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-paid" id="not-paid" />
                <Label
                  htmlFor="not-paid"
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  Not Paid
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="partial" />
                <Label
                  htmlFor="partial"
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  Partial Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="paid" />
                <Label
                  htmlFor="paid"
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  Paid In Full
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="h-12 flex-1 text-base font-medium rounded-2xl px-8"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="h-12 flex-1 text-base font-medium rounded-2xl bg-primary hover:bg-primary/90 px-8"
            >
              Create Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
