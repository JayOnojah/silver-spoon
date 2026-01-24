'use client'

import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';

import { Plus } from 'lucide-react';

interface CreateCatalogueModalProps {
    onSubmit?: (data: { name: string; description: string }) => void;
    btnName: string;
}

export const CreateCatalogue = ({ onSubmit, btnName }: CreateCatalogueModalProps) => {
    const [open, setOpen] = useState(false);
    const [catalogueName, setCatalogueName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (catalogueName.trim() && description.trim()) {
            onSubmit?.({ name: catalogueName, description });

            setCatalogueName('');
            setDescription('');
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#F74F25] text-white rounded-2xl h-12 font-bold font-sans">
                    <Plus />
                    {btnName}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-140 p-0 gap-0 rounded-4xl border font-sans">
                <div className="relative">
                    <DialogHeader className="md:px-10 px-4 md:pt-8 pt-4 text-start">
                        <DialogTitle className="text-2xl font-black text-[#121926]">
                            Create Catalogue
                        </DialogTitle>
                        <p className="text-sm text-[#9AA4B2]">
                            Please provide name and description of your catalogue
                        </p>
                    </DialogHeader>

                    <div className="md:px-8 px-4 py-6">
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="catalogue-name" className="block font-medium text-[#4B5565] mb-2">
                                    Catalogue Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="catalogue-name"
                                    type="text"
                                    value={catalogueName}
                                    onChange={(e) => setCatalogueName(e.target.value)}
                                    placeholder="Enter Catalogue Name"
                                    className="w-full px-4 py-3 rounded-[14px] border h-12 border-[#CDD5DF] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description" className="block font-medium text-[#4B5565] mb-2">
                                    Description <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type here..."
                                    rows={5}
                                    className="w-full px-4 py-3 border border-[#CDD5DF] rounded-[14px] h-40 focus:border-transparent resize-none transition-all"
                                />
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={!catalogueName || !description}
                                className="bg-[#F74F25] w-full text-white rounded-2xl h-12 font-bold font-sans hover:bg-[#F74F25]/90 disabled:opacity-50 disabled:cursor-not-allowed">
                                Create Catalogue
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};