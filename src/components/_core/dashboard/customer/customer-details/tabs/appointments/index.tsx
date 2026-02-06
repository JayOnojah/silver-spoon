'use client'

import { useState } from "react"
import { Plus } from "lucide-react"
import { Calendar } from "@/src/components/svg"
import { Button } from "@/src/components/ui/button"

export const Appointments = () => {
    const [appointmentsEmpty, setAppointmentsEmpty] = useState(false); // Simulated state [not used yet]

    return (
        <div className="flex flex-col gap-6 md:w-90 w-full">
            <div className="bg-white p-6 rounded-2xl w-full">
                <h1 className="text-[#121926] font-bold">Appointments</h1>
                <div className="border-[#E9D5FF] bg-[#FAF5FF] p-3 rounded-xl mt-2">
                    <p className="text-[#9AA4B2] text-xs mb-2">Fitting Appointment</p>
                    <p className="text-[#121926] text-sm font-bold">Dec 15, 2025 • 2:00 PM</p>
                </div>
                <button className="text-sm text-[#F74F25] font-bold flex items-center gap-2 mt-4 cursor-pointer">
                    <Plus size={16} />
                    New Appointment
                </button>
            </div>
            {/* Empty State */}
            {appointmentsEmpty && (
                <div className="bg-white p-6 rounded-2xl w-full">
                    <div className="flex justify-center">
                        <Calendar />
                    </div>
                    <h1 className="text-sm text-[#121926] font-bold text-center mt-6 mb-3">No Appointment Yet</h1>
                    <p className="text-[#9AA4B2] text-xs text-center">Upcoming appointments wit your customer will be displayed here</p>
                    <div className="flex justify-center mt-6">
                        <Button className="px-6! bg-[#F74F25] h-12 rounded-xl font-bold">
                            <Plus />
                            New Appointment
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}