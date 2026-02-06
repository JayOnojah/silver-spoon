'use client'

import { useState } from "react"
import { WalletTabs } from "@/src/components/_core/dashboard/wallet/tabs/wallet-tabs"
import { Overview } from "@/src/components/_core/dashboard/wallet/tabs/overview"
import { AllTransactions } from "@/src/components/_core/dashboard/wallet/tabs/all-transactions"
import { PaymentLinks } from "@/src/components/_core/dashboard/wallet/tabs/payment-links"

const Wallet = () => {
    const [activeTab, setActiveTab] = useState('overview')
    return (
        <>
            <h1 className="text-[#121926] font-black text-2xl mb-6">Wallet</h1>
            <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            { activeTab === 'overview' && <Overview /> }
            { activeTab === 'all-transactions' && <AllTransactions /> }
            { activeTab === 'payment-links' && <PaymentLinks /> }
        </>
    )
}

export default Wallet