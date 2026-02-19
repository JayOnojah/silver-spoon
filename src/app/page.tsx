import type { Metadata } from "next";
import Footer from "@/components/_core/landing-pages/shared/footer";
import { FAQ } from "@/src/components/_core/landing-pages/home/faq";
import { HomeHero } from "@/components/_core/landing-pages/home/hero";
import Features from "@/components/_core/landing-pages/home/features";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";
import { Pricing } from "@/components/_core/landing-pages/home/pricing";
import { Journey } from "@/src/components/_core/landing-pages/home/journey";
import { Testimonials } from "@/components/_core/landing-pages/home/testimonials";
import { FeatureList } from "@/components/_core/landing-pages/shared/features-list";
import { ScaleBusiness } from "@/components/_core/landing-pages/home/scale-business";
import { FashionDesigners } from "@/components/_core/landing-pages/home/fashion-designers";
import { AcademicResource } from "@/components/_core/landing-pages/home/academic-resource";

export const metadata: Metadata = {
  title: "Silver Spoon: Fashion Designers & Cobblers Business Tool.",
  description:
    "All-in-one tool to manage your fashion designers or cobblers business. Take measurements, digital catalogue, mood boards, invoicing, website, and more.",
};

const Page = () => {
  return (
    <>
      <Navbar bgNav="bg-[#F9F0EE]" />
      <HomeHero />
      <FashionDesigners />
      <Features />
      <FeatureList />
      <Testimonials />
      <ScaleBusiness />
      <AcademicResource />
      <Pricing />
      <FAQ />
      <Journey />
      <Footer />
    </>
  );
};

export default Page;
