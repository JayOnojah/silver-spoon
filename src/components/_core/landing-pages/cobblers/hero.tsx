'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Star } from '@/src/components/svg';
import gsap from 'gsap';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { HammerIcon } from '@/src/components/svg';
import Image from 'next/image';

export const CraftsmenHero = () => {
    const imageRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            imageRef.current,
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );

        gsap.fromTo(
            badgeRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
        );
    }, []);

    return (
        <div className="bg-[#F9F0EE] md:pt-35 pb-20 pt-25 flex items-center justify-center md:px-8 px-4">
            <div className="w-[94%] grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                    >
                        <Badge className='bg-[#FDC8BB] text-[#F74F25]'>
                            <HammerIcon />
                            For Cobblers
                        </Badge>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="md:text-[56px] text-4xl font-black text-[#121926] leading-tight"
                        >
                            Modern Tools for{' '}
                            <span className="text-[#F74F25]">Master Craftsmen</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[#121926] text-lg max-w-160"
                        >
                            Whether you're crafting custom shoes or restoring treasured footwear, we
                            helps you manage your craft with the professionalism it deserves.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex gap-4 flex-col md:flex-row"
                    >
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            className='w-full flex-1'
                        >
                            <Button className="group bg-[#F74F25] w-full hover:bg-[#F74F25]/90 md:w-54 text-white h-12 font-bold flex items-center justify-center">
                                Get Started For Free
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            className='w-full'
                        >
                            <Button
                                variant="outline"
                                className="group text-[#121926] w-full h-12 md:w-45 transition-all font-bold bg-transparent border-[#121926] hover:bg-[#121926]/10 flex items-center justify-center"
                            >
                                <Play />
                                Watch Demo
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="relative">
                    <div ref={imageRef} className="rounded-3xl overflow-hidden shadow-2xl w-full">
                        <Image
                            src='/images/pngs/crafts-men-hero.png'
                            alt='crafts-men'
                            width={628}
                            height={544}
                        />
                    </div>

                    <div ref={badgeRef} className="absolute w-75 -bottom-10 left-25 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3">
                        <div className="bg-[#F9F0EE] w-10 h-10 flex justify-center items-center rounded-full">
                            <Star />
                        </div>
                        <div>
                            <p className="font-bold text-[18px] text-[#121926]">Trusted by 1,500+</p>
                            <p className="text-[#9AA4B2]">Cobblers & Shoemakers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}