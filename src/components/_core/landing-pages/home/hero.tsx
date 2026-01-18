'use client'

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import gsap from "gsap"

import {
  ArrowRight,
  PlayIcon,
} from "lucide-react"

import {
  FlashIcon,
  BasketIcon,
  GlobeIcon
} from "@/components/svg"

export const HomeHero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power6.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <>
      <div className="bg-[#F9F0EE] w-full pt-30 px-4 md:px-8 overflow-x-hidden">
        <div className="lg:w-[94%] mx-auto">
          <div className="flex justify-center">
            <Badge className="bg-[#FDC8BB] text-[#F74F25]">
              The #1 Platform for Creators 🚀
            </Badge>
          </div>
          <h1 className="text-[#121926] font-black pb-6 pt-2 md:text-[56px] text-4xl text-center md:leading-18">
            Transform Your {" "}
            <span className="text-[#F74F25]">Fashion Business</span><br />
            with Smart Tools
          </h1>
          <p className="text-[18px] text-[#121926] text-center mx-auto md:max-w-150 pb-6">Whether you're a fashion designer or cobbler, manage orders, manage Customers, track finances, build your brand, and scale your business—all from one powerful tool.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button className="bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-52 text-white h-12 font-bold">
              Get Started For Free <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" className="text-[#121926] h-12 md:w-42 font-bold bg-transparent border-[#121926] hover:bg-[#121926]/3">
              <PlayIcon className="mr-2" /> Watch Demo
            </Button>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-6 items-center pt-6">
            <div className="flex items-center gap-3">
              <FlashIcon />
              <span className="text-[18px] text-[#121926]">Quick Start in 10 min</span>
            </div>
            <div className="flex items-center gap-3">
              <BasketIcon />
              <span className="text-[18px] text-[#121926]">Manage Orders Seamlessly</span>
            </div>
            <div className="flex items-center gap-3">
              <GlobeIcon />
              <span className="text-[18px] text-[#121926]">Free website</span>
            </div>
          </div>
          <div ref={imageRef} className="w-full pt-5 md:pt-0">
            <Image
              src='/images/pngs/home-frame.png'
              alt="home-frame"
              width={1280}
              height={744}
              className="w-full"
            />
          </div>
        </div>
      </div>

    </>
  )
}
