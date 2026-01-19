import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"

export const metadata: Metadata = {
    title: "Fashion Designers & Cobblers Business Blog - Silver Spoon",
    description: "Discover fashion business tips and trends on the Silver Spoon Blog. Perfect for fashion designers and cobblers looking to grow and succeed."
}

export default function Blog() {
    return (
        <>
            <Navbar />
        </>
    )
}