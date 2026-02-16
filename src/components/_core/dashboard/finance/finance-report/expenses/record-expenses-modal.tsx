"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RecordExpensesModalProps {
    btnName: string;
}

export function RecordExpensesModal({
    btnName
}: RecordExpensesModalProps) {
    const [open, onOpenChange] = useState(false);
    const [expenseType, setExpenseType] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        console.log({ expenseType, date, recipient, amount, description });
        // handle form submission
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-[#F74F25] w-full md:w-36 text-white rounded-2xl h-12 font-bold font-sans hover:bg-[#F74F25]/90">
                    <Plus className="w-5 h-5" />
                    {btnName}
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-190 rounded-2xl p-8 gap-0 bg-white"
                style={{ borderRadius: "20px" }}
            >
                {/* Header */}
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black text-[#121926] tracking-tight">
                        Record Expenses
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-5">
                    {/* Expense Type */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <Label className="text-sm font-medium text-[#4B5565]">
                            Expense Type
                            <span className="text-[#f4846a] ml-0.5">*</span>
                        </Label>
                        <Select onValueChange={setExpenseType} value={expenseType}>
                            <SelectTrigger
                                className={cn(
                                    "h-12! rounded-xl w-full border border-[#e5e7eb] bg-white px-4 text-sm",
                                    "text-[#9ca3af] font-normal"
                                )}
                            >
                                <SelectValue placeholder="Select Expenses" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl w-full border border-[#e5e7eb]">
                                <SelectItem value="office-rent">Office Rent</SelectItem>
                                <SelectItem value="utilities">Utilities</SelectItem>
                                <SelectItem value="salaries-and-wages">Salaries and Wages</SelectItem>
                                <SelectItem value="software-subscription">Software Subscriptions</SelectItem>
                                <SelectItem value="materials-and-production">Materials & Production</SelectItem>
                                <SelectItem value="tools-and-equipment">Tools & Equipment</SelectItem>
                                <SelectItem value="labor-and-services">Labor & Services</SelectItem>
                                <SelectItem value="logistics-and-delivery">Logistics & Delivery</SelectItem>
                                <SelectItem value="marketing-and-branding">Marketing & Branding</SelectItem>
                                <SelectItem value="admin-and-operations">Admin & Operations</SelectItem>
                                <SelectItem value="learning-and-growth">Learning & Growth</SelectItem>
                                <SelectItem value="insurance">Insurance</SelectItem>
                                <SelectItem value="client-and-relationship-cost">Client & Relationship Costs</SelectItem>
                                <SelectItem value="client-and-ralationship-codt">Client & Relationship Costs</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Payment Date */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-[#4B5565]">
                            Payment Date
                            <span className="text-[#f4846a] ml-0.5">*</span>
                        </Label>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <button
                                    className={cn(
                                        "h-12! w-full rounded-xl border border-[#e5e7eb] bg-white px-4",
                                        "flex items-center justify-between text-sm",
                                        "focus:outline-none",
                                        date ? "text-[#0d1b2a]" : "text-[#9ca3af]"
                                    )}
                                >
                                    <span>{date ? format(date, "MMM dd, yyyy") : "Select Date"}</span>
                                    <CalendarIcon className="h-4.5 w-4.5 text-[#9ca3af]" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-xl border border-[#e5e7eb]" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(d) => {
                                        setDate(d);
                                        setCalendarOpen(false);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Recipient */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-[#4B5565]">
                            Recipient
                            <span className="text-[#f4846a] ml-0.5">*</span>
                        </Label>
                        <Input
                            placeholder="Enter Recipient's Name"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className={cn(
                                "h-12 rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm",
                                "placeholder:text-[#9ca3af] text-[#0d1b2a]",
                            )}
                        />
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-[#4B5565]">
                            Amount
                            <span className="text-[#f4846a] ml-0.5">*</span>
                        </Label>
                        <Input
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            className={cn(
                                "h-12 rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm",
                                "placeholder:text-[#9ca3af] text-[#0d1b2a]",
                            )}
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-[#4B5565]">
                            Description
                            <span className="text-[#f4846a] ml-0.5">*</span>
                        </Label>
                        <Textarea
                            placeholder="Type here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={cn(
                                "min-h-28 rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm",
                                "placeholder:text-[#9ca3af] text-[#0d1b2a] resize-none",
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-1">
                        <Button
                            onClick={handleSubmit}
                            disabled={!expenseType || !date || !recipient || !amount || !description}
                            className={cn(
                                "h-12 px-7 rounded-xl text-white font-semibold text-sm",
                                "bg-[#F74F25] hover:bg-[#F74F25]/90 transition-colors duration-200",
                                "border-0 shadow-none"
                            )}
                        >
                            Record Expense
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}