'use client'

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { MoodboardTabs, TabItem} from './moodboard-tab';
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
} from 'lucide-react';
import { Cookies } from '@/src/components/svg';
import { AddMoodboard } from './add-moodboard';
import { Pin } from '../svg';


const tabs: TabItem[] = [
  { id: "all", label: "All Moodboard", count: 30 },
  { id: "orders", label: "For Orders", count: 30 },
  { id: "customers", label: "For Customers", count: 30 },
  { id: "personal", label: "Personal" },
];

interface MoodboardCardProps {
    id: string;
    title: string;
    description: string;
    designs: number;
    updated: string; 
    owner: string;
}

const MoodboardCard = ({ id, title, description, designs, updated, owner }: MoodboardCardProps) => {
    const router = useRouter();

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        router.push(`/dashboard/design-operations/mood-boards/${id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white cursor-pointer rounded-lg p-6 hover:shadow-sm transition-shadow duration-300 font-sans"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 p-1 flex items-center justify-center">
                    <Cookies />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="text-[#9AA4B2] cursor-pointer hover:text-gray-600 focus:outline-none">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 text-[#9AA4B2] text-base">
                        <DropdownMenuItem>
                            <Edit />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Eye />
                            Preview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Share2 />
                            Share
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

            <div className="flex items-center text-xs text-[#9AA4B2] space-x-2 border-b pb-4">
                <span className="font-bold">{designs}</span>
                <span>Designs</span>
                <span>•</span>
                <span>Last updated {updated}</span>
            </div>
            <div className="flex text-[#F74F25] text-xs items-center pt-4 gap-2">
                <Pin />
                <span>Linked to {owner}</span>
            </div>
        </div>
    );
};

export const MoodboardItems = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const totalPages = 10;

    const designs = [
        { id: "mod-001", title: "Men's Face Cap", description: "Classic baseball caps with designs", designs: 20, updated: "2 hours ago", owner: "Order 3635" },
        { id: "mod-002", title: "Women's Summer Dress", description: "Lightweight floral print dresses", designs: 15, updated: "2 hours ago", owner: "Customer 4521" },
        { id: "mod-003", title: "Kids T-Shirt Collection", description: "Colorful graphic tees for children", designs: 25, updated: "2 hours ago", owner: "Sandra Jones" },
        { id: "mod-004", title: "Men's Face Cap", description: "Premium cotton snapback caps", designs: 18, updated: "2 hours ago", owner: "Order 3635" },
        { id: "mod-005", title: "Unisex Hoodies", description: "Comfortable pullover hoodies", designs: 22, updated: "2 hours ago", owner: "Customer 4521" },
        { id: "mod-006", title: "Women's Accessories", description: "Scarves, bags and jewelry", designs: 30, updated: "2 hours ago", owner: "Sandra Jones" },
        { id: "mod-007", title: "Men's Polo Shirts", description: "Business casual polo collection", designs: 16, updated: "2 hours ago", owner: "Order 3635" },
        { id: "mod-008", title: "Athletic Wear", description: "Performance sportswear line", designs: 28, updated: "2 hours ago", owner: "Customer 4521" },
        { id: "mod-009", title: "Winter Jackets", description: "Insulated outerwear collection", designs: 12, updated: "2 hours ago", owner: "Sandra Jones" },
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
                 {/* tabs */} 
                 <MoodboardTabs tabs={tabs} defaultActiveId="all" />

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Moodboard"
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border h-12 text-gray-600 placeholder:text-[#9AA4B2]"
                        />
                    </div>
                </div>

                {/* Design Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredDesigns.map((design) => (
                        <MoodboardCard key={design.id} {...design} />
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
            {isEmpty && (
                <div className='bg-white h-90 flex items-center justify-center text-center mx-auto rounded-3xl my-6'>
                    <div className=''>
                        <div className='flex justify-center'>
                            <Cookies />
                        </div>
                        <div className='py-6'>
                            <h1 className='text-[#121926] text-lg font-bold mb-2'>No  Moodboard Created Yet</h1>
                            <p className='text-[#9AA4B2] text-sm'>Add your first inspiration</p>
                        </div>
                        <AddMoodboard btnName='Create Moodboard'/>
                    </div>
                </div>
            )}
        </div>
    );
};