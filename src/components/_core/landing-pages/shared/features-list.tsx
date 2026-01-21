'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    Server,
    Inventory,
    UserMultiple,
    Ruler,
    BarGraph,
    Cookies,
    Invoice,
    Analytics,
    GraphBarDown,
    CartBasket,
    File,
} from "@/components/svg"
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedListProps {
    bgColor?: string;
}

const firstListFeatures = [
    {
        icons: <Server />,
        title: 'Website Builder',
    },
    {
        icons: <CartBasket />,
        title: 'Create & Manage Orders',
    },
    {
        icons: <Inventory />,
        title: 'Inventory Management',
    },
    {
        icons: <UserMultiple />,
        title: 'Customer Records',
    },
    {
        icons: <Ruler />,
        title: 'Measurements',
    },
    {
        icons: <UserMultiple />,
        title: 'Manage Staff',
    },
]

const secondListFeatures = [
    {
        icons: <BarGraph />,
        title: 'Business Analytics',
    },
    {
        icons: <Cookies />,
        title: 'Catalogue Design',
    },
    {
        icons: <Invoice />,
        title: 'Invoices & Receipts',
    },
    {
        icons: <Cookies />,
        title: 'Moodboards',
    },
    {
        icons: <Analytics />,
        title: 'Business Reports',
    },
    {
        icons: <File />,
        title: 'Notes',
    },
    {
        icons: <GraphBarDown />,
        title: 'Record Expenses',
    }
]

const FeatureItem = ({ feature }: { feature: { icons: React.ReactNode; title: string } }) => (
    <div className="flex flex-col justify-center items-center md:min-w-45 mx-8">
        <div className="flex justify-center items-center border border-[#F74F25] bg-white w-16 h-16 p-3 rounded-xl">
            {feature.icons}
        </div>
        <p className="text-[#121926] text-[18px] mt-4 text-center whitespace-nowrap">{feature.title}</p>
    </div>
);

export const FeatureList = ({bgColor}: FeaturedListProps) => {
    const firstRowRef = useRef<HTMLDivElement>(null);
    const secondRowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const firstRow = firstRowRef.current;
        const secondRow = secondRowRef.current;

        if (!firstRow || !secondRow) return;

        const firstRowWidth = firstRow.scrollWidth / 2;
        const secondRowWidth = secondRow.scrollWidth / 2;

        gsap.to(firstRow, {
            x: -firstRowWidth,
            duration: 20,
            ease: 'none',
            repeat: -1,
        });

        gsap.set(secondRow, { x: -secondRowWidth });
        gsap.to(secondRow, {
            x: 0,
            duration: 20,
            ease: 'none',
            repeat: -1,
        });

        return () => {
            gsap.killTweensOf([firstRow, secondRow]);
        };
    }, []);

    return (
        <div className={`w-full md:py-24 py-16 overflow-hidden font-sans ${bgColor}`}>
            <div className="w-full mx-auto">
                <div className="overflow-hidden mb-12">
                    <div ref={firstRowRef} className="flex">
                        {[...firstListFeatures, ...firstListFeatures].map((feature, index) => (
                            <FeatureItem key={`first-${index}`} feature={feature} />
                        ))}
                    </div>
                </div>

                <div className="md:px-8 px-4 md:max-w-5xl mx-auto mb-14">
                    <h1 className="text-2xl md:text-5xl text-[#121926] font-black leading-tight text-center mb-6">
                        One App that has all the features your Fashion Business Needs To{' '}
                        <span className="text-[#F74F25]">Grow</span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Button className="group bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-54 text-white h-12 font-bold flex items-center justify-center">
                            Get Started For Free
                            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>

                        <Button
                            variant="outline"
                            className="group text-[#121926] h-12 md:w-54 transition-all font-bold bg-transparent border-[#121926] hover:bg-[#121926]/10 flex items-center justify-center"
                        >
                            Book A Consultation
                            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div ref={secondRowRef} className="flex">
                        {[...secondListFeatures, ...secondListFeatures].map((feature, index) => (
                            <FeatureItem key={`second-${index}`} feature={feature} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}