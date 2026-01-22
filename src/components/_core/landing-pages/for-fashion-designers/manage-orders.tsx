"use client";

import Image from "next/image"; 
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; 
import { CardBox } from '../shared/card-box' 
import { CartBasket, CoinStack, Delivery, CalendarDays
} from '@/components/svg';

export const ManageOrders = ({}) => {

const operationsCard = [
        {
            icons: <CartBasket />,
            title: 'Ceating & Managing Orders',
            label: 'Streamlined order creation with all details in one place.',
        },
        {
            icons: <Delivery />,
            title: 'Shipping & Delivery',
            label: 'Track shipments and manage delivery schedules effortlessly.',
        },
        {
            icons: <CoinStack />,
            title: 'Receiving Payment',
            label: 'Multiple payment options with automatic invoicing.',
        },
        {
            icons: <CalendarDays />,
            title: 'Scheduling',
            label: 'Manage fittings, deadlines, and production timelines.',
        },
    ]

  return (
    <div className="bg-[#121926] w-full font-sans">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {/* LEFT */}
          <div className="relative">
            {/* Image wrapper */}
            <div className="relative overflow-hidden rounded-[28px] bg-[#f4f4f5] ">
              <div className="h-70 relative aspect-4/3 w-full md:aspect-[1.08/1] md:h-96">
                <Image
                  src={"/images/pngs/frame.png"}
                  alt={"Fashion designers" }
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 md:space-y-7">
            {/* heading */}
            <h1 className="text-2xl font-black tracking-tight text-white md:text-[34px]">
              Create & Manage Orders 
            </h1>

            {/* body */}
            <p className="max-w-xl text-lg leading-relaxed text-[#9AA4B2] md:text-xl">
             Handle every order with precision from initial inquiry to final delivery. Track payments, shipping, and customer communications seamlessly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-6 md:flex-row sm:items-center">

          <Button 
            className="w-52 bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-52 text-white h-12 font-bold">
            
            <Link href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap"> 
            Get Started For Free 
            <ArrowRight className="ml-2 h-4 w-4" /> 
            </Link>
          </Button>
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
      
    </div> 
  );
};
