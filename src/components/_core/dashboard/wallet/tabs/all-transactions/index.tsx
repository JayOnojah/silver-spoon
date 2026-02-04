'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Download } from '../../svg';

interface Transaction {
    id: string;
    transactionId: string;
    description: string;
    customer: string;
    date: string;
    amount: number;
    status: 'Completed' | 'In Progress';
}

const transactions: Transaction[] = [
    {
        id: '1',
        transactionId: 'TXN-1001',
        description: 'Payment for ORD-1001',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: 45000,
        status: 'Completed'
    },
    {
        id: '2',
        transactionId: 'TXN-1001',
        description: 'Withdrawal to Bank Account',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: -45000,
        status: 'Completed'
    },
    {
        id: '3',
        transactionId: 'TXN-1001',
        description: 'Withdrawal to Bank Account',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: -45000,
        status: 'In Progress'
    },
    {
        id: '4',
        transactionId: 'TXN-1001',
        description: 'Withdrawal to Bank Account',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: -45000,
        status: 'Completed'
    },
    {
        id: '5',
        transactionId: 'TXN-1001',
        description: 'Payment for ORD-1001',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: 45000,
        status: 'Completed'
    },
    {
        id: '6',
        transactionId: 'TXN-1001',
        description: 'Payment for ORD-1001',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: 45000,
        status: 'In Progress'
    },
    {
        id: '7',
        transactionId: 'TXN-1001',
        description: 'Payment for ORD-1001',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: 45000,
        status: 'Completed'
    },
    {
        id: '8',
        transactionId: 'TXN-1001',
        description: 'Payment for ORD-1001',
        customer: 'Sandra Jones',
        date: 'Dec 19, 2025, 10:30 AM',
        amount: 45000,
        status: 'In Progress'
    }
];

export const AllTransactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <>
            <div className="w-full lg:p-6 lg:bg-white rounded-2xl my-6 font-sans">
                {/* Header */}
                <h1 className="font-semibold text-[#000000] mb-6">All Transactions</h1>

                {/* Search and Export */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-[#9AA4B2]" />
                        <Input
                            type="text"
                            placeholder="Search transactions..."
                            className="w-full pl-10 pr-4 h-12 bg-white text-base text-[#9AA4B2] border-[#CDD5DF] rounded-lg"
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="h-12 px-6 text-[#9AA4B2]! border-gray-200 hover:bg-gray-50 rounded-lg"
                    >
                        <Download />
                        Export CSV
                    </Button>
                </div>

                {/*Desktop Table */}
                <div className="hidden lg:block border-gray-200 rounded-lg overflow-hidden bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#FFF1EC]/50 hover:bg-[#FFF1EC]/40 border-none">
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 pl-4 rounded-l-4xl">
                                    Transaction ID
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Description
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Customer
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Date
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Amount
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 rounded-r-4xl">
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    className="border-b border-[#CDD5DF] hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-[#121926] py-4">
                                        {transaction.transactionId}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {transaction.customer}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {transaction.date}
                                    </TableCell>
                                    <TableCell className={`py-4 ${transaction.amount > 0 ? 'text-[#40B773]' : 'text-[#FF5B4D]'
                                        }`}>
                                        {transaction.amount > 0 ? '+' : ''} {FormatCurrency(transaction.amount)}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 rounded-full font-medium border ${transaction.status === 'Completed'
                                                ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                                : 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                                }`}
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Mobile Table */}
                <div className='lg:hidden flex flex-col gap-4'>
                    {transactions.map((transaction) => (
                        <div className='bg-white p-4 rounded-2xl w-full' key={transaction.id}>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Transaction ID</p>
                                <p className='text-[#121926] text-sm font-bold'>{transaction.transactionId}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Description</p>
                                <p className='text-[#121926] text-sm font-bold'>{transaction.description}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Customer</p>
                                <p className='text-[#121926] text-sm font-bold'>{transaction.customer}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Date</p>
                                <p className='text-[#121926] text-sm font-bold'>{transaction.date}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Amount</p>
                                <p className={`font-bold ${transaction.amount > 0 ? 'text-[#40B773]' : 'text-[#FF5B4D]'
                                    }`}> {transaction.amount > 0 ? '+' : ''} {FormatCurrency(transaction.amount)}
                                </p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-[#9AA4B2]'>Due Status</p>
                                <Badge
                                    variant="outline"
                                    className={`px-3 py-1 rounded-full font-medium border ${transaction.status === 'Completed'
                                        ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                        : 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                        }`}
                                >
                                    {transaction.status}
                                </Badge>
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