'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play } from '@/components/svg';

export const AcademicResource = () => {
    const videoRef = useRef<HTMLDivElement>(null);

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


    useEffect(() => {
        if (videoRef.current) {
            const playButton = videoRef.current.querySelector('.play-button');
            if (playButton) {
                gsap.to(playButton, {
                    scale: 1.1,
                    duration: 1.5,
                    ease: 'power1.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }
        }

    }, []);

    const resources = [
        'Quick setup tutorials to get started fast',
        'Short videos on using key features',
        'Best practices for managing your business',
        'Tips to grow and work smarter with the platform'
    ];

    return (
        <div className="w-full bg-[#F9F0EE] md:py-30 py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        ref={videoRef}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            {/* Video Thumbnail */}
                            <div className="relative h-125 bg-gray-900">
                                <Image
                                    src="/images/pngs/testimonial.png"
                                    alt="Amara's Story"
                                    className="w-full h-full object-cover"
                                    width={577}
                                    height={412}
                                />
                                
                                <Badge className="absolute top-4 right-4 bg-black/80 text-white px-3 text-sm font-semibold">
                                    30:16
                                </Badge>

                                {/* Play Button Overlay */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                                >
                                    <motion.div
                                        className="play-button w-20 h-20 rounded-full bg-[#F74F25] flex items-center justify-center shadow-xl"
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Play />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-100 rounded-3xl -z-10"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Badge className='bg-[#FDC8BB] text-[#F74F25] mb-4'>
                            Academy
                        </Badge>
                        <h2 className="text-3xl md:text-[34px] font-black text-[#121926] mb-6">
                            Resources to Help You{' '}
                            <span className="text-[#F74F25]">Thrive</span>
                        </h2>
                        <p className="text-[#9AA4B2] mb-4">
                            Step-by-step guides and videos to help you get the most out of the platform.
                        </p>

                        <motion.div
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-4 mb-8"

                        >
                            {resources.map((resource, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-3"
                                >
                                    <div className='bg-[#F74F25] rounded-full text-white w-4 h-4 flex justify-center items-center'>
                                        <Check className="w-3 h-3 shrink-0 mt-0.5" />
                                    </div>
                                    <span className="text-[#9AA4B2]">{resource}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <Button className="group bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-54 text-white h-12 font-bold flex items-center justify-center">
                            Explore Academy
                            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};