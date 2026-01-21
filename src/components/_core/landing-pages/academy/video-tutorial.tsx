'use client'

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from '@/src/components/svg';
import Image from 'next/image';

const VideoTutorial = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePlayClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="px-4 md:px-8 w-full bg-[#F9F0EE] md:py-20 py-15 font-sans">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-[94%] mx-auto"
            >
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-[34px] font-black text-[#121926] mb-4"
                    >
                        Watch the Complete Tutorial
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-[#9AA4B2] max-w-2xl mx-auto"
                    >
                        Prefer to learn everything at once? This comprehensive video covers all the essentials in one sitting.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl bg-black group cursor-pointer"
                    onClick={handlePlayClick}
                >
                    <Image
                        src="/images/pngs/testimonial.png"
                        alt="Amara's Story"
                        className="w-full object-cover h-161.5"
                        width={1280}
                        height={646}
                    />
                    <div
                        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'
                            } group-hover:bg-black/40`}
                    />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
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
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                        >
                            1:23:05
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default VideoTutorial;