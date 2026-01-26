import { MoodboardItems } from "@/src/components/_core/dashboard/design-operations/catalogue/moodboard-items";
import { AddMoodboard } from "@/src/components/_core/dashboard/design-operations/catalogue/add-moodboard";

const Moodboard = () => {
    return (
        <>
            <div className="font-sans flex flex-col md:flex-row justify-between gap-6 md:items-center">
                <div>
                    <h1 className="text-[#121926] text-2xl font-black mb-2">Moodboards</h1>
                    <p className="text-[#9AA4B2]">Organize your inspiration boards for your projects and customers</p>
                </div>
               <AddMoodboard btnName="New Moodboard"/>
            </div>
            <MoodboardItems />
        </>
    )
}

export default Moodboard;
