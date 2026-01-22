import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { CatalogueItems } from "@/src/components/_core/dashboard/design-operations/catalogue/catalogue-items";

const Catelogue = () => {
    return (
        <>
            <div className="font-sans flex flex-col md:flex-row justify-between gap-6 md:items-center">
                <div>
                    <h1 className="text-[#121926] text-2xl font-black mb-2">Catalogue</h1>
                    <p className="text-[#9AA4B2]">Organize your designs into beautiful catalogues</p>
                </div>
                <Button className="bg-[#F74F25] text-white rounded-2xl h-12 font-bold">
                    <Plus/>
                    New Catalogue
                </Button>
            </div>
            <CatalogueItems />
        </>
    )
}

export default Catelogue;
