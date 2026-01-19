import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"

export const metadata: Metadata = {
    title: "Silver Spoon for Cobblers: Tools To Run Your Footwear Business",
    description: "Simplify your cobbler business with Silver Spoon. Take measurements, receive payments, create a digital catalog, and more. All from one easy to use tool.",
}

export default function Cobblers() {
    return (
        <>
            <Navbar />
        </>
    )
}