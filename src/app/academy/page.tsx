import type { Metadata } from "next"
import { Navbar } from "@/src/components/_core/landing-pages/shared/navbar"
import { HeroAcademy } from "@/src/components/_core/landing-pages/academy/hero"
import VideoTutorial from "@/src/components/_core/landing-pages/academy/video-tutorial"
import FeaturedTutorials from "@/src/components/_core/landing-pages/academy/featured-tutorial"
import Footer from "@/src/components/_core/landing-pages/shared/footer"

export const metadata: Metadata = {
    title: "Silver Spoon Academy For Fashion Designers & Cobblers",
    description: "Silver Spoon Academy offers free educational resources to help fashion designers and cobblers get the most out of the tool."
}

export default function Academy() {
    return (
        <>
            <Navbar bgNav="bg-white"/>
            <HeroAcademy />
            <VideoTutorial />
            <FeaturedTutorials />
            <Footer />
        </>
    )
}