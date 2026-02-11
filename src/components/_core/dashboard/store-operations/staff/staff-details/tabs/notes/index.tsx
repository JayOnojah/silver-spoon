'use client'

import { useState } from "react";
import { FileText, MessageSquareMore, Search } from "lucide-react"
import { Input } from "@/src/components/ui/input";

const notesData: notesData[] = [
    {
        id: 1,
        title: "Discussion About Sarah’s Design",
        description: "Brainstorming on possible ideas and concept regarding sarah’s red carpet event",
        comments: 45,
        time: "1 day ago"
    },
    {
        id: 2,
        title: "Measurement Update",
        description: "Updated waist measurement to 28 inches based on recent fitting session",
        comments: 12,
        time: "3 days ago"
    },
    {
        id: 3,
        title: "Moodboard Feedback",
        description: "Client prefers the color palette in the second moodboard but wants to explore more options",
        comments: 8,
        time: "5 days ago"
    }
]

interface notesData {
    id: number;
    title: string;
    description: string;
    comments: number;
    time: string;
}

export const Notes = () => {
    const [isEmptyNote, setIsEmptyNote] = useState(false);

    return (
        <div className="bg-white rounded-2xl p-6 mt-4">
            <div className='flex items-center mb-6 justify-between'>
                <h1 className="font-bold text-[#000000]">Notes</h1>
                <div className="relative md:w-100 w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9AA4B2]" />
                    <Input
                        type="text"
                        placeholder="Search Notes..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg border h-12 text-gray-600 placeholder:text-[#9AA4B2]"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {notesData.map((note) => (
                    <div className="border border-[#CDD5DF] p-4 rounded-xl" key={note.id}>
                        <FileText className="text-[#F74F25]" size={24} strokeWidth={1} />
                        <h1 className="text-sm font-bold text-[#121926] my-2">{note.title}</h1>
                        <p className="text-xs text-[#9AA4B2]">{note.description}</p>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-2 items-center">
                                <MessageSquareMore className="text-[#9AA4B2]" size={20} strokeWidth={1} />
                                <span className="text-sm text-[#9AA4B2] font-bold">{note.comments}</span>
                            </div>
                            <span className="text-[10px] text-[#9AA4B2]">{note.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Empty State */}
            {isEmptyNote && (
                <div className="flex flex-col justify-center items-center py-40">
                    <FileText className="text-[#F74F25]" size={34} strokeWidth={1} />
                    <h1 className="text-[18px] font-bold text-black pt-4 pb-2">No Note Assigned Yet!</h1>
                    <p className="text-[#9AA4B2] text-sm">All notes assigned to this staff will be displayed here</p>
                </div>
            )}
        </div>
    )
}