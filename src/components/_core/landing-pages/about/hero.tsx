"use client" 

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import { ArrowRight } from "lucide-react";

export const AboutHero = ({}) => {

  return ( 
        <section className="bg-[#F9F0EE] w-full">
              <div className="mx-auto max-w-7xl px-5 py-30 md:px-8 md:py-30">
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  {/* LEFT */}
                  <div className="space-y-6 md:space-y-8 md:pt-20">
                    {/* Badge */}
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#FDC8BB] px-3 py-1 text-sm font-medium text-[#F74F25]">
                                  <span>Our Story</span>
                                </div>
                    {/* heading */}
                    <h1 className="text-4xl font-black tracking-tight text-[#121926] md:text-[40px]">
                      Empowering <span className="text-[#F74F25]">Fashion Creators</span> <br />
                      To Build Their Dreams 
                    </h1>
        
                    {/* body */}
                    <p className="max-w-xl text-lg leading-relaxed text-[#121926]">
                     Silverspoon was born from a simple observation: talented fashion designers and cobblers often struggle not because of lack of skill, but because of the complexity of running a business. We're here to change that.
                    </p>
                  </div>
        
                  {/* RIGHT */}
                  <div className="relative">
                    {/* Image wrapper */}
                    <div className="relative overflow-hidden rounded-[28px] bg-[#f4f4f5] ">
                      <div className="h-70 relative aspect-4/3 w-full md:aspect-[1.08/1] md:h-96">
                        <Image
                          src={"/images/pngs/fashion-designers.png"}
                          alt={"Fashion designers" }
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
        </section>
    ); 
};