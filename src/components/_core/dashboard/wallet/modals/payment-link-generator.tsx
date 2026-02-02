"use client"

import { ReactNode, useState } from "react"
import { X, Link, Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import PaymentSuccessModal from "./payment-success-modal"

interface Tax {
    id: string
    name: string
    type: "percentage" | "amount"
    value: string
}

interface PaymentLinkModalProps {
    open: boolean
    icon?: ReactNode
    onOpenChange: (open: boolean) => void
    btnName: string
}

export function PaymentLinkModal({ open, onOpenChange, btnName, icon }: PaymentLinkModalProps) {
    const [customer, setCustomer] = useState("")
    const [order, setOrder] = useState("")
    const [amount, setAmount] = useState("")
    const [taxes, setTaxes] = useState<Tax[]>([
        { id: "1", name: "", type: "percentage", value: "" }
    ])
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const calculateSubtotal = () => {
        return parseFloat(amount) || 0
    }

    const calculateTaxAmount = (tax: Tax, subtotal: number) => {
        const value = parseFloat(tax.value) || 0
        if (tax.type === "percentage") {
            return (subtotal * value) / 100
        }
        return value
    }

    const calculateTotal = () => {
        const subtotal = calculateSubtotal()
        const totalTax = taxes.reduce((sum, tax) => {
            return sum + calculateTaxAmount(tax, subtotal)
        }, 0)
        return subtotal + totalTax
    }

    const addTax = () => {
        setTaxes([
            ...taxes,
            { id: Date.now().toString(), name: "", type: "percentage", value: "" }
        ])
    }

    const removeTax = (id: string) => {
        setTaxes(taxes.filter(tax => tax.id !== id))
    }

    const updateTax = (id: string, field: keyof Tax, value: string) => {
        setTaxes(taxes.map(tax =>
            tax.id === id ? { ...tax, [field]: value } : tax
        ))
    }

    const handleGenerateLink = () => {
        console.log({
            customer,
            order,
            amount,
            taxes,
            total: calculateTotal()
        })
        onOpenChange(false)
        setShowSuccessModal(true)
    }

    const formatCurrency = (value: number) => {
        return `₦${value.toFixed(2)}`
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                    <Button className="bg-[#F74F25] md:w-60 w-full text-white rounded-2xl h-12 font-bold font-sans">
                        {icon}
                        {btnName}
                    </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-xl p-0 gap-0 bg-white overflow-hidden rounded-3xl">
                    <DialogHeader className="px-8 pt-12 md:pt-8 pb-6">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-black text-gray-[#121926]">
                                Generate Payment Link
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="px-8 pb-8 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {/* Customer and Order Selection */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <Label htmlFor="customer" className="text-base font-medium text-[#4B5565]">
                                    Select Customer <span className="text-red-500">*</span>
                                </Label>
                                <Select value={customer} onValueChange={setCustomer}>
                                    <SelectTrigger
                                        id="customer"
                                        className="bg-white w-full h-12! flex-1 border-[#CDD5DF] text-[#9AA4B2] rounded-xl"
                                    >
                                        <SelectValue placeholder="Select Customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="customer1">Sandra Jones</SelectItem>
                                        <SelectItem value="customer2">Jane Smith</SelectItem>
                                        <SelectItem value="customer3">Acme Corporation</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order" className="text-base font-medium text-[#4B5565]">
                                    Select Order <span className="text-red-500">*</span>
                                </Label>
                                <Select value={order} onValueChange={setOrder}>
                                    <SelectTrigger
                                        id="order"
                                        className="bg-white w-full h-12! flex-1 border-[#CDD5DF] text-[#9AA4B2] rounded-xl"
                                    >
                                        <SelectValue placeholder="Select Order" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="order1">ORD-1001</SelectItem>
                                        <SelectItem value="order2">ORD-1002</SelectItem>
                                        <SelectItem value="order3">ORD-1003</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-2 mb-6">
                            <Label htmlFor="amount" className="text-base text-[#4B5565] font-medium">
                                Amount <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="h-14 bg-white border-[#CDD5DF] text-[#9AA4B2] placeholder:text-[#9AA4B2] rounded-xl"
                            />
                        </div>

                        {/* Tax Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <Label className="text-base text-[#4B5565] font-medium">
                                    Add Tax <span className="text-[#9AA4B2]">(Optional)</span>
                                </Label>
                                <button
                                    onClick={addTax}
                                    className="flex cursor-pointer items-center gap-2 text-[#F74F25] hover:text-[#F74F25]/90 font-medium text-sm transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Another Tax
                                </button>
                            </div>

                            <div className="space-y-4">
                                {taxes.map((tax, index) => (
                                    <div
                                        key={tax.id}
                                        className="border border-[#CDD5DF] rounded-2xl p-6 space-y-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-[#9AA4B2]">
                                                Tax {index + 1}
                                            </h3>
                                            {taxes.length > 1 && (
                                                <button
                                                    onClick={() => removeTax(tax.id)}
                                                    className="text-gray-400 cursor-pointer hover:text-[#F74F25] transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-base text-[#4B5565] font-medium">
                                                Tax Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                placeholder="Enter Tax Name"
                                                value={tax.name}
                                                onChange={(e) => updateTax(tax.id, "name", e.target.value)}
                                                className="h-12 bg-white border-[#CDD5DF] text-[#9AA4B2] placeholder:text-[#9AA4B2] rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-base text-[#4B5565] font-medium">
                                                Tax Type<span className="text-red-500">*</span>
                                            </Label>
                                            <RadioGroup
                                                value={tax.type}
                                                onValueChange={(value) => updateTax(tax.id, "type", value as "percentage" | "amount")}
                                                className="flex gap-6"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="percentage"
                                                        id={`percentage-${tax.id}`}
                                                        className="border-2 border-gray-300 text-red-500"
                                                    />
                                                    <Label
                                                        htmlFor={`percentage-${tax.id}`}
                                                        className="text-base text-[#4B5565] font-medium cursor-pointer"
                                                    >
                                                        Percentage
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="amount"
                                                        id={`amount-${tax.id}`}
                                                        className="border-2 border-gray-300 text-red-500"
                                                    />
                                                    <Label
                                                        htmlFor={`amount-${tax.id}`}
                                                        className="text-base text-[#4B5565] font-medium cursor-pointer"
                                                    >
                                                        Amount
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-2">
                                            <Input
                                                type="number"
                                                placeholder={tax.type === "percentage" ? "Enter Percentage" : "Enter Amount"}
                                                value={tax.value}
                                                onChange={(e) => updateTax(tax.id, "value", e.target.value)}
                                                className="h-12 bg-white border-[#CDD5DF] text-[#9AA4B2] placeholder:text-[#9AA4B2] rounded-xl"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="border border-[#CDD5DF] rounded-2xl p-6 mb-6 space-y-4 bg-[#FBFBFD]">
                            <div className="flex items-center justify-between text-[#9AA4B2]">
                                <span className="text-sm">Subtotal</span>
                                <span className="text-sm font-bold text-[#121926]">
                                    {formatCurrency(calculateSubtotal())}
                                </span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#9AA4B2]">Total</span>
                                <span className="text-2xl font-bold text-[#121926]">
                                    {formatCurrency(calculateTotal())}
                                </span>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button
                            onClick={handleGenerateLink}
                            disabled={!customer || !order || !amount || !taxes}
                            className="w-full h-14 bg-[#F74F25] text-white font-bold rounded-2xl transition-all"
                        >
                            Generate Link
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <PaymentSuccessModal 
                open={showSuccessModal} 
                onOpenChange={setShowSuccessModal}
            />
        </>
    )
}