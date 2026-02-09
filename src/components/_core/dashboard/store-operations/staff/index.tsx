import { AllStaff } from "./all-staff"
import { UsersRound } from "lucide-react"
import { CheckPark } from "../svg"

export const StaffManagement = () => {
    return (
        <>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl">
                    <UsersRound className="text-[#F74F25]" size={28} strokeWidth="1.5"/>
                    <h1 className="text-[#121926] font-black text-[20px] py-2">300</h1>
                    <p className="text-[#9AA4B2] text-sm">Total Staff</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                    <CheckPark />
                    <h1 className="text-[#121926] font-black text-[20px] py-2">40</h1>
                    <p className="text-[#9AA4B2] text-sm">Active Today</p>
                </div>
            </div>
            <AllStaff />
        </>
    )
}