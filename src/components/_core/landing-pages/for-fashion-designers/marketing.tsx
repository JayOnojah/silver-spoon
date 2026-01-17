"use client";

import Image from "next/image"; 
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Volume2 , Tag} from "lucide-react"; 
import { CardBox } from '../shared/card-box' 
import { GlobeIcon} from '@/components/svg';     

export const Marketing = ({}) => {

const operationsCard = [
        {
            icons: <GlobeIcon />,
            title: 'Website & Online Store',
            label: 'Launch your professional fashion website in minutes.',
        },
        {
            icons: <Volume2 />,
            title: 'Marketing Integration',
            label: 'Connect with social media and email marketing tools.',
        },
        {
            icons: <Heart />,
            title: 'Customer Relations',
            label: 'Build lasting relationships with personalized communication.',
        },
        {
            icons: <Tag />,
            title: 'Promotions',
            label: 'Create and manage discounts, coupons, and special offers.',
        },
    ]
  return (
    <section className="bg-[#F74F25] w-full">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-30">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT */}
          <div className="space-y-6 md:space-y-7">
            {/* heading */}
            <h1 className="text-2xl font-black tracking-tight text-white md:text-[34px]">
              Marketing and Growth 
            </h1>

            {/* body */}
            <p className="max-w-xl text-lg leading-relaxed text-white md:text-xl">
             Build your brand presence online and grow your customer base with integrated marketing tools and customer relationship management.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-6 md:flex-row sm:items-center">

          <Button 
            className="w-52 bg-white hover:bg-[#ffffff]/90 md:w-52 text-[#F74F25] h-12 font-bold">
            
            <Link href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap"> 
            Get Started For Free 
            <ArrowRight className="ml-2 h-4 w-4" /> 
            </Link>
          </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* Image wrapper */}
            <div className="relative overflow-hidden rounded-[28px] bg-[#f4f4f5] ">
              <div className="h-70 relative aspect-4/3 w-full md:aspect-[1.08/1] md:h-96">
                <Image
                  src={"/images/pngs/shop.png"}
                  alt={"Fashion designers shopping" }
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div> 

      {/* Card */}
    <div className="w-full bg-white py-10 md:py-20">
      <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={{
                              hidden: {},
                              visible: {
                                  transition: { staggerChildren: 0.15 },
                              },
                          }}
                          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:px-8 px-5"
                      >
                          {operationsCard.map((operation) => (
                             <CardBox
                                  key={operation.title}
                                  cardStyle={`bg-white border`}
                                  cardIcon={operation.icons}
                                  cardTitle={operation.title}
                                  cardLabel={operation.label}
                              />
                          ))}
                      </motion.div>
    </div>
      
    </section> 
  );
};
