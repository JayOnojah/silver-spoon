'use client'

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const tabs = ['Monthly', 'Quarterly', 'Yearly']

interface PricingPlan {
    name: string;
    description: string;
    price: number;
    period: string;
    features: string[];
    isPopular?: boolean;
    isDark?: boolean;
}

export const Pricing = () => {
    const [backgroundStyle, setBackgroundStyle] = useState({ left: 0, width: 0 });
    const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
        const updateUnderline = () => {
            const current = tabRefs.current[tabs.indexOf(billingCycle)];
            if (current) {
                setBackgroundStyle({ left: current.offsetLeft, width: current.offsetWidth });
            }
        };
        const frame = requestAnimationFrame(updateUnderline);

        return () => cancelAnimationFrame(frame);
    }, [billingCycle]);


    const pricingPlans: PricingPlan[] = [
        {
            name: 'Basic',
            description: 'Perfect for small agencies just getting started',
            price: 99,
            period: 'month',
            features: [
                'Automation that saves 10+',
                'Professional customer experience',
                'Data-driven business decisions',
                'Seamless scaling from solo to team',
                'Seamless scaling from solo to team'
            ],
            isDark: false
        },
        {
            name: 'Starter',
            description: 'Perfect for small agencies just getting started',
            price: 99,
            period: 'month',
            features: [
                'Automation that saves 10+',
                'Professional customer experience',
                'Data-driven business decisions',
                'Seamless scaling from solo to team',
                'Seamless scaling from solo to team'
            ],
            isPopular: true,
            isDark: true
        },
        {
            name: 'Enterprise',
            description: 'Perfect for small agencies just getting started',
            price: 99,
            period: 'month',
            features: [
                'Automation that saves 10+',
                'Professional customer experience',
                'Data-driven business decisions',
                'Seamless scaling from solo to team',
                'Seamless scaling from solo to team'
            ],
            isDark: false
        }
    ];

    return (
        <div className="w-full py-20 px-4 md:px-8 bg-white font-sans" id='pricing'>
            <div className="lg:w-[94%] mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge className="mb-4 text-[#F74F25] bg-[#FEEDE9]">
                        Pricing
                    </Badge>

                    <h2 className="text-3xl md:text-[34px] font-black text-[#121926] mb-1">
                        Plans That Grow
                    </h2>
                    <h3 className="text-3xl md:text-[34px] font-black text-[#F74F25] mb-4">
                        With Your Business
                    </h3>

                    <p className="text-[#9AA4B2] max-w-2xl mx-auto mb-8">
                        Start small, scale as your craft and customers grow.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center relative border-2 border-black rounded-full p-1">
                        {tabs.map((cycle, index) => (
                            <button
                                key={index}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                onClick={() => setBillingCycle(cycle as 'Monthly' | 'Quarterly' | 'Yearly')}
                                className={`px-4 py-2 z-10 cursor-pointer rounded-full font-semibold text-sm transition-all duration-300 ${billingCycle === cycle
                                    ? ' text-white'
                                    : 'text-[#121926] hover:bg-gray-100'
                                    }`}
                            >
                                {cycle}
                            </button>
                        ))}
                        <span
                            className="absolute bottom-0.5 h-10 bg-[#F74F25] rounded-full transition-all duration-300 ease-in-out"
                            style={{ left: backgroundStyle.left, width: backgroundStyle.width }}
                        />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-8 bg-white">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative"
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                    <Badge className="bg-[#F74F25] text-white border-0 px-4 py-1">
                                        Most popular
                                    </Badge>
                                </div>
                            )}

                            {/* Card */}
                            <div
                                className={`h-full rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl ${plan.isDark
                                    ? 'bg-[#1a1f2e] border-[#1a1f2e] text-white'
                                    : 'bg-white border-[#CDD5DF]'
                                    }`}
                            >
                                {/* Plan Name */}
                                <h3
                                    className={`text-2xl font-black mb-2 ${plan.isDark ? 'text-white' : 'text-[#121926]'
                                        }`}
                                >
                                    {plan.name}
                                </h3>

                                {/* Description */}
                                <p
                                    className={`text-sm mb-6 text-[#9AA4B2]`}
                                >
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            className={`text-5xl font-black ${plan.isDark ? 'text-white' : 'text-[#121926]'
                                                }`}
                                        >
                                            ${plan.price}
                                        </span>
                                        <span
                                            className={`text-sm text-[#9AA4B2]`}
                                        >
                                            / {plan.period}
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <motion.div
                                    variants={listVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="space-y-4 mb-8"
                                >
                                    {plan.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="flex items-start gap-3"
                                        >
                                            <div className='bg-[#F74F25] rounded-full text-white w-4 h-4 flex justify-center items-center'>
                                                <Check className="w-3 h-3 shrink-0 mt-0.5" />
                                            </div>
                                            <span
                                                className={`text-sm text-[#9AA4B2]`}
                                            >
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <Button
                                    className={`w-full h-12 font-bold group ${plan.isDark
                                        ? 'bg-[#F74F25] hover:bg-[#F74F25]/90 text-white'
                                        : 'bg-white hover:bg-gray-50 text-[#121926] border border-[#CDD5DF]'
                                        }`}
                                >
                                    Choose Plan
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        className="border border-[#121926] text-[#121926] hover:bg-[#121926]/5 font-bold h-12 px-8 group"
                    >
                        Compare Pricing
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};