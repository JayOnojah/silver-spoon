import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardBoxProps {
    cardStyle?: string;
    cardIcon: ReactNode;
    cardTitle: string;
    cardLabel: string;
}

export const CardBox = ({ cardStyle, cardIcon, cardTitle, cardLabel }: CardBoxProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-3xl ${cardStyle}`}
        >
            <div className="flex justify-center">{cardIcon}</div>
            <h1 className="text-[#121926] font-sans text-[18px] pt-6 pb-4 font-bold text-center">
                {cardTitle}
            </h1>
            <p className="text-[#9AA4B2] font-sans text-center">{cardLabel}</p>
        </motion.div>
    )
}