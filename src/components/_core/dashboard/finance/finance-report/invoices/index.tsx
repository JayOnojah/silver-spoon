import { StatsCard } from "../static-card"
import { CoinStackSm } from "../../svg"
import { Cash } from "../../../customer/svg"
import { AllInvoice } from "./all-invoice"

export const Invoices = () => {
    const invoicesStats = [
        {
            icon: <CoinStackSm />,
            range: '+12%vs Last Month',
            value: 300000,
            label: 'Total Paid'
        },
        {
            icon: <Cash />,
            range: '24 Invoices',
            value: 300000,
            label: 'Total Outstanding'
        },
    ]

    return (
        <>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                {invoicesStats.map((stat, idx) => (
                    <StatsCard
                        key={idx}
                        icon={stat.icon}
                        range={stat.range}
                        label={stat.label} 
                        value={stat.value}
                    />
                ))}
            </div>
            <AllInvoice />
        </>
    )
}