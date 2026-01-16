'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

import {
    Cookies,
    File,
    UserMultiple
} from '@/components/svg';
import { CardBox } from '../shared/card-box'

interface FullWidthCardProps {
    badge: string;
    title: string;
    description: string;
    imageUrl?: string;
    imagePlaceholder: string;
    imageRight?: boolean;
}

interface SmallCardProps {
    badge: string;
    title: string;
    description: string;
    imageUrl?: string;
    imagePlaceholder: string;
}

const FullWidthCard = ({
    badge,
    title,
    description,
    imageUrl,
    imagePlaceholder,
    imageRight = true,
}: FullWidthCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!cardRef.current) return

        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 80%',
                },
            }
        )
    }, [])

    return (
        <motion.div
            ref={cardRef}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-white rounded-2xl overflow-hidden"
        >
            <div className={`flex flex-col ${imageRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 p-8`}>
                <div className="flex-1">
                    <Badge className="text-[#F74F25] bg-[#FEEDE9]">{badge}</Badge>

                    <h2 className="text-2xl font-black text-[#121926] mb-4 mt-2">
                        {title}
                    </h2>
                    <p className="text-[#9AA4B2] mb-6 max-w-130">{description}</p>

                    <Link href="#" className="flex items-center gap-2 text-[#F74F25] font-bold hover:gap-3 transition-all">
                        Get Started For Free
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 w-full rounded-lg"
                >
                    <div className="w-full md:h-80 bg-[#F9F0EE] rounded-lg flex items-center justify-center">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={title}
                                width={564}
                                height={379}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        ) : (
                            <span className="text-gray-400">{imagePlaceholder}</span>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}


const SmallCard = ({
    badge,
    title,
    description,
    imageUrl,
    imagePlaceholder,
}: SmallCardProps) => (
    <motion.div
        transition={{ type: 'spring', stiffness: 200 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden"
    >
        <div className="p-8">
            <Badge className="text-[#F74F25] bg-[#FEEDE9]">{badge}</Badge>

            <h2 className="text-2xl font-black text-[#121926] mb-4 mt-2">
                {title}
            </h2>
            <p className="text-[#9AA4B2] mb-6 max-w-130">{description}</p>

            <Link href="#" className="flex items-center gap-2 text-[#F74F25] font-bold hover:gap-3 transition-all">
                Get Started For Free
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <div className="px-8 pb-8">
            <div className="w-full md:h-64 bg-[#F9F0EE] rounded-lg flex items-center justify-center">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={550}
                        height={327}
                        className="w-full h-full object-contain rounded-lg"
                    />
                ) : (
                    <span className="text-gray-400">{imagePlaceholder}</span>
                )}
            </div>
        </div>
    </motion.div>
)


export default function Features() {
    const operationsCard = [
        {
            icons: <Cookies />,
            title: 'Catalog Design',
            label: 'Organize & showcase your designs in beautiful digital catalogs.',
        },
        {
            icons: <File />,
            title: 'Notes',
            label: 'Keep detailed notes on designs, clients, and projects in one place.',
        },
        {
            icons: <Cookies />,
            title: 'Moodboards',
            label: 'Create inspiring moodboards to guide your creative process.',
        },
        {
            icons: <UserMultiple />,
            title: 'Staff & Vendors',
            label: 'Manage your team and vendor relationships efficiently.',
        },
    ]

    return (
        <div className="min-h-screen bg-[#F9F0EE]">
            <div className='w-[90%] mx-auto md:py-30 py-10'>
                <div className='flex justify-center'>
                    <Badge className='bg-[#FDC8BB] text-[#F74F25] text-xs'>Feature</Badge>
                </div>
                <h1 className="text-[#121926] font-black pb-4 pt-2 md:text-[34px] text-3xl text-center ">
                    Everything You Need to {" "}
                    <span className="text-[#F74F25]">Run & Grow </span><br />
                    Your Fashion Business
                </h1>
                <p className='text-[#9AA4B2] text-[18px] text-center max-w-132 mx-auto'>A complete toolkit designed specifically for fashion professionals. Streamline operations, delight customers, and scale your business.
                </p>
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
                >
                    {operationsCard.map((operation) => (
                       <CardBox
                            key={operation.title}
                            cardStyle={`bg-white`}
                            cardIcon={operation.icons}
                            cardTitle={operation.title}
                            cardLabel={operation.label}
                        />
                    ))}
                </motion.div>

                <div className="max-w-7xl mx-auto space-y-6 pt-10">
                    <FullWidthCard
                        badge="Free Website"
                        title="Get Your Online Storefront in Minutes"
                        description="Launch a stunning portfolio website that showcases your work beautifully. Accept inquiries, let customers orders, and build your digital brand with ease."
                        imagePlaceholder="Storefront mockup image here"
                        imageRight={true}
                        imageUrl='/images/pngs/features-1.png'
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SmallCard
                            badge="Invoices, Receipt & Expenses"
                            title="Share Invoices, Receipts and Record Sales Easily"
                            description="Create invoices, send receipts, record sales and log expenses that you cannot lose on your dashboard. Keep your business organized and professional."
                            imagePlaceholder="Invoice dashboard image here"
                            imageUrl='/images/pngs/features-2.png'
                        />
                        <SmallCard
                            badge="Analytics & Reporting"
                            title="Stay Ahead of Your Competitors with Analytics"
                            description="Get important data like Profit, Revenue, Spend per Customer, Best Selling Products, and Website clicks with our powerful Analytics dashboard."
                            imagePlaceholder="Analytics dashboard image here"
                            imageUrl='/images/pngs/features-3.png'
                        />
                    </div>

                    <FullWidthCard
                        badge="Local & International Payments"
                        title="Receive Local and International Payments Easily"
                        description="Choose from payment options that allow you get paid locally or internationally. Set up payment alerts for staff & automatically update your inventory."
                        imagePlaceholder="Payment options image here"
                        imageRight={false}
                        imageUrl='/images/pngs/features-4.png'
                    />
                </div>
            </div>
        </div>
    );
}