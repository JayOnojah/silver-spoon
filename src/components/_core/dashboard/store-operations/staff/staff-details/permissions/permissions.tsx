import { Checkbox } from "@/src/components/ui/checkbox"

export const Permissions = () => {

    return (
        <div className="bg-white p-6 rounded-xl md:w-120 w-full">
            <h1 className="text-[#121926] text-sm font-bold">Permissions</h1>
            <div className="flex flex-col gap-6 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Orders</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Inventory</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Customers</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Store Operations</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Design Operations</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div><div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Wallet</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Marketing</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Analytics</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9AA4B2] text-sm">Finance</span>
                    <Checkbox className="rounded-full border border-[#121926]" />
                </div>
            </div>
        </div>
    )
}