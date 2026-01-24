import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, Palette, Eye, Share2, Edit2, Upload } from 'lucide-react';

interface AddDesignModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    catalogueData?: {
        name: string;
        description: string;
        designCount: number;
    };
    onSubmit?: (file: File) => void;
}

export const AddDesignModal: React.FC<AddDesignModalProps> = ({
    open,
    onOpenChange,
    catalogueData = {
        name: "Men's Face Cap",
        description: "Description",
        designCount: 0
    },
    onSubmit
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (selectedFile && onSubmit) {
            onSubmit(selectedFile);
            setSelectedFile(null);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 gap-0 rounded-3xl border-0 font-sans">
                <div className="relative">
                    {/* Header */}
                    <DialogHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between space-y-0">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-semibold">Back</span>
                        </button>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="text-gray-900 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </DialogHeader>

                    <div className="px-6">
                        <DialogTitle className="text-2xl font-black text-[#121926] mb-6">
                            Add Design to Catalogue
                        </DialogTitle>

                        {/* Catalogue Card */}
                        <div className="bg-[#FFE8E0] rounded-2xl p-5 mb-6 relative">
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                                    Preview
                                </div>
                                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <Share2 className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                                    <Palette className="w-6 h-6 text-[#F74F25]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                                        {catalogueData.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-2">
                                        {catalogueData.description}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {catalogueData.designCount} Designs
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Upload Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Upload Image(s)<span className="text-[#F74F25]">*</span>
                            </label>

                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragActive
                                        ? 'border-[#F74F25] bg-orange-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                        <Upload className="w-10 h-10 text-gray-400" />
                                    </div>

                                    <div className="text-sm">
                                        <label
                                            htmlFor="file-upload"
                                            className="text-[#F74F25] font-semibold cursor-pointer hover:text-[#F74F25]/80 transition-colors"
                                        >
                                            Click to upload
                                        </label>
                                        <span className="text-gray-600"> or drag & drop your</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        files here (Image size 500 x 500)
                                    </p>

                                    {selectedFile && (
                                        <div className="mt-4 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-lg">
                                            Selected: {selectedFile.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedFile}
                            className="w-full bg-[#F74F25] hover:bg-[#F74F25]/90 text-white rounded-2xl h-12 font-bold mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add Designs
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};