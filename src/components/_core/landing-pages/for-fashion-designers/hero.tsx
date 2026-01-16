"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scissors, PlayIcon, Star, ArrowRight } from "lucide-react";

export const ForFashionDesignersHero = ({}) => {

  return (
    <section className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-30">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT */}
          <div className="space-y-6 md:space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FEEDE9] px-4 py-2 text-sm font-medium text-[#F74F25]">
              <Scissors className="h-4 w-4" />
              <span>For Fashion Designers</span>
            </div>

            {/* heading */}
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#121926] md:text-[56px]">
              Run Your
              Fashion <br />
              Business Like a <br />
              <span className="text-[#F74F25]">Modern Brand</span>
            </h1>

            {/* body */}
            <p className="max-w-xl text-lg leading-relaxed text-[#121926] md:text-xl">
              From measurements to marketing. We gives you everything you need to manage customers,
              process orders, and grow your fashion brand professionally.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-6 md:flex-row sm:items-center">

          <Button 
            className="bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-52 text-white h-12 font-bold">
            
            <Link href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap"> 
            Get Started For Free 
            <ArrowRight className="ml-2 h-4 w-4" /> 
            </Link>
          </Button>

          <Button 
          variant="outline" 
          className="text-[#121926] h-12 md:w-42 font-bold bg-transparent border-[#121926] hover:bg-[#121926]/3">
            <Link href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
            <PlayIcon className="mr-2 h-4 w-4" /> 
            Watch Demo 
            </Link>
          </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* Image wrapper */}
            <div className="relative overflow-hidden rounded-[28px] bg-[#f4f4f5] ">
              <div className="relative aspect-4/3 w-full md:aspect-[1.08/1]">
                <Image
                  src={"/images/pngs/fashion.png"}
                  alt={"Fashion designer in studio" }
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Trust card overlay */}
            <div className="absolute -bottom-6 left-4 right-4 rounded-xl bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:left-[-30] md:right-auto md:min-w-70">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFEDEA]">
                  <Star className="h-6 w-6 text-[#F74F25]" />
                </div>

                <div className="leading-tight">
                  <p className="text-lg font-extrabold text-[#121926]">Trusted by 2000+</p>
                  <p className="text-sm font-medium text-[#121926]/45">Fashion Designers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
