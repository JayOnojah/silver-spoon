import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

export const Journey = () => {
    return (
        <div className="w-full px-4 md:px-8 md:py-20 py-15 bg-white overflow-x-hidden">
            <div className="lg:w-[94%] mx-auto bg-[#682110] md:py-24 py-10 px-6 md:rounded-[48px] rounded-[24px] relative">
                <div className="flex justify-center">
                    <Badge className="bg-white text-[#F74F25]">Start Your Journey Today</Badge>
                </div>
                <h1 className="text-white text-[40px] font-black my-6 text-center mx-auto lg:max-w-130 leading-12">
                    Ready to Transform Your {' '}
                    <span className="text-[#F74F25]">Fashion Business?</span>
                </h1>
                <p className="text-[18px] text-[#9AA4B2] mx-auto text-center max-w-140">
                    Join thousands of fashion designers and cobblers who are already using StitchFlow to streamline operations, delight customers, and grow their brands.
                </p>
                <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center">
                    <Button className="group z-10 bg-[#F74F25] hover:bg-[#F74F25]/90 md:w-54 text-white h-12 font-bold flex items-center justify-center">
                        Get Started For Free
                        <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>

                    <Button
                        variant="outline"
                        className="group z-10 text-[#121926] h-12 md:w-54 transition-all font-bold border-[#121926] hover:bg-white/90 bg-white flex items-center justify-center"
                    >
                        Book A Consultation
                        <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </div>
                <Image
                    className="opacity-20 absolute bottom-0 left-0 rounded-bl-[45px] w-40 md:w-[256px]"
                    src='/images/pngs/shapes-landing.png'
                    alt="shape"
                    width={256}
                    height={255.99}
                />
                <Image
                    className="opacity-20 absolute top-0 right-0 rounded-tr-[45px] w-40 md:w-[256px]"
                    src='/images/pngs/shape-landing2.png'
                    alt="shape"
                    width={256}
                    height={255.99}
                />
            </div>
        </div>
    )
}