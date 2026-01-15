import { HomeHero } from "@/components/_core/landing-pages/home/hero";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";
import { FashionDesigners } from "@/components/_core/landing-pages/home/fashion-designers";
import Features from "@/components/_core/landing-pages/home/features";
import Footer from "@/components/_core/landing-pages/shared/footer";

const Page = () => {
  return (
    <div className="">
      <Navbar />
      <HomeHero />
      <FashionDesigners />
      <Features />
      <Footer />
    </div>
  );
};

export default Page;
