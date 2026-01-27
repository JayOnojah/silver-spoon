import { useState } from 'react';

import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { 
    ArrowLeft, 
    Eye, 
    Share2, 
    Edit, 
    Plus 
} from 'lucide-react';
import { Cookies } from '@/src/components/svg';
import { ImageIcon } from '../svg';

interface AddDesignProps {
    onSubmit?: (file: File) => void;
    btnName: string;
}

export const AddDesign = ({ onSubmit, btnName}: AddDesignProps) => {
    const [open, setOpen] = useState(false);
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
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#F74F25] w-full md:w-36 text-white rounded-2xl h-12 font-bold font-sans hover:bg-[#F74F25]/90">
                    <Plus className="w-5 h-5" />
                    {btnName}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl border-0 font-sans">
                <div className="relative">
                    {/* Header */}
                    <DialogHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between space-y-0">
                        <button
                            onClick={() => setOpen(false)}
                            className="flex text-sm items-center gap-2 cursor-pointer text-[#0D0D0D] hover:text-gray-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-semibold">Back</span>
                        </button>

                    </DialogHeader>

                    <div className="px-6">
                        <DialogTitle className="text-2xl font-black text-[#121926] mb-6">
                            Add Design to Catalogue
                        </DialogTitle>

                        {/* Catalogue Card */}
                        <div className="bg-[#FEEDE9] rounded-2xl p-5 mb-6 relative">
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <button className="w-8 h-8 rounded-full flex items-center cursor-pointer justify-center hover:text-gray-500 transition-colors text-[#9AA4B2]">
                                    <Eye className="w-5 h-5 " />
                                </button>
                                <button className="w-8 h-8 rounded-full flex items-center cursor-pointer justify-center hover:text-gray-500 transition-colors text-[#9AA4B2]">
                                    <Share2 className="w-5 h-5 " />
                                </button>
                                <button className="w-8 h-8 rounded-full flex items-center cursor-pointer justify-center hover:text-gray-500 transition-colors text-[#9AA4B2]">
                                    <Edit className="w-5 h-5 " />
                                </button>
                            </div>

                            <div className="">
                                <div className="w-8 h-8 flex items-center justify-center mb-4">
                                    <Cookies />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#121926] text-lg">
                                        Men's Face Cap
                                    </h3>
                                    <p className="text-[#9AA4B2] text-sm mb-1">
                                        Description
                                    </p>
                                    <p className="text-[#9AA4B2] text-xs">
                                        0 Designs
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Upload Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Upload Image(s)<span className="text-[#F74F25]">*</span>
                            </label>

                            <label
                                htmlFor="file-upload"
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer block ${dragActive
                                    ? 'border-[#F74F25] bg-orange-50'
                                    : 'border-gray-300 bg-white hover:border-[#F74F25] hover:bg-orange-50/50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <div className="flex flex-col items-center justify-center pointer-events-none">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                       <ImageIcon />
                                    </div>

                                    <div className="text-sm">
                                        <span className="text-[#F74F25] font-semibold">
                                            Click to upload
                                        </span>
                                        <span className="text-gray-600"> or drag & drop your</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        files here (Image size 500 x 500)
                                    </p>

                                    {selectedFile && (
                                        <div className="mt-4 text-sm text-gray-700 bg-[#F74F25]/10 px-4 py-2 rounded-lg">
                                            Selected: {selectedFile.name}
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>

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