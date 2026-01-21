import { Plus, Minus } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
}

export const FaqProp = ({ faqs }: FAQProps) => {
    return (
        <div className="md:py-20 py-15 px-4 md:px-8 bg-white font-sans">
            <div className="lg:w-[94%] mx-auto">
                <div className="flex justify-center">
                    <Badge className="mb-4 text-[#F74F25] bg-[#FEEDE9]">
                        Got Questions?
                    </Badge>
                </div>
                <h1 className="text-[34px] font-black text-[#121926] text-center leading-11">
                    Frequently Asked
                </h1>
                <h1 className="text-[34px] font-black text-[#121926] text-center leading-11">
                    Questions
                </h1>
                <div className="md:max-w-4xl mx-auto mt-10">
                    <div className="flex-1">
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {faqs.map((item, index) => {
                                const value = `item-${index}`;

                                return (
                                    <AccordionItem
                                        key={index}
                                        value={value}
                                        className="mt-2 font-work-sans rounded-3xl bg-white data-[state=open]:bg-[#FEEDE9] border-0"
                                    >
                                        <AccordionTrigger
                                            className="font-bold text-lg flex items-center w-full p-4 hover:no-underline group"
                                            icon={
                                                <span className="border border-[#7B8086] w-5 h-5 flex items-center justify-center rounded-full">
                                                    <Plus className="block group-data-[state=open]:hidden" color="#9AA4B2" />
                                                    <Minus className="hidden group-data-[state=open]:block" color="#9AA4B2" />
                                                </span>
                                            }
                                        >
                                            <span>{item.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[#9AA4B2] text-base p-4">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
                <span className="text-[#9AA4B2] text-center flex-wrap flex justify-center gap-1 mt-8">
                    Still have more questions? Contact our{' '}
                    <a href="#" className="text-[#F74F25] font-bold underline hover:text-[#F74F25]/80 transition-colors">
                        help center
                    </a>
                </span>
            </div>
        </div>
    );
};