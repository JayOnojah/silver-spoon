'use client'

import { useState } from "react";

import { ShoppingBag, ShoppingBigBag } from "../../../svg"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormatCurrency } from "../../../../shared/format-currency";
import { Plus } from "lucide-react";
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

interface Orders {
    id: string;
    orderId: string;
    orderDate: string;
    value: number;
    orderStatus: string;
    paymentStatus: string;
}

const orders: Orders[] = [
    {
        id: '1',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
    {
        id: '2',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
    {
        id: '3',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
    {
        id: '4',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
    {
        id: '5',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
    {
        id: '6',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
    {
        id: '7',
        orderId: '#0989GH',
        orderDate: '25 Dec, 20205',
        value: 1200980,
        orderStatus: 'Not Started',
        paymentStatus: 'Not Paid'
    },
];

export const CustomerOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [customerEmpty, setCustomerEmpty] = useState(false);
    const totalPages = 10; // Example total pages

    return (
        <div className="w-full bg-white md:p-6 p-4 rounded-2xl mt-4">
            <div className="bg-[#F9F0EE] p-2 rounded-2xl">
                <div className="bg-white p-4 rounded-xl">
                    <ShoppingBag />
                    <h1 className="text-[#121926] text-[20px] font-black py-1">300</h1>
                    <p className="text-[#9AA4B2] text-sm">Total Items Purchased</p>
                </div>
            </div>
            <div className="w-full lg:bg-white rounded-2xl my-6 font-sans">
                {/* Header */}
                <div>
                    <h1 className="font-bold text-[#000000] mb-6">Orders(5)</h1>
                </div>
                {/*Desktop Table */}
                <div className="hidden border p-4 lg:block border-gray-200 rounded-lg overflow-hidden bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#FFF1EC]/50 hover:bg-[#FFF1EC]/40 border-none">
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 pl-4 rounded-l-4xl">
                                    Order ID
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Order Date
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Value
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2">
                                    Order Status
                                </TableHead>
                                <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 rounded-r-4xl">
                                    Payment Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="border-b border-[#CDD5DF] hover:bg-gray-50"
                                >
                                    <TableCell className="font-medium text-[#121926] py-4">
                                        {order.orderId}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {order.orderDate}
                                    </TableCell>
                                    <TableCell className="text-[#121926] py-4">
                                        {FormatCurrency(order.value)}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 rounded-full font-medium border ${order.orderStatus === 'Started'
                                                ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                                : 'bg-[#DADADA] text-[#9AA4B2] border-[#9AA4B2]'
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 rounded-full font-medium border ${order.paymentStatus === 'Paid'
                                                ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                                : 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                                }`}
                                        >
                                            {order.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* Mobile Table */}
                <div className='lg:hidden flex flex-col gap-4'>
                    {orders.map((order) => (
                        <div className='bg-white p-4 rounded-2xl w-full border' key={order.id}>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Order ID</p>
                                <p className='text-[#121926] text-sm font-bold'>{order.orderId}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Order Date</p>
                                <p className='text-[#121926] text-sm font-bold'>{order.orderDate}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Value</p>
                                <p className='text-[#121926] text-sm font-bold'>{FormatCurrency(order.value)}</p>
                            </div>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='text-[#9AA4B2]'>Order Status</p>
                                <Badge
                                    variant="outline"
                                    className={`px-3 py-1 rounded-full font-medium border ${order.orderStatus === 'Started'
                                        ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                        : 'bg-[#DADADA] text-[#9AA4B2] border-[#9AA4B2]'
                                        }`}
                                >
                                    {order.orderStatus}
                                </Badge>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-[#9AA4B2]'>Payment Status</p>
                                <Badge
                                    variant="outline"
                                    className={`px-3 py-1 rounded-full font-medium border ${order.paymentStatus === 'Paid'
                                        ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                        : 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                        }`}
                                >
                                    {order.paymentStatus}
                                </Badge>
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
            {/* Empty State */}
            {customerEmpty && (
                <div className="w-full py-10">
                    <div className="flex justify-center mb-4">
                        <ShoppingBigBag />
                    </div>
                    <h1 className="text-[#121926] font-bold text-center">No Order Made Yet!</h1>
                    <p className="text-[#9AA4B2] text-sm text-center mt-2">All Purchases made by your customer will be displayed here</p>
                    <div className="flex justify-center mt-6">
                        <Button className="px-6! bg-[#F74F25] h-12 rounded-xl font-bold">
                            <Plus />
                            Create New Order
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}