import { HomeHero } from "@/components/_core/landing-pages/home/hero";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";
import { FashionDesigners } from "@/components/_core/landing-pages/home/fashion-designers";
import Features from "@/components/_core/landing-pages/home/features";
import Footer from "@/components/_core/landing-pages/shared/footer";
import { FeatureList } from "@/components/_core/landing-pages/shared/features-list";
import { Testimonials } from "@/components/_core/landing-pages/home/testimonials";
import { ScaleBusiness } from "@/components/_core/landing-pages/home/scale-business";

const Page = () => {
  return (
    <div className="">
      <Navbar />
      <HomeHero />
      <FashionDesigners />
      <Features />
      <FeatureList />
      <Testimonials />
      <ScaleBusiness />
      <Footer />
    </div>
  );
};

export default Page;
