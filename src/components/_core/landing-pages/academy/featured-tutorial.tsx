'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Play } from '@/src/components/svg';
import { Badge } from '@/src/components/ui/badge';
import Image from 'next/image';

interface FeaturedTutorialProps {
    tutorial: any;
    index: number;
}

const tutorials = [
    {
        id: 1,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 2,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 3,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 4,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 5,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 6,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 7,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 8,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    },
    {
        id: 9,
        category: 'Getting Started',
        title: 'Setting Up Your Account',
        description: 'Learn how to create and configure your Silverspoon account',
        views: '2.4K',
        updated: '2 days ago',
        duration: '8:45',
        thumbnail: '/images/pngs/testimonial.png'
    }
];

const TutorialCard = ({ tutorial, index }: FeaturedTutorialProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative aspect-video overflow-hidden bg-gray-900 cursor-pointer group">
                <Image
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    width={410.67}
                    height={269}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <motion.div
                        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                        className="w-13 h-13 rounded-full bg-[#F74F25] p-3 flex items-center justify-center shadow-2xl"
                    >
                        <Play />
                    </motion.div>
                </motion.div>
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-sm font-semibold">
                    {tutorial.duration}
                </div>
            </div>

            <div className="p-5">
                <Badge className="bg-[#FEEDE9] text-[#F74F25] mb-2">
                    {tutorial.category}
                </Badge>

                <h3 className="text-xl font-black text-[#121926] mb-2">
                    {tutorial.title}
                </h3>

                <p className="text-[#9AA4B2] text-sm mb-4">
                    {tutorial.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-[#9AA4B2]">
                    <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{tutorial.views} views</span>
                    </div>
                   
                    <span>Updated {tutorial.updated}</span>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedTutorials = () => {
    return (
        <div className="w-full bg-[#F9F0EE] py-16 px-4 md:px-8 font-sans">
            <div className="lg:w-[94%] mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-[34px] font-black text-[#121926]">
                        Featured Tutorials
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial, index) => (
                        <TutorialCard key={tutorial.id} tutorial={tutorial} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedTutorials;