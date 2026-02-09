'use client'

import { useState } from "react"
import { StaffTabs } from "./tabs/staff-tabs"
import { RecentActivities } from "./tabs/recent-activities"

export const StaffOperations = () => {
    const [activeTab, setActiveTab] = useState('recent-activities');
    return (
        <div className="pt-6">
            <StaffTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'recent-activities' && <RecentActivities />}
        </div>
    )
}