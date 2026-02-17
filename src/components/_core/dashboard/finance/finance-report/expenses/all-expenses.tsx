'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { FormatCurrency } from "../../../shared/format-currency";
import { RecordExpensesModal } from "./record-expenses-modal";
import { GraphBarSm } from "../../svg";

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
import { Search } from "lucide-react";
import { Edit, Trash } from "../../../design-operations/svg";
import { Button } from "@/src/components/ui/button";

interface AllExpenses {
    id: string;
    paymentDate: string;
    expenseType: string;
    amount: number;
    description: string;
    recipient: string;
}

const allExpenses: AllExpenses[] = [
    {
        id: '1',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '2',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '3',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '4',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '5',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '6',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '7',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
    {
        id: '8',
        paymentDate: 'Dec 20, 2025',
        expenseType: 'Salary',
        amount: 780000,
        description: 'Moving of equipment to Mrs Clara’s event center',
        recipient: 'Einstein Oyakhilome'
    },
];

export const AllExpenses = () => {
    const router = useRouter();
    const [isEmpty, setIsEmpty] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <>
            <div className="w-full lg:p-6 lg:bg-white rounded-2xl my-6 font-sans">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4">
                    <h1 className="font-semibold text-[#000000]">All Expenses (67)</h1>
                    <RecordExpensesModal btnName="New Expenses" />
                </div>
                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-12 pr-4 py-3 rounded-lg border h-12 text-gray-600 placeholder:text-[#9AA4B2]"
                        />
                    </div>
                </div>
                {/*Desktop Table */}
                <div className="hidden lg:block border-gray-200 rounded-lg overflow-hidden bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#FFF1EC]/50 hover:bg-[#FFF1EC]/40 border-none">
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 pl-4 rounded-l-4xl">
                                    Payment Date
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Expense Type
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Amount
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Description
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Recipient
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 rounded-r-4xl">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allExpenses.map((expense) => (
                                <TableRow
                                    key={expense.id}
                                    className="border-b border-[#CDD5DF] hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-[#121926] py-4">
                                        {expense.paymentDate}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {expense.expenseType}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {FormatCurrency(expense.amount)}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {expense.description}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {expense.recipient}
                                    </TableCell>
                                    <TableCell className="text-[#9AA4B2] py-4 flex items-center gap-4">
                                        <button className="cursor-pointer hover:bg-gray-200/50 rounded-sm w-7.5 h-7.5 flex justify-center items-center transition-all duration-400">
                                            <Edit />
                                        </button>
                                        <button className="cursor-pointer hover:bg-gray-200/50 rounded-sm w-7.5 h-7.5 flex justify-center items-center transition-all duration-400">
                                            <Trash />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Mobile Table */}
                <div className='lg:hidden flex flex-col gap-4'>
                    {allExpenses.map((expense) => (
                        <div className='bg-white p-4 rounded-2xl w-full' key={expense.id}>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Payment Date</p>
                                <p className='text-[#121926] text-sm font-bold'>{expense.paymentDate}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Expense Type</p>
                                <p className='text-[#121926] text-sm font-bold'>{expense.expenseType}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Amount</p>
                                <p className='text-[#121926] text-sm font-bold'>{FormatCurrency(expense.amount)}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Description</p>
                                <p className='text-[#121926] text-sm text-end font-bold'>{expense.description}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Recipient</p>
                                <p className='text-[#121926] text-sm font-bold'>{expense.recipient}</p>
                            </div>
                            <div className='flex gap-4 items-center w-full'>
                                <Button variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                    <Edit />
                                </Button>
                                <Button variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                    <Trash />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* Empty State */}
            {isEmpty && (
                <div className="w-full mt-6 py-30 bg-white flex flex-col justify-center items-center rounded-2xl">
                    <div className="flex justify-center mb-5">
                        <GraphBarSm />
                    </div>
                    <h1 className="text-black mb-2 font-bold text-[18px] text-center">No expenses recorded yet</h1>
                    <p className="text-[#9AA4B2] text-sm text-center mb-8">Track your business expenses to see a breakdown here.</p>
                    <RecordExpensesModal btnName="Record Expenses" />
                </div>
            )}
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
    )
}