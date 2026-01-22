'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
    ArrowLeft,
    Plus,
    Eye,
    Share2,
    Edit,
    Trash2
} from 'lucide-react';
import { Cookies } from '@/src/components/svg';

interface DesignImage {
    id: string;
    imageUrl: string;
}

export const CatalogueDetails = () => {
    const router = useRouter();
    const [designs] = useState<DesignImage[]>(
        Array(8).fill(null).map((_, i) => ({
            id: `design-${i + 1}`,
            imageUrl: '/images/pngs/catalogue-detail-img.png'
        }))
    );

    return (
        <div className="min-h-screen bg-[#FFF1EC] pb-8 font-sans">
            <div className="mb-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center cursor-pointer gap-2 text-[#121926] mb-6 hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-base font-medium">Back</span>
                </button>

                <div className="flex justify-between flex-col md:flex-row gap-6 md:items-center mb-8">
                    <h1 className="text-2xl font-black text-[#121926]">Catalogue Details</h1>
                    <div className="flex items-center justify-end gap-3 w-full flex-1">
                        <Button className="bg-[#F74F25] w-full md:w-40 hover:bg-[#E63E15] text-white rounded-xl px-6 h-12 font-semibold shadow-sm">
                            <Plus className="w-5 h-5" />
                            New Images
                        </Button>
                    </div>
                </div>

                {/* Catalogue Info Card */}
                <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 p-1 flex items-center justify-center">
                                <Cookies />
                            </div>

                        </div>
                        {/* Action Icons */}
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                                <Eye className="w-5 h-5 text-[#9AA4B2]" />
                            </button>
                            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                                <Share2 className="w-5 h-5 text-[#9AA4B2]" />
                            </button>
                            <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                                <Edit className="w-5 h-5 text-[#9AA4B2]" />
                            </button>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h2 className="font-bold text-[#121926] mb-1">Men's Face Cap</h2>
                        <p className="text-sm text-[#9AA4B2] mb-2">Description</p>
                        <p className="text-xs text-[#9AA4B2]">
                            <span className="font-semibold">8 Designs</span> • Last updated 2 hours ago
                        </p>
                    </div>
                </div>
            </div>

            {/* All Designs Section */}
            <div>
                <h3 className="text-xl font-bold text-[#121926] mb-6">All Designs</h3>

                {/* Design Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {designs.map((design) => (
                        <div
                            key={design.id}
                            className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Image Container */}
                            <div className="aspect-4/5 bg-gray-100 relative">
                                <Image
                                    className='w-full object-cover h-full'
                                    src={design.imageUrl}
                                    alt='detail-img'
                                    width={272}
                                    height={272}
                                />
                                <button className="absolute cursor-pointer top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                                    <Trash2 className="w-4 h-4 text-[#9AA4B2] hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};