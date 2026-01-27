'use client'

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Search,
    MoreHorizontal,
    Edit,
    Eye,
    Share2,
    Trash2,
    MessageSquareMore,
    FileText
} from 'lucide-react';
import { Pin } from '../svg';


interface CatalogueCardProps {
    id: string;
    title: string;
    description: string;
    chats: number;
    updated: string;
    owner: string;
}

const NoteCard = ({ id, title, description, chats, updated, owner }: CatalogueCardProps) => {
    const router = useRouter();

    return (
        <div
            className="bg-white cursor-pointer rounded-lg p-6 hover:shadow-sm transition-shadow duration-300 font-sans"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="p-1 flex items-center text-[#F74F25] justify-center">
                    <FileText size={30} strokeWidth={1} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="text-[#9AA4B2] cursor-pointer hover:text-gray-600 focus:outline-none">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 text-[#9AA4B2] text-base">
                        <DropdownMenuItem>
                            <Eye />
                            View Discussions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Trash2 />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <h3 className="text-lg font-semibold text-[#121926] mb-2">{title}</h3>
            <p className="text-sm text-[#9AA4B2] mb-2">{description}</p>

            <div className="flex items-center text-xs text-[#9AA4B2] justify-between border-b pb-4">
                <div className='flex gap-1 font-bold items-center'>
                    <MessageSquareMore />
                    <span>{chats}</span>
                </div>
                <span>{updated}</span>
            </div>
            <div className='flex text-[#F74F25] text-xs items-center pt-4 gap-2'>
                <Pin />
                <span>Linked to {owner}</span>
            </div>
        </div>
    );
};

export const NoteItems = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const totalPages = 10;

    const designs = [
        {
            id: "cat-001",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 0,
            updated: "2 hours ago",
            owner: "Sandra James"
        },
        {
            id: "cat-002",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 45,
            updated: "2 hours ago",
            owner: "Sandra Olu"
        },
        {
            id: "cat-003",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 30,
            updated: "2 hours ago",
            owner: "Order 4857"
        },
        {
            id: "cat-004",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 30,
            updated: "2 hours ago",
            owner: "Faith James"
        },
        {
            id: "cat-005",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 40,
            updated: "2 hours ago",
            owner: "Mark Johnson"
        },
        {
            id: "cat-006",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 30,
            updated: "2 hours ago",
            owner: "David Mark"
        },
        {
            id: "cat-007",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 37,
            updated: "2 hours ago",
            owner: "Sandra Olu"
        },
        {
            id: "cat-008",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 30,
            updated: "2 hours ago",
            owner: "Sandra Olu"
        },
        {
            id: "cat-009",
            title: "Discussion About Sarah’s Design",
            description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event ",
            chats: 45,
            updated: "2 hours ago",
            owner: "Flora Oku"
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // Wait 300ms after user stops typing

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredDesigns = useMemo(() => {
        // Use debouncedQuery instead of searchQuery
        if (!searchQuery.trim()) {
            return designs;
        }

        return designs.filter((design) =>
            design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            design.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [debouncedQuery, designs]);

    return (
        <div className="min-h-screen bg-[#FFF1EC] pt-5 font-sans">
            <div className="">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search notes..."
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border h-12 text-gray-600 placeholder:text-[#9AA4B2]"
                        />
                    </div>
                </div>

                {/* Design Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredDesigns.map((design) => (
                        <NoteCard key={design.id} {...design} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="grid grid-cols-3 w-full items-center">
                    <p className="text-sm text-[#121926]">Page {currentPage} of {totalPages}</p>
                    <div className='flex justify-center gap-2'>
                        {[1, 2, 3].map((page) => (
                            <PaginationItem key={page} className="list-none">
                                <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                    className={`cursor-pointer border-none rounded-full ${currentPage === page
                                        ? 'bg-[#F74F25] text-white hover:bg-[#f54317] hover:text-white'
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
                                        ? 'bg-[#F74F25] text-white hover:bg-[#f6390a] hover:text-white'
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
            {isEmpty && (
                <div className='bg-white h-90 flex items-center justify-center text-center mx-auto rounded-3xl my-6'>
                    <div className=''>
                        <div className='flex justify-center'>
                            <FileText size={50} strokeWidth={1} className='text-[#F74F25]' />
                        </div>
                        <div className='py-6'>
                            <h1 className='text-[#121926] text-lg font-bold mb-2'>No  Note Created Yet</h1>
                            <p className='text-[#9AA4B2] text-sm'>Add notes and collaborate with team members</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};