import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"

export const metadata: Metadata = {
    title: "Silver Spoon Academy For Fashion Designers & Cobblers",
    description: "Silver Spoon Academy offers free educational resources to help fashion designers and cobblers get the most out of the tool."
}

export default function Academy() {
    return (
        <>
            <Navbar />
        </>
    )
}