'use client'

import { useState } from 'react';
import { FormatCurrency } from '@/src/components/_core/dashboard/shared/format-currency';
import { Badge } from '@/src/components/ui/badge';
import { Input } from '@/src/components/ui/input';
import { Search } from 'lucide-react';
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
import { Button } from '@/src/components/ui/button';

interface Activities {
    id: string;
    description: string;
    date: string;
}

const activities: Activities[] = [
    {
        id: '1',
        description: 'Created an order 46463',
        date: '25 Dec, 20205',
    },
    {
        id: '2',
        description: 'Added a new inventory item',
        date: '25 Dec, 20205',
    },
    {
        id: '3',
        description: 'Added a new customer',
        date: '25 Dec, 20205',
    },
    {
        id: '4',
        description: 'Added a new customer',
        date: '25 Dec, 20205',
    },
    {
        id: '5',
        description: 'Updated customer information',
        date: '25 Dec, 20205',
    },
    {
        id: '6',
        description: 'Generated Payment link for Order 3442',
        date: '25 Dec, 20205',
    },
];



export const RecentActivities = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [customerEmpty, setCustomerEmpty] = useState(false);
    const totalPages = 10; // Example total pages

    return (
        <div className="w-full lg:bg-white rounded-2xl my-6 font-sans p-6">
            {/* Header */}
            <div className='mb-4'>
                <h1 className="font-bold text-[#000000] mb-6">All Activities(6)</h1>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg border h-12 text-gray-600 placeholder:text-[#9AA4B2]"
                    />
                </div>
            </div>
            {/*Desktop Table */}
            <div className="hidden border p-4 lg:block border-gray-200 rounded-lg overflow-hidden bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#FFF1EC]/50 hover:bg-[#FFF1EC]/40 border-none">
                            <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 pl-4 rounded-l-4xl">
                                Description
                            </TableHead>
                            <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                Date
                            </TableHead>
                            <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 rounded-r-4xl">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow
                                key={activity.id}
                                className="border-b border-[#CDD5DF] hover:bg-gray-50"
                            >
                                <TableCell className="font-medium text-[#121926] py-4">
                                    {activity.description}
                                </TableCell>
                                <TableCell className="text-[#121926] py-4">
                                    {activity.date}
                                </TableCell>
                                <TableCell className="py-4">
                                    <Button variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Mobile Table */}
            <div className='lg:hidden flex flex-col gap-4'>
                {activities.map((activity) => (
                    <div className='bg-white p-4 rounded-2xl w-full border' key={activity.id}>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='text-[#9AA4B2]'>Description</p>
                            <p className='text-[#121926] text-sm font-bold'>{activity.description}</p>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='text-[#9AA4B2]'>Date</p>
                            <p className='text-[#121926] text-sm font-bold'>{activity.date}</p>
                        </div>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='text-[#9AA4B2]'>Action</p>
                            <Button variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                View Details
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="grid grid-cols-3 w-full items-center pt-6">
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
    )
}