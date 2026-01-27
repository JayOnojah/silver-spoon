'use client'

import { useState } from 'react';
import {
    Share2,
    ChevronLeft,
    ChevronRight,
    Facebook,
    Instagram,
    Twitter,
    Check,
    ZoomIn,
    X
} from 'lucide-react';
import { ShareLink } from './share-link';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';

const CollectionPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const totalPages = 10;
    const designsPerPage = 8;

    // Mock data - replace with actual API call using params.id
    const collection = {
        title: "Men's Face Cap",
        description: "Collection description here",
        totalDesigns: 20,
        images: Array(20).fill('/images/pngs/catalogue-detail-img.png')
    };

    const toggleImageSelection = (index: number) => {
        const newSelected = new Set(selectedImages);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedImages(newSelected);
    };

    const openZoom = (image: string) => {
        setZoomedImage(image);
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    const currentImages = collection.images.slice(
        (currentPage - 1) * designsPerPage,
        currentPage * designsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <span className="font-semibold text-gray-900">LOGO</span>
                        </div>
                        <ShareLink
                            btnShare={
                                <Button 
                                className={`flex h-12 items-center space-x-2 px-4 py-2 text-white rounded-md transition-colors ${selectedImages.size > 0 ? 'bg-[#121926] hover:bg-[#121926]/90' : 'bg-[#121926]/50 hover:bg-gray-500'}`}
                                >
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-sm font-medium">Send ({selectedImages.size}) To Vendor</span>
                                </Button>
                            }
                            selectedImageCount={selectedImages.size}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Collection Info */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-[#121926] mb-2">
                        {collection.title}
                    </h1>
                    <p className="text-[#9AA4B2] text-sm mb-1">{collection.description}</p>
                    <p className="text-[#9AA4B2] text-xs"><span className='font-bold'>{collection.totalDesigns}</span> Designs</p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {currentImages.map((image, index) => {
                        const globalIndex = (currentPage - 1) * designsPerPage + index;
                        const isSelected = selectedImages.has(globalIndex);

                        return (
                            <div
                                key={index}
                                className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-4/3 group"
                            >
                                <Image
                                    src={image}
                                    alt={`Design ${globalIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    height={400}
                                    width={400}
                                />

                                {/* Blur overlay when selected */}
                                {isSelected && (
                                    <div className="absolute inset-0  bg-[#CDD5DF]/50 backdrop-blur-xs"></div>
                                )}

                                {/* Selection checkbox - top right */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleImageSelection(globalIndex);
                                    }}
                                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}
                                    style={{
                                        backgroundColor: isSelected ? '#374151' : 'white'
                                    }}
                                >
                                    {isSelected ? (
                                        <Check className="w-5 h-5 text-white" />
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                                    )}
                                </button>

                                {/* Zoom button - bottom right */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openZoom(image);
                                    }}
                                    className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 z-10"
                                >
                                    <ZoomIn className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        );
                    })}
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center space-x-2">
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Zoom Modal */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeZoom}
                >
                    <button
                        onClick={closeZoom}
                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
                    >
                        <X className="w-6 h-6 text-gray-900" />
                    </button>
                    <img
                        src={zoomedImage}
                        alt="Zoomed design"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-700 rounded-full mb-6"></div>
                        <div className="flex items-center space-x-4 mb-8">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="w-full h-px bg-gray-800 mb-6"></div>
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()}, John Stiches. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CollectionPage;