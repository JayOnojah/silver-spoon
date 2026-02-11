'use client'

import { useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Alarm } from '../../../../svg';
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

interface TaskTodos {
    id: string;
    title: string;
    description: string;
}

const taskTodos: TaskTodos[] = [
    {
        id: '1',
        title: 'Obi’s Cap',
        description: 'Create the dimensions for the Mr Obi’s Cap. And confirm with the Vendor and can extend to the next line',
    },
    {
        id: '2',
        title: 'Obi’s Cap',
        description: 'Create the dimensions for the Mr Obi’s Cap. And confirm with the Vendor and can extend to the next line',
    },
    {
        id: '3',
        title: 'Obi’s Cap',
        description: 'Create the dimensions for the Mr Obi’s Cap. And confirm with the Vendor and can extend to the next line',
    },
    {
        id: '4',
        title: 'Obi’s Cap',
        description: 'Create the dimensions for the Mr Obi’s Cap. And confirm with the Vendor and can extend to the next line',
    },
    {
        id: '5',
        title: 'Obi’s Cap',
        description: 'Create the dimensions for the Mr Obi’s Cap. And confirm with the Vendor and can extend to the next line',
    },
    {
        id: '6',
        title: 'Obi’s Cap',
        description: 'Create the dimensions for the Mr Obi’s Cap. And confirm with the Vendor and can extend to the next line',
    },
];



export const TaskTodos = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isEmptyTodo, setIsEmptyTodo] = useState(false);
    const totalPages = 10; // Example total pages

    return (
        <div className="w-full lg:bg-white rounded-2xl my-6 font-sans p-6">
            {/* Header */}
            <div className='flex items-center mb-6 justify-between'>
                <h1 className="font-bold text-[#000000]">Task & Todos (5)</h1>
                <div className="relative md:w-100 w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                    <Input
                        type="text"
                        placeholder="Search Task & Todos..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg border h-12 text-gray-600 placeholder:text-[#9AA4B2]"
                    />
                </div>
            </div>
            {/*Desktop Table */}
            <div className="hidden border p-4 lg:block border-gray-200 rounded-lg overflow-hidden bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#FFF1EC]/50 hover:bg-[#FFF1EC]/40 border-none">
                            <TableHead className="text-[#9AA4B2] flex items-end! gap-3 font-bold text-sm py-2 rounded-l-xl">
                                <Checkbox className='size-6' />
                                Task Title
                            </TableHead>
                            <TableHead className="text-[#9AA4B2] font-bold text-sm py-2 rounded-r-xl">
                                Task Description
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {taskTodos.map((todo) => (
                            <TableRow
                                key={todo.id}
                                className="border-b border-[#CDD5DF] hover:bg-gray-50"
                            >
                                <TableCell className="font-medium text-[#121926] py-4 flex items-end gap-3">
                                    <Checkbox className='size-6' />
                                    {todo.title}
                                </TableCell>
                                <TableCell className="text-[#121926] wrap-break-words whitespace-normal max-w-xs">
                                    {todo.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Mobile Table */}
            <div className='lg:hidden flex flex-col gap-4'>
                {taskTodos.map((todo) => (
                    <div className='bg-white p-4 rounded-2xl w-full border' key={todo.id}>
                        <div className='mb-4'>
                            <Checkbox className='size-6' />
                            <p className='text-[#9AA4B2]'>Task Title</p>
                            <p className='text-[#121926] text-sm font-bold'>{todo.title}</p>
                        </div>
                        <div className='mb-2'>
                            <Checkbox className='size-6' />
                            <p className='text-[#9AA4B2]'>Task Description</p>
                            <p className='text-[#121926] text-sm font-bold'>{todo.description}</p>
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
            {isEmptyTodo && (
                <div className="flex flex-col justify-center items-center py-40">
                    <Alarm />
                    <h1 className="text-[18px] font-bold text-black pt-4 pb-2">No Tasks Assigned Yet!</h1>
                    <p className="text-[#9AA4B2] text-sm">All tasks assigned to this staff will be displayed here</p>
                </div>
            )}
        </div>
    )
}