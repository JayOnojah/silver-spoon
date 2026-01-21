import { Navbar } from "@/components/_core/landing-pages/shared/navbar"; 
import { ForFashionDesignersHero } from "@/components/_core/landing-pages/for-fashion-designers/hero";   
import Footer from "@/components/_core/landing-pages/shared/footer"; 
import FashionBusiness from "@/components/_core/landing-pages/for-fashion-designers/fashion-business"; 
import { FeatureList } from "@/components/_core/landing-pages/shared/features-list";
import { Operations } from "@/components/_core/landing-pages/for-fashion-designers/operations";
import { ManageOrders } from "@/components/_core/landing-pages/for-fashion-designers/manage-orders";
import { Marketing } from "@/src/components/_core/landing-pages/for-fashion-designers/marketing"; 
import { Finance } from "@/components/_core/landing-pages/for-fashion-designers/finance"; 
import type { Metadata } from "next";
import { FAQ } from "@/components/_core/landing-pages/for-fashion-designers/faq";

export const metadata: Metadata = {
    title: "Silver Spoon for Fashion Designers: Run Your Business With Ease.",
    description: "Take measurements, orders, create invoices, online store, receive payments, create digital catalogue and more all in one fashion business app.",
}

export default function Page() {
    return (
        <div className="">
            <Navbar />
            <ForFashionDesignersHero /> 
            <FashionBusiness /> 
            <Operations /> 
            <ManageOrders />
            <Marketing /> 
            <Finance /> 
            <FeatureList bgColor="bg-[#F9F0EE]"/> 
            <FAQ />
            <Footer />
        </div>
    )
}