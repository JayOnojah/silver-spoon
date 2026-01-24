import { CatalogueItems } from "@/src/components/_core/dashboard/design-operations/catalogue/catalogue-items";
import { CreateCatalogue } from "@/src/components/_core/dashboard/design-operations/catalogue/create-catalogue";

const Catelogue = () => {
    return (
        <>
            <div className="font-sans flex flex-col md:flex-row justify-between gap-6 md:items-center">
                <div>
                    <h1 className="text-[#121926] text-2xl font-black mb-2">Catalogue</h1>
                    <p className="text-[#9AA4B2]">Organize your designs into beautiful catalogues</p>
                </div>
               <CreateCatalogue btnName="New Catalogue"/>
            </div>
            <CatalogueItems />
        </>
    )
}

export default Catelogue;
