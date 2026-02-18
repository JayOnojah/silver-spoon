import { StatsCard } from "../../finance/finance-report/static-card"
import { UserGroup } from "@/src/app/dashboard/analytics/svg"
import { CalenderCheck, Cart } from "../../finance/svg"
import { Clock } from "lucide-react"
import OrderStatusChart from "./order-status-breakdown"
import { CustomerAcquisitionSources } from "./customer-aquisition-sources"
import OrderOverviewChart from "./order-overview"
import TopCustomers from "./top-customers"
import TopReferringClients from "./top-preferring-client"
import CatalogueCollectionViews from "./catalogue-collection-views"

export const BusinessAnalytics = () => {

    const analyticsCard = [
        {
            icon: <UserGroup />,
            range: '+12%vs Last Month',
            value: 300,
            label: 'Total Customers'
        },
        {
            icon: <UserGroup />,
            range: '+12%vs Last Month',
            value: 400,
            label: 'No. of New Customer'
        },
        {
            icon: <Cart />,
            range: '+12%vs Last Month',
            value: 500,
            label: 'Total Orders'
        },
        {
            icon: <CalenderCheck />,
            range: '+12%vs Last Month',
            value: 300,
            label: 'Completed Orders'
        },
        {
            icon: <Clock className="text-[#F74F25] stroke-1" />,
            range: null,
            value: 230,
            label: 'Overdue Orders'
        },
    ]

    return (
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-6 gap-4">
                {analyticsCard.map((analytics, idx) => (
                    <StatsCard
                        key={idx}
                        icon={analytics.icon}
                        range={analytics.range}
                        value={analytics.value}
                        label={analytics.label}
                    />
                ))}
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mt-6">
                <OrderStatusChart />
                <CustomerAcquisitionSources />
            </div>
            <OrderOverviewChart />
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mt-6">
                <TopCustomers />
                <TopReferringClients />
            </div>
            <CatalogueCollectionViews />
        </div>
    )
}