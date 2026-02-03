"use client";

import { useState, useCallback, ReactNode } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Upload } from "../svg";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/src/components/ui/input";

interface Customer {
    id: number;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    address: string;
}

interface CustomerModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    icon?: ReactNode;
    btnName: string;
}

const FIELDS = [
    { key: "fullName" as const, label: "Full Name", placeholder: "Enter Full Name", type: "text" as const },
    { key: "phoneNumber" as const, label: "Phone Number", placeholder: "Enter Phone Number", type: "tel" as const },
    { key: "emailAddress" as const, label: "Email Address", placeholder: "Enter Email Address", type: "email" as const },
    { key: "address" as const, label: "Address", placeholder: "Enter Address", type: "text" as const },
];

export default function CreateCustomerModal({ open, setOpen, icon, btnName }: CustomerModalProps) {
    const [customers, setCustomers] = useState<Customer[]>([
        { id: 1, fullName: "", phoneNumber: "", emailAddress: "", address: "" },
    ]);
    const [dragOver, setDragOver] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const addCustomer = useCallback(() => {
        setCustomers((prev) => [
            ...prev,
            { id: Date.now(), fullName: "", phoneNumber: "", emailAddress: "", address: "" },
        ]);
    }, []);

    const removeCustomer = useCallback((id: number) => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
    }, []);

    const updateCustomer = useCallback(
        (id: number, field: keyof Omit<Customer, "id">, value: string) => {
            setCustomers((prev) =>
                prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
            );
        },
        []
    );

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) setFileName(file.name);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    const UploadZone = (
        <div>
            <label className="block text-sm font-semibold text-[#0F1011] mb-2">
                Upload file
            </label>
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${dragOver
                        ? "border-[#F74F25] bg-[#FEEDE9] scale-[1.01]"
                        : fileName
                            ? "border-green-400 bg-green-50"
                            : "border-[#F0A898] bg-[#FEEDE9] hover:border-[#F74F25] hover:bg-[#FEEDE9]/70"
                    }`}
                onClick={() => document.getElementById("file-upload-input")?.click()}
            >
                <input
                    id="file-upload-input"
                    type="file"
                    accept=".csv,.xlsx,.xls,.pdf"
                    className="sr-only"
                    onChange={handleFileInput}
                />
                <div className="flex flex-col items-center justify-center py-4 px-4">
                    <Upload />
                    {fileName ? (
                        <p className="text-sm font-medium text-green-600">{fileName}</p>
                    ) : (
                        <p className="text-sm text-center text-[#9AA4B2] mt-4">
                            <span className="font-semibold text-[#F74F25]">Click to upload</span>{" "}
                            or drag &amp; drop your document here
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    /* ── mobile card for one customer ── */
    const MobileCard = ({ customer, index }: { customer: Customer; index: number }) => (
        <div className="border border-[#E3E6E9] rounded-xl bg-white">
            {/* card header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-sm font-bold text-[#121926]">
                    Customer {index + 1}
                </span>
                <button
                    onClick={() => removeCustomer(customer.id)}
                    disabled={customers.length === 1}
                    className={`transition-all duration-150 ${customers.length === 1
                            ? "text-[#CDD5DF] cursor-not-allowed"
                            : "text-[#9AA4B2] hover:text-red-500"
                        }`}
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {/* stacked fields */}
            <div className="px-4 pb-4 space-y-3">
                {FIELDS.map((field) => (
                    <div key={field.key}>
                        <label className="block text-sm font-semibold text-[#0F1011] mb-1.5">
                            {field.label} <span className="text-[#F74F25]">*</span>
                        </label>
                        <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={customer[field.key]}
                            onChange={(e) => updateCustomer(customer.id, field.key, e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-[#CDD5DF] text-sm text-gray-800 placeholder-[#9AA4B2] focus-visible:ring-[#F74F25]/30 focus-visible:border-[#F74F25]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    /* ── desktop table row ── */
    const DesktopRow = ({ customer }: { customer: Customer }) => (
        <TableRow className="group hover:bg-gray-50/50 border-t border-gray-100">
            {FIELDS.map((field) => (
                <TableCell key={field.key} className="py-2.5 px-3">
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={customer[field.key]}
                        onChange={(e) => updateCustomer(customer.id, field.key, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#CDD5DF] text-sm text-gray-800 placeholder-[#9AA4B2] focus-visible:ring-[#F74F25]/30 focus-visible:border-[#F74F25]"
                    />
                </TableCell>
            ))}
            <TableCell className="py-2.5 px-2 text-center">
                <button
                    onClick={() => removeCustomer(customer.id)}
                    disabled={customers.length === 1}
                    className={`flex items-center justify-center mx-auto w-9 h-9 rounded-lg transition-all duration-150 ${customers.length === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100"
                        }`}
                >
                    <Trash2 size={18} />
                </button>
            </TableCell>
        </TableRow>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#F74F25] md:w-45 w-full text-white rounded-2xl h-11 font-bold font-sans">
                    {icon}
                    {btnName}
                </Button>
            </DialogTrigger>

            <DialogContent className="md:max-w-5xl! w-full max-h-[90vh] overflow-y-auto rounded-2xl p-0 shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between px-4 md:px-8 pt-6 md:pt-8 pb-2">
                    <DialogHeader className="text-left space-y-1">
                        <DialogTitle className="text-2xl font-black text-[#121926] tracking-tight">
                            Create Customer
                        </DialogTitle>
                        <DialogDescription className="text-sm  text-[#9AA4B2]">
                            Add your customer(s) manually or in bulk by filling{" "}
                            <a
                                href="#"
                                className="font-bold hover:underline underline-offset-2 transition-colors hover:opacity-90"
                                style={{ color: "#F74F25" }}
                            >
                                downloading this template
                            </a>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Body */}
                <div className="px-4 md:px-8 pb-6 md:pb-8 pt-4 space-y-5">
                    {UploadZone}

                    <div className="flex flex-col gap-3 md:hidden">
                        <label className="block text-base font-bold text-[#121926]">
                            Customer(s)
                        </label>
                        {customers.map((customer, index) => (
                            <MobileCard key={customer.id} customer={customer} index={index} />
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <label className="block text-base font-bold text-[#121926] mb-3">
                            Customer(s)
                        </label>
                        <div className="rounded-[4px] p-2 border border-[#E3E6E9] overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50 border-none">
                                        <TableHead className="text-sm font-bold rounded-l-[4px] text-[#9AA4B2] tracking-wider py-3 px-4">
                                            Fullname
                                        </TableHead>
                                        <TableHead className="text-sm font-bold text-[#9AA4B2] tracking-wider py-3 px-4">
                                            Phone Number
                                        </TableHead>
                                        <TableHead className="text-sm font-bold text-[#9AA4B2] tracking-wider py-3 px-4">
                                            Email Address
                                        </TableHead>
                                        <TableHead className="text-sm font-bold rounded-r-[4px] text-[#9AA4B2] tracking-wider py-3 px-4">
                                            Address
                                        </TableHead>
                                        <TableHead className="w-14 py-3 px-2" />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customers.map((customer) => (
                                        <DesktopRow key={customer.id} customer={customer} />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <button
                        onClick={addCustomer}
                        className="flex items-center gap-1.5 text-sm font-bold text-[#F74F25] transition-all duration-150 hover:opacity-70 active:scale-95"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        Add Another Customer
                    </button>

                    {/* Footer CTA */}
                    <div className="flex justify-end pt-2">
                        <Button
                            className="w-full md:w-auto px-7 h-12 rounded-xl text-white text-sm font-bold shadow-md transition-all duration-200 hover:shadow-lg hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: "#F74F25" }}
                        >
                            Create Customer(s)
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}