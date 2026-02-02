import { ReactNode, useState } from "react"
import { Wallet } from "../../svg"
import { FormatCurrency } from "../../format-currency"
import { Button } from "@/src/components/ui/button"
import { RecentTransactions } from "./recent-transactions"
import { PaymentLinkModal } from "../../modals/payment-link-generator"
import WithdrawFundsModal from "../../modals/withdraw-funds-modal"
import PayoutSettingsModal from "../../modals/payout-settings-modal"

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
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [payoutSettingsModalOpen, setPayoutSettingsModalOpen] = useState(false);

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
                    <PaymentLinkModal btnName="Generate Payment Link" open={paymentModalOpen} onOpenChange={setPaymentModalOpen} icon={<Link />}/>
                    <WithdrawFundsModal btnName="Withdraw Funds" open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen} icon={<ArrowUpRight />}/>
                    <PayoutSettingsModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} btnName="Payout Settings" icon={<Settings />}/>
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