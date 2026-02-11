'use client'

import { useState } from "react"
import { StaffTabs } from "./tabs/staff-tabs"
import { RecentActivities } from "./tabs/recent-activities"
import { TaskTodos } from "./tabs/task-todos"
import { Notes } from "./tabs/notes"
import { Permissions } from "./permissions/permissions"

export const StaffOperations = () => {
    const [activeTab, setActiveTab] = useState('recent-activities');
    return (
        <div className="flex justify-between gap-6 items-start pt-6 w-full">
            <div className="w-full">
                <StaffTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'recent-activities' && <RecentActivities />}
                {activeTab === 'task-todos' && <TaskTodos />}
                {activeTab === 'notes' && <Notes />}
            </div>
            <Permissions />
        </div>
    )
}