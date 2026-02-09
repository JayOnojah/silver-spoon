import { StaffManagement } from "@/src/components/_core/dashboard/store-operations/staff";
import AddStaffModal from "@/src/components/_core/dashboard/store-operations/staff/add-staff-modal";
const Staff = () => {
    return (
        <>
            <div className="flex items-center justify-between flex-col gap-4 md:flex-row">
                <div className="font-sans">
                    <h1 className="text-[#121926] font-black text-2xl mb-2">Staff Management</h1>
                    <p className="text-[#9AA4B2]">Manage your team members and assignments</p>
                </div>
                <AddStaffModal />
            </div>
            <StaffManagement />
        </>
    )
}

export default Staff;
