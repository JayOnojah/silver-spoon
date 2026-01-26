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


import { Plus } from 'lucide-react';

interface AddMoodboardModalProps {
    btnName: string;
}

export const AddMoodboard = ({btnName }: 
    AddMoodboardModalProps) => {
    const [open, setOpen] = useState(false);
   
    

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
                            Add Moodboard
                        </DialogTitle>
                        <p className="text-sm text-[#9AA4B2]">
                            source
                        </p>
                    </DialogHeader>

                </div>
            </DialogContent>
        </Dialog>
    );
};