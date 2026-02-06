import AddNoteModal from "../../../modals/add-note-modal"
import { FileText, MessageSquareMore } from "lucide-react"
import { Edit, Trash } from "../../../../design-operations/svg"

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
    return (
        <div className="bg-white rounded-2xl p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#121926] font-black">Notes</h1>
                <AddNoteModal triggerText="Add Note" />
            </div>
            <div className="grid grid-cols-1 gap-4">
                {notesData.map((note) => (
                    <div className="border border-[#CDD5DF] p-4 rounded-xl" key={note.id}>
                        <div className="flex justify-between items-center">
                            <FileText className="text-[#F74F25]" size={24} strokeWidth={1} />
                            <div className="flex gap-2 items-center text-[#9AA4B2]">
                                <button className="cursor-pointer">
                                    <Edit />
                                </button>
                                <button className="cursor-pointer">
                                    <Trash />
                                </button>
                            </div>
                        </div>
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
        </div>
    )
}