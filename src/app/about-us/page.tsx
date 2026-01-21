import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"

export const metadata: Metadata = {
    title: "About Silver Spoon: A Powerful Fashion Business App",
    description: "Learn more about Silver Spoon, and how we help fashion designers & cobblers with powerful tools to manage their business efficiently."
}

export default function AboutUs() {
    return (
        <>
            <Navbar bgNav="bg-[#F2E9E7]"/>
        </>
    )
}