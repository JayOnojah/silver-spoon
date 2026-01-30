import { ReactNode } from "react"
import { Wallet } from "../../svg"
import { FormatCurrency } from "../../format-currency"
import { Button } from "@/src/components/ui/button"
import { RecentTransactions } from "./recent-transactions"

import {
    Link,
    ArrowUpRight,
    ArrowDownLeft,
    Settings
} from "lucide-react"

interface FinancialSummaryCards {
    icon: ReactNode,
    title: string,
    amount: number,
    range: string
};

export const Overview = () => {
    const financialSummaryCards: FinancialSummaryCards[] = [
        {
            icon: <ArrowDownLeft />,
            title: 'Received',
            amount: 893000.00,
            range: 'Month'
        },
        {
            icon: <ArrowUpRight />,
            title: 'Withdrawn',
            amount: 793000.00,
            range: 'Month'
        },
    ];

    return (
        <>
            {/* Avaliable Balance */}
            <div className="bg-white rounded-2xl p-6 font-sans my-6">
                <Wallet />
                <p className="text-[#9AA4B2] text-sm py-3">Available Balance</p>
                <h1 className="text-[#121926] text-[28px] font-black">{FormatCurrency(893000.00)}</h1>
                <div className="pt-6 flex flex-col md:flex-row items-center gap-4 w-full">
                    <Button className="bg-[#F74F25] rounded-xl w-full md:w-62.25 h-12 font-bold text-white px-6!">
                        <Link />
                        Generate Payment Link
                    </Button>
                    <Button variant={'outline'} className="text-[#F74F25] w-full md:w-51 px-6! border-[#F74F25] rounded-xl h-12 font-bold hover:bg-transparent hover:text-[#F74F25]">
                        <ArrowUpRight />
                        Withdraw Funds
                    </Button>
                    <Button variant={'outline'} className="text-[#9AA4B2] px-6! w-full md:w-51 border-[#9AA4B2] rounded-xl h-12 font-bold hover:bg-transparent hover:text-[#9AA4B2]">
                        <Settings />
                        Payout Settings
                    </Button>
                </div>
            </div>
            {/* Monthly Financial Summary */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-baseline">
                {financialSummaryCards.map((summaryCard, idx) => (
                    <div className="rounded-2xl bg-white p-4 w-full" key={idx}>
                        <div className={`w-10 h-10 p-3 flex justify-center mb-4 rounded-full items-center ${summaryCard.title === 'Received' ? 'bg-[#F0FDF4] text-[#40B773]' : 'bg-[#F9F0EE] text-[#F74F25]'}`}>
                            {summaryCard.icon}
                        </div>
                        <p className="text-[#9AA4B2] text-sm">Total Amount {summaryCard.title}</p>
                        <h1 className="text-[#121926] text-[20px] font-black py-1">{FormatCurrency(summaryCard.amount)}</h1>
                        <p className="text-[#9AA4B2] text-xs"> This {summaryCard.range}</p>
                    </div>
                ))}
            </div>
            {/* Recent Transactions */}
            <RecentTransactions />
        </>
    )
}