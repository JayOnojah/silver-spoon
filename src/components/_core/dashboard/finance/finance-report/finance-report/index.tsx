import { StatsCard } from "./static-card"
import { Cash } from "../../../customer/svg"
import { CoinStackSm, GraphBarSm, CashBill } from "../../svg"
import { Cart } from "../../svg"
import { RevenueOverview } from "./revenue-overview"
import { OrderBreakdown } from "./order-breakdown"
import { ExpenseBreakdown } from "./expense-breakdown"
import { RevenueCostsBreakdown } from "./revenue-cost-breakdown"
import { PaymentMethodsUsed } from "./payment-methods"

export const FinanceReport = () => {

    const FinanceReportCards = [
        {
            icon: <CoinStackSm />,
            range: '+12%vs Last Month',
            value: 300000,
            label: 'Total Revenue'
        },
        {
            icon: <Cash />,
            range: '+12%vs Last Month',
            value: 300000,
            label: 'Net Profit'
        },
        {
            icon: <GraphBarSm />,
            range: '+12%vs Last Month',
            value: 300000,
            label: 'Total Expenses'
        },
        {
            icon: <CashBill />,
            range: '85% of budget',
            value: 300000,
            label: 'Expenditure Made'
        },
        {
            icon: <Cart />,
            range: null,
            value: 300,
            label: 'Paid Orders'
        },
        {
            icon: <Cart />,
            range: null,
            value: 300,
            label: 'Awaiting payment'
        },
    ]

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {FinanceReportCards.map((card, idx) => (
                    <StatsCard
                        key={idx}
                        className={idx >= 4 ? 'lg:col-span-2' : ''}
                        value={card.value}
                        range={card.range}
                        label={card.label}
                        icon={card.icon}
                    />
                ))}
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mt-6">
                <RevenueOverview />
                <OrderBreakdown />
            </div>
            <ExpenseBreakdown />
            <RevenueCostsBreakdown />
            <PaymentMethodsUsed />
        </>
    )
}