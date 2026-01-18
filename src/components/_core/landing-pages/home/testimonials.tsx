'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Play } from '@/components/svg';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export const Testimonials = () => {
    const quotesRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!quotesRef.current) return;

        gsap.fromTo(
            quotesRef.current,
            {
                scale: 0,
                rotation: -180,
                opacity: 0,
            },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: quotesRef.current,
                    start: 'top 80%',
                },
            }
        );
    }, []);


    return (
        <div className="w-full bg-[#1a1f2e] py-20 px-4 md:px-8 overflow-x-hidden">
            <div className="lg:w-[94%] mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge className="text-[#F74F25] bg-white text-xs mb-6">
                        Our Success Stories
                    </Badge>
                    <h2 className="md:text-[34px] text-[28px] font-black text-white">
                        Hear From <span className="text-[#F74F25]">Creators</span> Like You
                    </h2>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Video Card */}
                    <motion.div
                        ref={videoRef}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group cursor-pointer"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-gray-700">
                            {/* Video Thumbnail */}
                            <div className="relative h-125 bg-linear-to-br from-gray-800 to-gray-900">
                                <Image
                                    src="/images/pngs/testimonial.png"
                                    alt="Amara's Story"
                                    className="w-full h-full object-cover"
                                    width={613}
                                    height={426}
                                />

                                {/* Play Button Overlay */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                                >
                                    <motion.div
                                        className="w-20 h-20 rounded-full bg-[#F74F25] flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Play />
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Video Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-6">
                                <h3 className="text-white text-xl font-bold mb-1">
                                    Watch Amara's Story
                                </h3>
                                <p className="text-[#F74F25] text-sm">
                                    Fashion Designer, Lagos
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <motion.div
                            className="mb-6 text-[#F74F25]"
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                        >
                            <Quote size={40} />
                        </motion.div>

                        <motion.p
                            className="text-white text-xl md:text-2xl font-black leading-relaxed mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Silverspoon completely transformed how I run my fashion business.
                            I went from juggling notebooks and spreadsheets to having everything
                            in one place. My customers love the professional experience, and I've
                            grown my client base by 150% in just 6 months.
                        </motion.p>

                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#898989]">
                                    <Image
                                        src="/images/pngs/testimonial.png"
                                        alt="Amara's Story"
                                        className="w-full h-full object-cover"
                                        width={85}
                                        height={85}
                                    />
                                </div>
                            </div>
                            <div className='text-white'>
                                <h4 className="font-bold text-lg">
                                    Amara Okonkwo
                                </h4>
                                <p className="text-sm">
                                    Founder, Amara Couture
                                </p>
                                <p className="text-xs">
                                    Lagos, Nigeria
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};