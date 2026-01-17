'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import {
    FashionIcon,
    HammerIcon,
    Ruler,
    UserMultiple,
    CartBasket,
    Server,
    BarGraph,
} from "@/components/svg"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const FashionDesigners = () => {
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!titleRef.current) return

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
            }
        )
    }, [])

    const utilityWrapper = [
        {
            coverImage: '/images/pngs/sowing.png',
            altImage: 'woman-sowing',
            icons: <FashionIcon />,
            title: 'Fashion Designers',
            label: 'For Tailors, Seamstresses & Fashion Houses',
            Badges: ['Bespoke', 'Ready-to-Wear', 'Made-to-Order'],
        },
        {
            coverImage: '/images/pngs/shoemaker.png',
            altImage: 'shoe-maker',
            icons: <HammerIcon />,
            title: 'Cobblers',
            label: 'For Shoemakers, Repairers & Artisans',
            Badges: ['Custom Shoes', 'Repairs', 'Restorations'],
        },
    ]

    const benefitItems = [
        {
            icons: <Ruler />,
            title: 'Measurements, Made Digital',
            label: 'Capture, store, and access customer measurements anytime — no paper needed.'
        },
        {
            icons: <UserMultiple />,
            title: 'Every Customer, One Profile',
            label: 'Keep customer details, preferences, and history neatly organized.'
        },
        {
            icons: <CartBasket />,
            title: 'Run your business smoothly',
            label: 'Manage orders, workflows, and daily business tasks with ease.'
        },
        {
            icons: <Server />,
            title: 'Showcase your work online',
            label: 'Showcase your work and connect with customers beyond your workshop.'
        },
        {
            icons: <BarGraph />,
            title: 'Know Your Numbers Clearly',
            label: 'Track revenue, expenses, and profitability at a glance.'
        },
    ]

    return (
        <div className="w-full px-4 md:px-8 md:py-20 py-15 bg-white">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto"
            >
                <div ref={titleRef}>
                    <h1 className="text-[#121926] font-black md:text-[34px] text-2xl text-center md:leading-10">
                        Built For{" "}
                        <span className="text-[#F74F25]">Fashion Designers</span><br />
                        Who Craft Excellence
                    </h1>
                    <p className="text-[#9AA4B2] max-w-130 pt-4 pb-10 text-center mx-auto">
                        Tools designed for fashion designers and cobblers who take their craft seriously.
                    </p>
                </div>

                <div className="flex items-center justify-center w-full flex-col md:flex-row gap-6 md:gap-0">
                    {utilityWrapper.map((item) => (
                        <motion.div
                            key={item.altImage}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="w-full"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src={item.coverImage}
                                    alt={item.altImage}
                                    width={628}
                                    height={516}
                                    className={`w-full rounded-t-[24px] ${item.altImage === 'shoe-maker'
                                        ? 'md:rounded-tl-none'
                                        : 'md:rounded-tr-none'
                                        }`}
                                />
                            </motion.div>

                            <div className={`py-8 px-6 rounded-b-[24px] ${item.altImage === 'shoe-maker'
                                ? 'bg-[#0F1621] md:rounded-bl-none'
                                : 'bg-[#F74F25] md:rounded-br-none'
                                }`}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className={`rounded-xl w-12 h-12 flex items-center justify-center text-white ${item.altImage === 'shoe-maker'
                                        ? 'bg-[#F74F25]'
                                        : 'bg-[#121926]'
                                        }`}>
                                        {item.icons}
                                    </div>

                                    <h1 className="text-white font-black text-2xl mt-6">{item.title}</h1>
                                    <p className="text-white py-2">{item.label}</p>

                                    <div className="flex gap-2 flex-wrap justify-center">
                                        {item.Badges.map((badge, idx) => (
                                            <Badge key={idx} className="text-[#F74F25] bg-white text-xs">
                                                {badge}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="mt-6 h-12 md:w-42 text-white font-bold border-white bg-transparent hover:scale-95 transition"
                                    >
                                        Learn More <ArrowRight className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                    className="bg-[#F9F0EE] p-10 rounded-[32px] w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-6 text-center"
                >
                    {benefitItems.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto w-full"
                        >
                            <div className="flex justify-center">{benefit.icons}</div>
                            <h1 className="text-[#121926] font-black text-[20px] pt-6 pb-2">
                                {benefit.title}
                            </h1>
                            <p className="text-[#9AA4B2]">{benefit.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}
