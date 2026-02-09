'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";

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
import { Search, UserRound, Eye } from "lucide-react";
import { Edit, Trash } from "../../design-operations/svg";
import { Button } from "@/src/components/ui/button";

interface AllStaff {
    id: string;
    staffMember: string;
    phoneNumber: string;
    email: string;
    status: string;
}

const allStaff: AllStaff[] = [
    {
        id: 'staff-01',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Active',
    },
    {
        id: 'staff-02',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Inactive',
    },
    {
        id: 'staff-03',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Active',
    },
    {
        id: 'staff-04',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Active',
    },
    {
        id: 'staff-05',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Inactive',
    },
    {
        id: 'staff-06',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Inactive',
    },
    {
        id: 'staff-07',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Active',
    },
    {
        id: 'staff-08',
        staffMember: 'Sarah Jones',
        email: 'Einstein.oyakilome1@gmail.com',
        phoneNumber: '090354722237',
        status: 'Active',
    },
];

export const AllStaff = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <>
            <div className="w-full lg:p-6 lg:bg-white rounded-2xl my-6 font-sans">
                <h1 className="font-semibold text-[#000000] pb-4">All Staff</h1>
                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                        <Input
                            type="text"
                            placeholder="Search staff..."
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
                                    Staff Member
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Email Address
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Phone Number
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
                            {allStaff.map((staff) => (
                                <TableRow
                                    key={staff.id}
                                    className="border-b border-[#CDD5DF] hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-[#121926] py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[#F74F25] flex justify-center items-center w-10 h-10 rounded-full bg-[#FEEDE9]">
                                                <UserRound />
                                            </div>
                                            {staff.staffMember}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {staff.email}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {staff.phoneNumber}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 rounded-full font-medium border ${staff.status === 'Active'
                                                ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                                : 'bg-[#E1E1E1] text-[#9AA4B2] border-[#CDD5DF]'
                                                }`}
                                        >
                                            {staff.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-[#9AA4B2] py-4 flex items-center gap-4">
                                        <button onClick={() => router.push(`/dashboard/store-operations/staffs/staff-details/${staff.id}`)} className="cursor-pointer hover:bg-gray-200/50 rounded-sm w-7.5 h-7.5 flex justify-center items-center transition-all duration-400">
                                            <Eye strokeWidth={1.5} size={24} />
                                        </button>
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
                    {allStaff.map((staff) => (
                        <div className='bg-white p-4 rounded-2xl w-full' key={staff.id}>
                            <div className='flex justify-between items-center mb-2 border-b pb-4'>
                                <div className="flex items-center gap-2">
                                    <div className="text-[#F74F25] flex justify-center items-center w-10 h-10 rounded-full bg-[#FEEDE9]">
                                        <UserRound />
                                    </div>
                                    {staff.staffMember}
                                </div>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Email Address</p>
                                <p className='text-[#121926] text-sm font-bold'>{staff.email}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Phone Number</p>
                                <p className='text-[#121926] text-sm font-bold'>{staff.phoneNumber}</p>
                            </div>
                            <div className='flex justify-between items-start mb-2'>
                                <p className='text-[#9AA4B2]'>Status</p>
                                <Badge
                                    variant="outline"
                                    className={`px-3 py-1 rounded-full font-medium border ${staff.status === 'Active'
                                        ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                        : 'bg-[#E1E1E1] text-[#9AA4B2] border-[#CDD5DF]'
                                        }`}
                                >
                                    {staff.status}
                                </Badge>
                            </div>
                            <div className='flex gap-4 items-center w-full'>
                                <Button onClick={() => router.push(`/dashboard/store-operations/staffs/staff-details/${staff.id}`)} variant={'outline'} className='w-full flex-1 border-[#CDD5DF] border h-11 text-[#9AA4B2]'>
                                    <Eye strokeWidth={1.5} size={24} />
                                </Button>
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