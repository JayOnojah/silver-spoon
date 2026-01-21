import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"; 
import { AboutHero } from "@/src/components/_core/landing-pages/about/hero";
import Footer from "@/src/components/_core/landing-pages/shared/footer";
import { Mission } from "@/src/components/_core/landing-pages/about/mission";

export const metadata: Metadata = {
    title: "About Silver Spoon: A Powerful Fashion Business App",
    description: "Learn more about Silver Spoon, and how we help fashion designers & cobblers with powerful tools to manage their business efficiently."
}

export default function AboutUs() {
    return (
        <>
            <Navbar />
            <AboutHero />
            <Mission />
            <Footer />
        </>
    )
}