import NoteTabs from "@/src/components/_core/dashboard/design-operations/note/note-tabs";
import { NoteItems } from "@/src/components/_core/dashboard/design-operations/note/note-items";

const Note = () => {
    return (
        <>
            <div className="font-sans">
                <h1 className="text-[#121926] text-2xl font-black mb-6">Notes</h1>
                <NoteTabs />
                <NoteItems />
            </div>
        </>
    )
}

export default Note;