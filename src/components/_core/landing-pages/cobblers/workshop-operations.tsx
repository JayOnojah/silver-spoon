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
    Cookies,
    File,
    UserMultiple
} from "@/src/components/svg"

gsap.registerPlugin(ScrollTrigger)

export const WorkshopOperations = () => {
    const sectionRef = useRef(null)

    const operationsCard = [
        {
            icon: <Cookies />,
            title: 'Repair Tracking',
            label: 'Track every repair job from intake to completion.'
        },
        {
            icon: <File />,
            title: 'Work Notes',
            label: 'Keep detailed notes on designs, clients, and projects in one place.'
        },
        {
            icon: <Cookies />,
            title: 'Moodboards',
            label: 'Create inspiring moodboards to guide your creative process.'
        },
        {
            icon: <UserMultiple />,
            title: 'Staff & Vendors',
            label: 'Manage your team and vendor relationships efficiently.'
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
                className="w-full bg-[#F9F0EE] px-4 md:px-8 md:py-20 py-10 overflow-x-hidden"
            >
                <div className="lg:w-[94%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="space-y-4 text-block">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-[34px] text-[#121926] font-black max-w-130 leading-11"
                        >
                            Managing Workshop Operations
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-[#9AA4B2] text-[18px] py-4"
                        >
                            Streamline your daily workshop operations with tools designed specifically for cobblers. From repair tracking to material inventory.
                        </motion.p>
                        <motion.div whileTap={{ scale: 0.95 }} className="w-full flex-1">
                            <Button className="group bg-[#F74F25] w-full hover:bg-[#F74F25]/90 md:w-54 text-white h-12 font-bold flex items-center justify-center">
                                Get Started For Free
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>
                    <div className="image-block w-full">
                        <Image
                            className="w-full rounded-[24px]"
                            src="/images/pngs/cobbler-stitch.jpg"
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
