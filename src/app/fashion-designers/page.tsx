import { Navbar } from "@/components/_core/landing-pages/shared/navbar" 
import { ForFashionDesignersHero } from "@/components/_core/landing-pages/for-fashion-designers/hero"   
import Footer from "@/components/_core/landing-pages/shared/footer" 
import FashionBusiness from "@/components/_core/landing-pages/for-fashion-designers/fashion-business" 
import { Operations } from "@/components/_core/landing-pages/for-fashion-designers/operations"
import { ManageOrders } from "@/components/_core/landing-pages/for-fashion-designers/manage-orders"
import { Marketing } from "@/src/components/_core/landing-pages/for-fashion-designers/marketing"

export default function Page() {
    return (
        <div className="">
            <Navbar />
            <ForFashionDesignersHero /> 
            <FashionBusiness /> 
            <Operations /> 
            <ManageOrders />
            <Marketing />
            <Footer />
        </div>
    )
}