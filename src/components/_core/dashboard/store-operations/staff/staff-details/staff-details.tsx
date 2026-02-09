'use client'

import { useRouter } from "next/navigation"
import { StaffOperations } from "./staff-operations"
import {
    User,
    ShoppingBag,
    Cash,
    CheckCircle,
    More
} from "../../../customer/svg"

import {
    Copy,
    Mail,
    Phone,
    MapPin,
    ArrowLeft
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatsCard } from "./static-card"
import { FormatCurrency } from "../../../shared/format-currency"
import { Edit, Trash } from "../../../design-operations/svg"

export const StaffDetails = () => {
    const router = useRouter();

    return (
        <>
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
                <div className="flex justify-between">
                    <div className="w-14 h-14 flex justify-center items-center bg-[#FEEDE9] rounded-full">
                        <User />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-12 h-12 cursor-pointer rounded-full border-2 border-[#CDD5DF] flex justify-center items-center">
                                <More />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 text-[#9AA4B2] text-base">
                            <DropdownMenuItem>
                                <Edit />
                                Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Trash />
                                Delete Customer
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h1 className="text-[#121926] text-2xl font-black mt-4 mb-2">Sarah Jones</h1>
                <div className="flex items-center gap-2">
                    <span className="text-[#9AA4B2] text-xs">ID: EGD6732</span>
                    <Copy strokeLinejoin="round" color="#F74F25" size={16} />
                </div>
                <div className="flex flex-col gap-3 mt-3">
                    <div className="text-[#9AA4B2] gap-1.5 flex items-center text-xs">
                        <Mail size={16} />
                        <span>einstein.oyakhilome1@gmail.com</span>
                    </div>
                    <div className="text-[#9AA4B2] gap-1.5 flex items-center text-xs">
                        <Phone size={16} />
                        <span>0906847344409</span>
                    </div>
                    <div className="text-[#9AA4B2] gap-1.5 flex items-center text-xs">
                        <MapPin size={16} />
                        <span>15 Victoria Island, Lagos</span>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 mt-4 gap-6">
                <StatsCard
                    icon={<ShoppingBag />}
                    value={7}
                    label="Total Orders"
                />
                <StatsCard
                    icon={<Cash />}
                    value={FormatCurrency(120098)}
                    label="Total Revenue"
                />
                <StatsCard
                    icon={<Cash />}
                    value={FormatCurrency(120098)}
                    label="Total Expenditure"
                />
                <StatsCard
                    icon={<CheckCircle />}
                    value={12}
                    label="Total Completed Orders"
                />
            </div>
            <StaffOperations />
        </>
    )
}