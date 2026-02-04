import { AddMoodboard } from "../../../../design-operations/moodboard/add-moodboard";
import { Plus, Palette, Eye } from "lucide-react"
import { Trash } from "../../../../design-operations/svg"

interface MoodboardItems {
    id: number;
    title: string;
    description: string;
}

const moodboardItems: MoodboardItems[] = [
    { id: 1, title: "Men’s Face Cap", description: "Description" },
    { id: 2, title: "Summer Dress", description: "Description" },
    { id: 3, title: "Casual Shirt", description: "Description" },
]

export const Moodboard = () => {
    return (
        <div className="bg-white p-6 rounded-2xl mt-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#121926] font-bold">Moodboard</h1>
                <AddMoodboard btnName="Add MoodBoard" btnStyle="bg-transparent! text-[#F74F25] text-sm font-bold"/>
            </div>
            {moodboardItems.map((item) => (
                <div className="border border-[#CDD5DF] p-4 rounded-xl mb-4" key={item.id}>
                    <div className="flex justify-between items-center mb-4">
                        <Palette className="text-[#F74F25]" size={24} />
                        <button className="cursor-pointer">
                            <Trash />
                        </button>
                    </div>
                    <h1 className="text-[#121926] font-bold text-sm">{item.title}</h1>
                    <p className="text-[#9AA4B2] text-xs mt-1 mb-3">{item.description}</p>
                    <button className="text-[#F74F25] text-sm flex items-center gap-1 cursor-pointer">
                        Preview
                        <Eye size={20}/>
                    </button>
                </div>
            ))}
        </div>
    )
}