"use client";

import Image from "next/image"; 
import { motion } from "framer-motion";
import { CardBox } from '../shared/card-box' 
import { Heart, UserMultiple, GlobeIconBig, Target} from '@/components/svg';     

export const Mission = ({}) => {

const operationsCard = [
        {
            icons: <Target />,
            title: 'Mission-Driven',
            label: 'We exist to empower fashion creators with tools that were once only available to the biggest brands.',
        },
        {
            icons: <Heart />,
            title: 'Creator-First',
            label: 'Every feature we build starts with understanding the real challenges fashion professionals face daily.',
        },
        {
            icons: <UserMultiple />,
            title: 'Community-Focused',
            label: 'We are building more than software — we are creating a movement of empowered fashion entrepreneurs.',
        },
        {
            icons: <GlobeIconBig />,
            title: 'Globally Local',
            label: 'We understand that fashion is local, but aspirations are global. We bridge that gap.',
        },
    ]
  return (
    <section className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT */} 
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
          

          {/* RIGHT */}
          <div className="space-y-6">
            {/* heading */}
            <h1 className="text-2xl font-black tracking-tight text-[#121926] md:text-[34px]">
              Our Mission
            </h1>

            {/* body */}
            <p className="max-w-xl text-lg leading-relaxed text-[#9AA4B2] md:text-xl">
             To democratize access to professional business tools for fashion creators everywhere, enabling them to focus on what they do best — creating beautiful things.
              We believe that every talented designer, tailor, and cobbler deserves the same operational advantages as major fashion houses. Technology should be an equalizer, not a barrier.
            </p>
          </div>
        </div>
      </div> 

      {/* Card */}
    <div className="w-full bg-[#F74F25] py-10 md:py-20">
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
