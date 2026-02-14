import { StatsCard } from "../static-card"
import { CalenderCheck } from "../../svg"
import { AllExpenses } from "./all-expenses"

export const Expenses = () => {
    return (
        <div className="mt-6">
            <StatsCard 
                icon={<CalenderCheck />}
                value={300000}
                label="Total Expenses"
                range='+12%vs Last Month'
            />
            <AllExpenses />
        </div>
    )
}