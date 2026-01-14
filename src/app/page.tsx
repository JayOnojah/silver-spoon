import { HomeHero } from "@/components/_core/landing-pages/home/hero";
import { Navbar } from "@/components/_core/landing-pages/shared/navbar";
import { FashionDesigners } from "@/components/_core/landing-pages/home/fashion-designers";

const Page = () => {
  return (
    <div className="">
      <Navbar />
      <HomeHero />
      <FashionDesigners />
    </div>
  );
};

export default Page;
