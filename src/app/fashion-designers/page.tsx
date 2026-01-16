import { Navbar } from "@/components/_core/landing-pages/shared/navbar" 
import { ForFashionDesignersHero } from "@/components/_core/landing-pages/for-fashion-designers/hero"   
import Footer from "@/components/_core/landing-pages/shared/footer"

export default function Page() {
    return (
        <div className="">
            <Navbar />
            <ForFashionDesignersHero />
            <Footer />
        </div>
    )
}