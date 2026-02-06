'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";

import {
    UsersRound,
    Search,
    UserRound,
    Eye
} from "lucide-react"
import { Input } from "@/src/components/ui/input";

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

interface Customers {
    id: string;
    customerName: string;
    phoneNumber: string;
    email: string;
    address: string;
}

const customers: Customers[] = [
    {
        id: 'cus-001',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-002',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-003',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-004',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-005',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-006',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-007',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    },
    {
        id: 'cus-008',
        customerName: 'Sarah Jones',
        phoneNumber: '090354722237',
        email: 'Einstein.oyakilome1@gmail.com',
        address: 'Flat 27 ezebu estate off asoro bus stop',
    }
];

export const AllCustomer = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <div className="font-sans mt-6">
            <div className="bg-white p-6 rounded-2xl">
                <UsersRound className="text-[#F74F25]" />
                <h1 className="text-[#121926] text-[20px] font-black py-1">300</h1>
                <p className="text-[#9AA4B2] text-sm">Total Customer</p>
            </div>
            <div className="w-full lg:p-6 lg:bg-white rounded-2xl my-6 font-sans">
                <h1 className="font-semibold text-[#000000] pb-4">All Customer</h1>
                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                        <Input
                            type="text"
                            placeholder="Search names..."
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
                                    Customer Name
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Phone Number
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Email Address
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Address
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] text-center font-bold text-sm py-2 rounded-r-4xl">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow
                                    key={customer.id}
                                    className="border-b border-[#CDD5DF] hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-[#121926] py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[#F74F25] flex justify-center items-center w-10 h-10 rounded-full bg-[#FEEDE9]">
                                                <UserRound />
                                            </div>
                                            {customer.customerName}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {customer.phoneNumber}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {customer.email}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {customer.phoneNumber}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4 flex items-center gap-4">
                                        <Button onClick={() => router.push(`/dashboard/customers/customer-details/${customer.id}`)} variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
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
                    {customers.map((customer) => (
                        <div className='bg-white p-4 rounded-2xl w-full' key={customer.id}>
                            <div className='flex justify-between items-center mb-2 border-b pb-4'>
                                <div className="flex items-center gap-2">
                                    <div className="text-[#F74F25] flex justify-center items-center w-10 h-10 rounded-full bg-[#FEEDE9]">
                                        <UserRound />
                                    </div>
                                    {customer.customerName}
                                </div>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Phone Number</p>
                                <p className='text-[#121926] text-sm font-bold'>{customer.phoneNumber}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Email Address</p>
                                <p className='text-[#121926] text-sm font-bold'>{customer.email}</p>
                            </div>
                            <div className='flex justify-between items-start mb-2'>
                                <p className='text-[#9AA4B2]'>Address</p>
                                <p className='text-[#121926] text-sm font-bold text-end'>{customer.address}</p>
                            </div>
                            <div className='flex gap-4 items-center w-full'>
                                <Button onClick={() => router.push(`/dashboard/customers/customer-details/${customer.id}`)} variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                    <Eye />
                                    View Details
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
        </div>
    )
}