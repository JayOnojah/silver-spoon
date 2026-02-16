"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreHorizontal,
    X,
    Eye,
    Pencil,
    Download,
    Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";

type PaymentStatus = "Not Paid" | "Partial Payment" | "Paid In Full";

interface Invoice {
    id: number;
    invoiceId: string;
    client: string;
    paymentStatus: PaymentStatus;
    orderAmount: number;
    paidAmount?: number;
    createdDate: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_INVOICES: Invoice[] = [
    { id: 1, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Not Paid", orderAmount: 40000, createdDate: "Dec 17, 2025" },
    { id: 2, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Partial Payment", orderAmount: 40000, paidAmount: 29000, createdDate: "Dec 17, 2025" },
    { id: 3, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Paid In Full", orderAmount: 40000, createdDate: "Dec 17, 2025" },
    { id: 4, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Paid In Full", orderAmount: 40000, createdDate: "Dec 17, 2025" },
    { id: 5, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Paid In Full", orderAmount: 40000, createdDate: "Dec 17, 2025" },
    { id: 6, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Paid In Full", orderAmount: 40000, createdDate: "Dec 17, 2025" },
    { id: 7, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Paid In Full", orderAmount: 40000, createdDate: "Dec 17, 2025" },
    { id: 8, invoiceId: "35345", client: "Einstein Oyakhilome", paymentStatus: "Not Paid", orderAmount: 55000, createdDate: "Dec 17, 2025" },
    { id: 9, invoiceId: "35345", client: "Sarah Anderson", paymentStatus: "Partial Payment", orderAmount: 30000, paidAmount: 15000, createdDate: "Dec 17, 2025" },
    { id: 10, invoiceId: "35345", client: "Sarah Anderson", paymentStatus: "Paid In Full", orderAmount: 20000, createdDate: "Dec 17, 2025" },
];

function StatusBadge({ status }: { status: PaymentStatus }) {
    const styles: Record<PaymentStatus, string> = {
        "Not Paid": "border border-[#71451F] text-[#71451F] bg-[#FEFCE8]",
        "Partial Payment": "border border-[#3B82F6] text-[#3B82F6] bg-[#EFF6FF]",
        "Paid In Full": "border border-[#22C55E] text-[#22C55E] bg-[#F0FDF4]",
    };
    return (
        <Badge className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap", styles[status])}>
            {status}
        </Badge>
    );
}

type TabKey = "all" | "paid" | "partial" | "unpaid";

const TABS: { key: TabKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: 30 },
    { key: "paid", label: "Paid", count: 30 },
    { key: "partial", label: "Partial", count: 30 },
    { key: "unpaid", label: "Unpaid", count: 30 },
];

export const AllInvoice = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("all");
    const [search, setSearch] = useState("");
    const [customerFilter, setCustomerFilter] = useState("all");
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [bulkStatus, setBulkStatus] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    // Filter by tab
    const tabFiltered = useMemo(() => {
        switch (activeTab) {
            case "paid": return MOCK_INVOICES.filter(i => i.paymentStatus === "Paid In Full");
            case "partial": return MOCK_INVOICES.filter(i => i.paymentStatus === "Partial Payment");
            case "unpaid": return MOCK_INVOICES.filter(i => i.paymentStatus === "Not Paid");
            default: return MOCK_INVOICES;
        }
    }, [activeTab]);

    // Filter by search + customer
    const filtered = useMemo(() => {
        return tabFiltered.filter(inv => {
            const matchSearch = search === "" ||
                inv.invoiceId.includes(search) ||
                inv.client.toLowerCase().includes(search.toLowerCase());
            const matchCustomer = customerFilter === "all" || inv.client === customerFilter;
            return matchSearch && matchCustomer;
        });
    }, [tabFiltered, search, customerFilter]);

    const tabCount = (key: TabKey) => {
        switch (key) {
            case "paid": return MOCK_INVOICES.filter(i => i.paymentStatus === "Paid In Full").length;
            case "partial": return MOCK_INVOICES.filter(i => i.paymentStatus === "Partial Payment").length;
            case "unpaid": return MOCK_INVOICES.filter(i => i.paymentStatus === "Not Paid").length;
            default: return MOCK_INVOICES.length;
        }
    };

    const uniqueClients = Array.from(new Set(MOCK_INVOICES.map(i => i.client)));

    // Selection logic
    const allVisibleSelected = filtered.length > 0 && filtered.every(i => selectedIds.has(i.id));
    const someSelected = filtered.some(i => selectedIds.has(i.id)) && !allVisibleSelected;

    const toggleSelectAll = () => {
        if (allVisibleSelected) {
            const next = new Set(selectedIds);
            filtered.forEach(i => next.delete(i.id));
            setSelectedIds(next);
        } else {
            const next = new Set(selectedIds);
            filtered.forEach(i => next.add(i.id));
            setSelectedIds(next);
        }
    };

    const toggleOne = (id: number) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    const clearSelection = () => {
        setSelectedIds(new Set());
        setBulkStatus("");
    };

    const handleSaveChanges = () => {
        alert(`Applied "${bulkStatus || "No status selected"}" to ${selectedIds.size} invoice(s).`);
        clearSelection();
    };

    const selectedCount = selectedIds.size;
    const hasSelection = selectedCount > 0;

    return (
        <div className="min-h-screen bg-[#fdf5f0] py-4 sm:py-6 font-sans">
            {/* Tabs */}
            <div className="flex items-center md:gap-1 mb-4 w-fit border-2 border-black rounded-full px-1 py-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                            "relative px-4 py-3 rounded-full cursor-pointer md:text-sm text-xs whitespace-nowrap font-medium transition-colors duration-200 z-10",
                            activeTab === tab.key ? "text-white font-bold" : "text-[#121926] hover:text-[#F74F25]"
                        )}
                    >
                        {/* Sliding background pill */}
                        {activeTab === tab.key && (
                            <motion.span
                                layoutId="activeTab"
                                className="absolute inset-0 bg-[#F74F25] rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            />
                        )}
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Card */}
            <div className="md:bg-white rounded-2xl overflow-hidden">
                {/* Card Header */}
                <div className="md:px-5 pt-5 pb-3">
                    <h2 className="text-sm font-bold text-[#121926] mb-4">All Invoices</h2>

                    {/* Search + Filter Row */}
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-[#9AA4B2]" />
                            <Input
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-9 h-12 rounded-lg border-0 shadow-none bg-white md:border md:border-[#CDD5DF] placeholder:text-[#9AA4B2]"
                            />
                        </div>
                        <Select value={customerFilter} onValueChange={setCustomerFilter}>
                            <SelectTrigger className="h-12! shadow-none bg-white rounded-lg border-0 md:border-[#CDD5DF] font-bold text-sm text-[#9AA4B2] min-w-37 md:border">
                                <SelectValue placeholder="All Customers" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-[#e8e0dc]">
                                <SelectItem value="all">All Customers</SelectItem>
                                {uniqueClients.map(c => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Bulk Action Banner */}
                {hasSelection && (
                    <div className="mx-5 mb-3 flex items-center gap-3 bg-[#fff3ef] border border-[#CDD5DF] rounded-xl px-4 py-2.5">
                        {/* Mobile layout stacks, desktop is row */}
                        <div className="flex items-center gap-3 flex-wrap flex-1">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-[#F74F25] flex items-center justify-center shrink-0">
                                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                        <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-[#1a1a1a]">{selectedCount} Selected</span>
                            </div>

                            <Select value={bulkStatus} onValueChange={setBulkStatus}>
                                <SelectTrigger className="h-8 rounded-lg border-[#ddd] bg-white text-sm text-[#5a4a42] min-w-37.5 focus:ring-0 focus:ring-offset-0">
                                    <SelectValue placeholder="Payment Status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-[#e8e0dc]">
                                    <SelectItem value="Not Paid">Not Paid</SelectItem>
                                    <SelectItem value="Partial Payment">Partial Payment</SelectItem>
                                    <SelectItem value="Paid In Full">Paid In Full</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={handleSaveChanges}
                                className="h-8 px-5 bg-[#F74F25] hover:bg-[#e03e15] text-white text-sm font-semibold rounded-lg border-0 shadow-none"
                            >
                                Save Changes
                            </Button>
                        </div>

                        <button onClick={clearSelection} className="text-[#9a8a82] hover:text-[#1a1a1a] ml-auto shrink-0">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* ── Desktop Table ─────────────────────────────────────────────────── */}
                <div className="hidden md:block px-6">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#F9F0EE]">
                                <th className="px-5 py-3 text-left w-10 rounded-l-3xl">
                                    <Checkbox
                                        checked={allVisibleSelected}
                                        onCheckedChange={toggleSelectAll}
                                        className={cn(
                                            "rounded border-[#CDD5DF] data-[state=checked]:bg-[#F74F25] data-[state=checked]:border-[#F74F25]",
                                            someSelected && "opacity-60"
                                        )}
                                    />
                                </th>
                                {["Invoice ID", "Client", "Payment Status", "Order Amount", "Created Date", "Actions"].map(h => (
                                    <th key={h} className={`px-3 py-3 text-left text-xs font-bold text-[#9AA4B2] tracking-wide uppercase ${h === 'Actions' ? 'rounded-r-3xl' : ''}`}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-10 text-center text-sm text-[#b0a099]">
                                        No invoices found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((inv, idx) => {
                                    const isSelected = selectedIds.has(inv.id);
                                    return (
                                        <tr
                                            key={inv.id}
                                            className={cn(
                                                "border-b border-[#CDD5DF] transition-colors",
                                                isSelected ? "bg-[#fff8f6]" : idx % 2 === 0 ? "bg-white" : "bg-white",
                                                "hover:bg-[#fff8f6]"
                                            )}
                                        >
                                            <td className="px-5 py-3.5">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={() => toggleOne(inv.id)}
                                                    className="rounded border-[#ccc] data-[state=checked]:bg-[#F74F25] data-[state=checked]:border-[#F74F25]"
                                                />
                                            </td>
                                            <td className="px-3 py-3.5 text-sm text-[#3a3a3a] font-medium">{inv.invoiceId}</td>
                                            <td className="px-3 py-3.5 text-sm text-[#3a3a3a]">{inv.client}</td>
                                            <td className="px-3 py-3.5">
                                                <StatusBadge status={inv.paymentStatus} />
                                            </td>
                                            <td className="px-3 py-3.5">
                                                <div className="text-sm text-[#3a3a3a] font-medium">₦{inv.orderAmount.toLocaleString()}</div>
                                                {inv.paidAmount && (
                                                    <div className="text-xs text-[#9AA4B2] mt-0.5">Paid ₦{inv.paidAmount.toLocaleString()}</div>
                                                )}
                                            </td>
                                            <td className="px-3 py-3.5 text-sm text-[#3a3a3a]">{inv.createdDate}</td>
                                            <td className="px-3 py-3.5">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="text-[#9AA4B2] hover:text-[#1a1a1a] p-1 rounded-md hover:bg-[#f5f0ed] transition-colors">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="rounded-xl w-40 text-[#9AA4B2] border">
                                                        <DropdownMenuItem className="text-sm cursor-pointer">
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-sm cursor-pointer">
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-sm cursor-pointer">
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-sm cursor-pointer">
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Mobile Cards ───────────────────────────────────────────────────── */}
                <div className="md:hidden pb-4 space-y-3">
                    {filtered.length === 0 ? (
                        <div className="text-center py-10 text-sm text-[#b0a099]">No invoices found.</div>
                    ) : (
                        filtered.map(inv => {
                            const isSelected = selectedIds.has(inv.id);
                            return (
                                <div
                                    key={inv.id}
                                    className={cn(
                                        "rounded-2xl p-4 transition-all",
                                        isSelected ? "border-[#F74F25]/40 bg-[#fff8f6]" : "border-[#ede8e4] bg-white"
                                    )}
                                >
                                    {/* Card top: checkbox */}
                                    <div className="flex justify-between items-start mb-3">
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={() => toggleOne(inv.id)}
                                            className="rounded border-[#CDD5DF] data-[state=checked]:bg-[#F74F25] data-[state=checked]:border-[#F74F25] mt-0.5"
                                        />
                                    </div>

                                    {/* Card rows */}
                                    <div className="space-y-2.5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[#9AA4B2]">Invoice ID</span>
                                            <span className="text-sm font-bold text-[#1a1a1a]">{inv.invoiceId}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[#9AA4B2]">Customer</span>
                                            <span className="text-sm font-bold text-[#1a1a1a]">{inv.client}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[#9AA4B2]">Status</span>
                                            <StatusBadge status={inv.paymentStatus} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[#9AA4B2]">Amount</span>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-[#1a1a1a]">₦{inv.orderAmount.toLocaleString()}</div>
                                                {inv.paidAmount && (
                                                    <div className="text-xs text-[#9AA4B2]">Paid ₦{inv.paidAmount.toLocaleString()}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[#9AA4B2]">Created Date</span>
                                            <span className="text-sm font-bold text-[#1a1a1a]">{inv.createdDate}</span>
                                        </div>
                                    </div>

                                    {/* Action Icons Row */}
                                    <div className="flex items-center gap-2 mt-2 pt-3">
                                        {[
                                            { icon: Eye, label: "View" },
                                            { icon: Pencil, label: "Edit" },
                                            { icon: Download, label: "Download" },
                                            { icon: Trash2, label: "Delete" },
                                        ].map(({ icon: Icon, label }) => (
                                            <button
                                                key={label}
                                                title={label}
                                                className={cn(
                                                    "flex-1 flex items-center justify-center h-12 rounded-xl border text-[#9AA4B2] hover:text-gray-500 transition-colors",
                                                    
                                                        
                                                         "border-[#CDD5DF] hover:border-gray-400"
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {/* Pagination */}
            <div className="grid grid-cols-3 w-full items-center pb-6 mt-6">
                <p className="text-sm text-[#121926]">Page {currentPage} of {totalPages}</p>
                <div className='flex justify-center gap-2'>
                    {[1, 2, 3].map((page) => (
                        <PaginationItem key={page} className="list-none">
                            <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer border-none rounded-full ${currentPage === page
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:text-white'
                                    : 'hover:bg-white'
                                    }`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {[4, 5].map((page) => (
                        <PaginationItem key={page} className="list-none hidden md:block">
                            <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer border-none rounded-full ${currentPage === page
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:text-white'
                                    : 'hover:bg-white'
                                    }`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </div>
                <Pagination className='flex justify-end'>
                    <PaginationContent className='gap-5'>
                        <PaginationItem className='border rounded-full h-10 w-10 flex justify-center items-center border-[#CDD5DF]'>
                            <PaginationPrevious
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                className={`text-[#121926] hover:bg-transparent hover:-translate-x-0.5 transition-all duration-300 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                            />
                        </PaginationItem>

                        <PaginationItem className='border rounded-full h-10 w-10 flex justify-center items-center border-[#CDD5DF]'>
                            <PaginationNext
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                className={`text-[#121926] hover:bg-transparent hover:translate-x-0.5 transition-all duration-300 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}