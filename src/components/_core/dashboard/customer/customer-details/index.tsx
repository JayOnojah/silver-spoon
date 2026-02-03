'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { User } from "../svg"
import { 
    Copy,
    Mail,
    Phone,
    MapPin
 } from "lucide-react"

export const CustomerDetails = () => {
    const router = useRouter();

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="text-[#0D0D0D] flex gap-2 font-medium items-center rounded-lg cursor-pointer group"
            >
                <ArrowLeft
                    size={16}
                    className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
                />
                Back
            </button>
            <div className="bg-white p-6 rounded-2xl mt-4">
                <div className="w-14 h-14 flex justify-center items-center bg-[#FEEDE9] rounded-full">
                    <User />
                </div>
                <h1 className="text-[#121926] text-2xl font-black mt-4 mb-2">Sarah Jones</h1>
                <div className="flex items-center gap-2">
                    <span className="text-[#9AA4B2] text-xs">ID: EGD6732</span>
                    <Copy strokeLinejoin="round" color="#F74F25" size={16}/>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                    <div className="text-[#9AA4B2] gap-1.5 flex items-center text-xs">
                        <Mail size={16}/>
                        <span>einstein.oyakhilome1@gmail.com</span>
                    </div>
                    <div className="text-[#9AA4B2] gap-1.5 flex items-center text-xs">
                        <Phone size={16}/>
                        <span>0906847344409</span>
                    </div>
                    <div className="text-[#9AA4B2] gap-1.5 flex items-center text-xs">
                        <MapPin size={16}/>
                        <span>15 Victoria Island, Lagos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}