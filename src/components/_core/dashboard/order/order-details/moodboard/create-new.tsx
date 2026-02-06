"use client";

import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColorPickerPopover } from "./color-picker-popover";
import CustomRadioCheck from "../../../shared/custom-checkbox";

const PRIMARY_HEX = "#F74F25";
const SECONDARY_HEX = "#F9F0EE";

export type LayoutStyle = "3" | "4" | "mansory";
export type AssociatedWith = "order" | "customer" | "personal";

export interface CreateMoodboardData {
  title: string;
  description: string;
  associatedWith: AssociatedWith;
  orderId: string;
  primaryColor: string;
  secondaryColor: string;
  layoutStyle: LayoutStyle;
}

interface CreateNewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onCreate?: (data: CreateMoodboardData) => void;
}

const MOCK_ORDERS = [
  { value: "order-5734", label: "Order 5734" },
  { value: "order-5735", label: "Order 5735" },
  { value: "order-5736", label: "Order 5736" },
];

function LayoutCard({
  title,
  selected,
  onClick,
  variant,
  className,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
  variant: LayoutStyle;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full rounded-xl border-2 bg-white p-4 text-left transition-colors",
        selected
          ? "border-[#F74F25]"
          : "border-[#E5E7EB] hover:border-[#CDD5DF]",
        className,
      )}
    >
      {selected && (
        <span className="absolute left-2 top-2 inline-flex size-6 items-center justify-center rounded-full bg-[#F74F25] text-white">
          <Check className="size-3.5" />
        </span>
      )}
      <div className="flex gap-1.5 mt-2">
        {variant === "3" && (
          <>
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
          </>
        )}
        {variant === "4" && (
          <>
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
            <div className="h-10 flex-1 rounded bg-[#D9D9D9]" />
          </>
        )}
        {variant === "mansory" && (
          <div className="grid w-full grid-cols-2 gap-1">
            <div className="col-span-2 h-6 rounded bg-[#D9D9D9]" />
            <div className="h-8 rounded bg-[#D9D9D9]" />
            <div className="h-8 rounded bg-[#D9D9D9]" />
            <div className="col-span-2 h-6 rounded bg-[#D9D9D9]" />
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
    </button>
  );
}

const CreateNew = ({
  open,
  onOpenChange,
  onBack,
  onCreate,
}: CreateNewProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [associatedWith, setAssociatedWith] = useState<AssociatedWith>("order");
  const [orderId, setOrderId] = useState("");
  const [primaryColor, setPrimaryColor] = useState(PRIMARY_HEX);
  const [secondaryColor, setSecondaryColor] = useState(SECONDARY_HEX);
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>("3");

  const canCreate =
    title.trim() &&
    description.trim() &&
    (associatedWith !== "order" || orderId) &&
    primaryColor &&
    secondaryColor;

  const handleCreate = () => {
    if (!canCreate) return;
    onCreate?.({
      title: title.trim(),
      description: description.trim(),
      associatedWith,
      orderId,
      primaryColor,
      secondaryColor,
      layoutStyle,
    });
    onOpenChange(false);
    setTitle("");
    setDescription("");
    setAssociatedWith("order");
    setOrderId("");
    setPrimaryColor(PRIMARY_HEX);
    setSecondaryColor(SECONDARY_HEX);
    setLayoutStyle("3");
  };

  const handleBack = () => {
    onBack?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-semibold text-[#121926]/80 hover:text-[#121926]"
          >
            <IconChevronLeft className="size-5" />
            Back
          </button>

          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="text-[28px] font-black text-[#121926]">
              Create New Moodboard
            </DialogTitle>
            <p className="text-sm text-[#9AA4B2]">
              Provide basic order Information. You can add designs after
            </p>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#4B5565]">
                Title <span className="text-[#EF4444]">*</span>
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                className="h-10 rounded-lg border-[#CDD5DF]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#4B5565]">
                Description <span className="text-[#EF4444]">*</span>
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Short Description..."
                className="min-h-20 rounded-lg border-[#CDD5DF] resize-none"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-[#4B5565]">
                Associated With <span className="text-[#EF4444]">*</span>
              </Label>
              <RadioGroup
                value={associatedWith}
                onValueChange={(v) => setAssociatedWith(v as AssociatedWith)}
                className="flex flex-wrap gap-6"
              >
                <label className="relative flex items-center gap-2 cursor-pointer text-base font-semibold text-[#121926]">
                  <RadioGroupItem
                    value="order"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <CustomRadioCheck checked={associatedWith === "order"} />
                  An Order
                </label>
                <label className="relative flex items-center gap-2 cursor-pointer text-base font-semibold text-[#121926]">
                  <RadioGroupItem
                    value="customer"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <CustomRadioCheck checked={associatedWith === "customer"} />
                  A Customer
                </label>
                <label className="relative flex items-center gap-2 cursor-pointer text-base font-semibold text-[#121926]">
                  <RadioGroupItem
                    value="personal"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <CustomRadioCheck checked={associatedWith === "personal"} />
                  A Personal Project
                </label>
              </RadioGroup>
              {associatedWith === "order" && (
                <Select value={orderId} onValueChange={setOrderId}>
                  <SelectTrigger className="h-10 w-full rounded-lg border-[#CDD5DF]">
                    <SelectValue placeholder="Select Order" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_ORDERS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-3 rounded-xl border border-[#E5E7EB] p-4">
              <Label className="text-sm font-semibold text-[#475467]">
                Theme Color <span className="text-[#F74F25]">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#6B7280]">
                    Primary Background Color
                  </span>
                  <ColorPickerPopover
                    value={primaryColor}
                    onChange={setPrimaryColor}
                    label="Primary"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#6B7280]">
                    Secondary Background Color
                  </span>
                  <ColorPickerPopover
                    value={secondaryColor}
                    onChange={setSecondaryColor}
                    label="Secondary"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-[#475467]">
                Layout Style <span className="text-[#F74F25]">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <LayoutCard
                  title="3-Column Grid"
                  selected={layoutStyle === "3"}
                  onClick={() => setLayoutStyle("3")}
                  variant="3"
                />
                <LayoutCard
                  title="4-Column Grid"
                  selected={layoutStyle === "4"}
                  onClick={() => setLayoutStyle("4")}
                  variant="4"
                />
                <LayoutCard
                  title="Masonry"
                  selected={layoutStyle === "mansory"}
                  onClick={() => setLayoutStyle("mansory")}
                  variant="mansory"
                />
              </div>
            </div>

            <Button
              onClick={handleCreate}
              disabled={!canCreate}
              className="w-full h-11 rounded-lg font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
            >
              Create Moodboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNew;
