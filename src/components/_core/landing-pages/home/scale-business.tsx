'use client'

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ScaleBusiness = () => {
    const mockupRef = useRef<HTMLDivElement>(null);

    const listVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        show: { opacity: 1, x: 0 },
    };


    const features = [
        'Automation that saves 10+ hours per week',
        'Professional customer experience',
        'Data-driven business decisions',
        'Seamless scaling from solo to team'
    ];

    return (
        <div className="w-full py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge className='text-[#F74F25] bg-[#FEEDE9] mb-6'>Technology That Empowers</Badge>
                        <h2 className="text-3xl md:text-[34px] lg:max-w-130 font-black text-[#121926] mb-6">
                            Scale Your Business with{' '}
                            <span className="text-[#F74F25]">Premium Tools</span>
                        </h2>

                        <p className="text-[#9AA4B2] mb-8 leading-relaxed">
                            Access the same business management technology used by top creatives
                            worldwide. We brings enterprise-level tools to independent designers and
                            cobblers — democratizing success in the fashion industry.
                        </p>

                        <motion.div
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-4 mb-8"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-3"
                                >
                                    <div className='bg-[#F74F25] rounded-full text-white w-4 h-4 flex justify-center items-center'>
                                        <Check className="w-3 h-3 shrink-0 mt-0.5" />
                                    </div>
                                    <span className="text-[#9AA4B2]">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>


                        <div className="flex flex-col md:flex-row gap-6">
                            <Button className="group bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-54 text-white h-12 font-bold flex items-center justify-center">
                                Get Started For Free
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>

                            <Button
                                variant="outline"
                                className="group text-[#121926] h-12 md:w-54 transition-all font-bold bg-transparent border-[#121926] hover:bg-[#121926]/10 flex items-center justify-center"
                            >
                                Book A Consultation
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        ref={mockupRef}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative">
                            <div className="bg-[#F5EFEF] rounded-3xl p-6">
                                <Image
                                    src="/images/pngs/scale-business-hero.png"
                                    alt='scale-business'
                                    className='rounded-3xl'
                                    width={562}
                                    height={375}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};