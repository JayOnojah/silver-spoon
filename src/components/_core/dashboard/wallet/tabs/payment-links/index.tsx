'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { FormatCurrency } from '../../../shared/format-currency';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Copy, Trash2, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { PaymentLinkModal } from '../../modals/payment-link-generator';

interface Payments {
    id: string;
    linkId: string;
    order: string;
    customer: string;
    date: string;
    amount: number;
    status: 'Paid' | 'In Progress' | 'Expire';
}

const payments: Payments[] = [
    {
        id: '1',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'Paid'
    },
    {
        id: '2',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'Paid'
    },
    {
        id: '3',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'In Progress'
    },
    {
        id: '4',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'ORD-1001 ',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'Paid'
    },
    {
        id: '5',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'Paid'
    },
    {
        id: '6',
        linkId: 'TXN-1001',
        order: 'ORD-1001',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'In Progress'
    },
    {
        id: '7',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'Expire'
    },
    {
        id: '8',
        linkId: 'TXN-1001',
        order: 'ORD-1001 ',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025',
        amount: 45000,
        status: 'In Progress'
    }
];

export const PaymentLinks = () => {
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <>
            <div className="w-full lg:p-6 lg:bg-white rounded-2xl my-6 font-sans">
                <div className='mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4'>
                    <div>
                        <h1 className="font-semibold text-[#000000] pb-1">Payment Links</h1>
                        <p className='text-[#9AA4B2] text-xs'>Manage and track payment links sent to customers</p>
                    </div>
                    <PaymentLinkModal btnName='New Payment Link' open={open} onOpenChange={setOpen} icon={<Plus />}/>
                </div>
                {/*Desktop Table */}
                <div className="hidden lg:block border-gray-200 rounded-lg overflow-hidden bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#FFF1EC]/50 hover:bg-[#FFF1EC]/40 border-none">
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 pl-4 rounded-l-4xl">
                                    Link ID
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Order
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Customer
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Amount
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Created Date
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Status
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 rounded-r-4xl">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow
                                    key={payment.id}
                                    className="border-b border-[#CDD5DF] hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-[#121926] py-4">
                                        {payment.linkId}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {payment.order}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {payment.customer}
                                    </TableCell>
                                    <TableCell className='py-4 text-[#121926]'>
                                        {FormatCurrency(payment.amount)}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {payment.date}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 rounded-full font-medium border ${payment.status === 'Paid'
                                                ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                                : payment.status === 'In Progress'
                                                    ? 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                                    : 'text-[#FF5B4D] border-[#FF5B4D] bg-[#FFE2DF]'
                                                }`}
                                        >
                                            {payment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4 flex items-center gap-4">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='flex w-8 h-8 text-[#9AA4B2] hover:bg-gray-200 cursor-pointer rounded-sm justify-center items-center transition-colors duration-300'>
                                                    <Copy className='w-5 h-5' />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Copy</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='flex w-8 h-8 text-[#9AA4B2] hover:bg-gray-200 cursor-pointer rounded-sm justify-center items-center transition-colors duration-300'>
                                                    <Trash2 className='w-5 h-5' />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Mobile Table */}
                <div className='lg:hidden flex flex-col gap-4'>
                    {payments.map((payment) => (
                        <div className='bg-white p-4 rounded-2xl w-full' key={payment.id}>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Link ID</p>
                                <p className='text-[#121926] text-sm font-bold'>{payment.linkId}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Order</p>
                                <p className='text-[#121926] text-sm font-bold'>{payment.order}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Customer</p>
                                <p className='text-[#121926] text-sm font-bold'>{payment.customer}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Created Date</p>
                                <p className='text-[#121926] text-sm font-bold'>{payment.date}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Amount</p>
                                <p className={`font-bold`}> {FormatCurrency(payment.amount)}
                                </p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Due Status</p>
                                <Badge
                                    variant="outline"
                                    className={`px-3 rounded-full font-medium border ${payment.status === 'Paid'
                                        ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                        : payment.status === 'In Progress'
                                            ? 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                            : 'text-[#FF5B4D] border-[#FF5B4D] bg-[#FFE2DF]'
                                        }`}
                                >
                                    {payment.status}
                                </Badge>
                            </div>
                            <div className='flex gap-4 items-center w-full'>
                                <Button variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                    <Copy />
                                    Copy
                                </Button>
                                <Button variant={'outline'} className='w-full flex-1 h-11 border-[#CDD5DF] border text-[#9AA4B2]'>
                                    <Trash2 />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* Pagination */}
            <div className="grid grid-cols-3 w-full items-center pb-6">
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
        </>
    );
}