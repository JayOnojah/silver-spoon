import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"
import { CraftsmenHero } from "@/src/components/_core/landing-pages/cobblers/hero"
import { Professionals } from "@/src/components/_core/landing-pages/cobblers/professionals"
import { WorkshopOperations } from "@/src/components/_core/landing-pages/cobblers/workshop-operations"
import { RepairJobs } from "@/src/components/_core/landing-pages/cobblers/repair-jobs"
import { Marketing } from "@/src/components/_core/landing-pages/cobblers/marketing"

export const metadata: Metadata = {
    title: "Silver Spoon for Cobblers: Tools To Run Your Footwear Business",
    description: "Simplify your cobbler business with Silver Spoon. Take measurements, receive payments, create a digital catalog, and more. All from one easy to use tool.",
}

export default function Cobblers() {
    return (
        <>
            <Navbar />
            <CraftsmenHero />
            <Professionals />
            <WorkshopOperations />
            <RepairJobs />
            <Marketing />
        </>
    )
}