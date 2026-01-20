'use client'

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { Badge } from "@/src/components/ui/badge"
import {
    HammerFill,
    HammerJustice,
    HammnerSignage,
    StarBigIcon
} from "@/src/components/svg"
import { CardBox } from "../shared/card-box"

gsap.registerPlugin(ScrollTrigger)

const professionalListCard = [
    {
        icon: <HammerFill />,
        title: 'Custom Shoemakers',
        label: 'Crafting bespoke footwear from scratch'
    },
    {
        icon: <HammerJustice />,
        title: 'Repair Specialists',
        label: 'Expert shoe and leather repairs'
    },
    {
        icon: <StarBigIcon />,
        title: 'Restoration Artisans',
        label: 'Breathing life into vintage footwear'
    },
    {
        icon: <HammnerSignage />,
        title: 'All Cobblers',
        label: 'Tools for every footwear craftsman'
    },
]

const cobblers = ['Solo Craftsmen', 'Established Workshops', 'Multi-Location Shops']

export const Professionals = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".card", {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            })
            gsap.from(".badge", {
                y: 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6,
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
        <div className="w-full md:py-20 py-10 px-4 md:px-8 overflow-x-hidden" ref={sectionRef}>
            <div className="lg:w-[94%] mx-auto">
                <motion.h1
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="md:text-[34px] text-[28px] text-[#121926] text-center font-black max-w-130 leading-11 mx-auto"
                >
                    Built For Every {' '}
                    <span className="text-[#F74F25]">Footwear</span>{' '}
                    Professional
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-[#9AA4B2] text-[18px] text-center mx-auto max-w-160 pt-4"
                >
                    Whether you're a custom shoemaker, repair specialist, or restoration artisan. We adapts to your workflow.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {professionalListCard.map((card, idx) => (
                        <CardBox
                            key={idx}
                            cardIcon={card.icon}
                            cardTitle={card.title}
                            cardLabel={card.label}
                            cardStyle="border border-[#CDD5DF]"
                        />
                    ))}
                </div>
                <div className="flex justify-center flex-col md:flex-row md:items-center gap-6 mt-6">
                    {cobblers.map((cobbler, idx) => (
                        <motion.div
                            key={idx}
                            className="badge"
                        >
                            <Badge className="border border-[#CDD5DF] bg-transparent text-[#121926]">
                                {cobbler}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
