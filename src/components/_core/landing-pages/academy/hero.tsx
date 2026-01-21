'use client'

import { Badge } from "@/src/components/ui/badge"
import { 
    Television, 
    Eyes,
    BookIcon,
    FlashIcon
} from "@/src/components/svg"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export const HeroAcademy = () => {

    return (
        <div className="px-4 md:px-8 w-full bg-white md:pt-30 pt-25 pb-15 font-sans">
            <div className="lg:w-[94%] mx-auto text-start md:text-center">
                <Badge className="bg-[#FEEDE9] text-[#F74F25]">
                    <Television /> Silverspoon Academy
                </Badge>
                <h1 className="text-[#121926] md:text-[56px] text-4xl mt-4 md:leading-18 font-black max-w-180 mx-auto mb-4">
                    Learn To Build A Thriving {' '}<span className="text-[#F74F25]">Fashion Business</span>
                </h1>
                <p className="text-[#121926] text-[18px] max-w-160 mx-auto mb-8">Free video tutorials, guides, and resources to help you get the most out of Silverspoon. From setup to advanced features. we've got you covered.</p>
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex gap-4 flex-col md:flex-row w-full md:max-w-100"
                    >
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            className='w-full flex-1'
                        >
                            <Button className="group bg-[#F74F25] w-full hover:bg-[#F74F25]/90 md:w-45 text-white h-12 font-bold flex items-center justify-center">
                                Start Learning
                                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            className='w-full'
                        >
                            <Button
                                variant="outline"
                                className="group text-[#121926] w-full h-12 md:w-60 transition-all font-bold bg-transparent border-[#121926] hover:bg-[#121926]/10 flex items-center justify-center"
                            >
                                <Play />
                                Watch Introduction Video
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-6 items-center pt-6">
                    <div className="flex items-center gap-3">
                        <Eyes />
                        <span className="text-[18px] text-[#121926]">Quick Start in 10 min</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#F74F25]">
                        <BookIcon />
                        <span className="text-[18px] text-[#121926]">Manage Orders Seamlessly</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FlashIcon />
                        <span className="text-[18px] text-[#121926]">Free website</span>
                    </div>
                </div>
            </div>
        </div>
    )
}