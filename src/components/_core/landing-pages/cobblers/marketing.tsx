'use client'

import { useEffect, useRef } from "react"
import { Button } from "@/src/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CardBox } from "../shared/card-box"

import {
    Server,
    Volume2,
    Heart,
    Tag
} from "@/src/components/svg"

gsap.registerPlugin(ScrollTrigger)

export const Marketing = () => {
    const sectionRef = useRef(null)

    const operationsCard = [
        {
            icon: <Server />,
            title: 'Website & Online Store',
            label: 'Launch your professional fashion website in minutes.'
        },
        {
            icon: <Volume2 />,
            title: 'Marketing Integration',
            label: 'Connect with social media and email marketing tools.'
        },
        {
            icon: <Heart />,
            title: 'Customer Relations',
            label: 'Build lasting relationships with personalized communication.'
        },
        {
            icon: <Tag />,
            title: 'Promotions',
            label: 'Create and manage discounts, coupons, and special offers.'
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".text-block", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            })

            gsap.from(".image-block", {
                x: 60,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <>
            <div
                ref={sectionRef}
                className="w-full bg-[#F74F25] px-4 md:px-8 md:py-20 py-10 overflow-x-hidden font-sans"
            >
                <div className="lg:w-[94%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="space-y-4 text-block">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-[34px] text-white font-black max-w-130 leading-11"
                        >
                            Marketing and Growth
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-[#FEEDE9] text-[18px] py-4"
                        >
                            Build your brand presence online and grow your customer base with integrated marketing tools and customer relationship management.
                        </motion.p>
                        <motion.div whileTap={{ scale: 0.95 }} className="w-full flex-1">
                            <Button className="group bg-white w-full hover:bg-[#F74F25] hover:text-white md:w-54 text-[#F74F25] h-12 font-bold flex items-center justify-center transition-colors hover:border duration-300">
                                Get Started For Free
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>
                    <div className="image-block w-full">
                        <Image
                            className="w-full rounded-[24px]"
                            src="/images/pngs/cobbler-shoe-stitcher.png"
                            alt="cobbler-stitch"
                            width={577}
                            height={380}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full bg-white px-4 md:px-8 py-14">
                <div className="lg:w-[94%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {operationsCard.map((operation, idx) => (
                        <CardBox
                            key={idx}
                            cardIcon={operation.icon}
                            cardTitle={operation.title}
                            cardLabel={operation.label}
                            cardStyle="border border-[#CDD5DF]"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
