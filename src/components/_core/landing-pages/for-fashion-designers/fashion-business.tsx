'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge';
import {
    Cookies,
    Ruler,
    File,
    UserMultiple
} from '@/components/svg';
import { CardBox } from '../shared/card-box'


export default function FashionBusiness() {
    const operationsCard = [
        {
            icons: <Ruler />,
            title: 'Bespoke',
            label: 'Custom-made garments for discerning clients',
        },
        {
            icons: <File />,
            title: 'Notes',
            label: 'Keep detailed notes on designs, clients, and projects in one place.',
        },
        {
            icons: <Cookies />,
            title: 'Moodboards',
            label: 'Create inspiring moodboards to guide your creative process.',
        },
        {
            icons: <UserMultiple />,
            title: 'Staff & Vendors',
            label: 'Manage your team and vendor relationships efficiently.',
        },
    ]

    return (
        <div className="min-h-screen bg-white font-sans">
            <div className='w-[90%] mx-auto md:py-10 py-5'>
                {/* <div className='flex justify-center'>
                    <Badge className='bg-[#FDC8BB] text-[#F74F25] text-xs'>Feature</Badge>
                </div> */}
                <h1 className="text-[#121926] font-black pb-4 pt-2 md:text-[34px] text-3xl text-center ">
                    Built For Every {" "}
                    <span className="text-[#F74F25]">Fashion </span><br />
                    Business
                </h1>
                <p className='text-[#9AA4B2] text-[18px] text-center max-w-132 mx-auto'>Whether you're bespoke, ready-to-wear, or made-to-order . We adapts to your workflow.
                </p>
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
                >
                    {operationsCard.map((operation) => (
                       <CardBox
                            key={operation.title}
                            cardStyle={`bg-white border`}
                            cardIcon={operation.icons}
                            cardTitle={operation.title}
                            cardLabel={operation.label}
                        />
                    ))}
                </motion.div>

                    <div className="flex md:justify-center mt-10 md:flex-row flex-col items-start gap-4">
                        <Badge variant="outline" className=' text-sm p-1 px-2 md:px-4 rounded-4xl'>
                            Emerging Fashion Designers
                        </Badge>
                        <Badge variant="outline" className=' text-sm p-1 px-2 md:px-4 rounded-4xl'>
                            Establish Designers
                        </Badge>
                        <Badge variant="outline" className=' text-sm p-1 px-2 md:px-4 rounded-4xl'>
                            Enterprise
                        </Badge>
                    </div>
                </div>
            </div>
    );
}