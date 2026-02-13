'use client'
import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FinanceReportTabs } from "@/src/components/_core/dashboard/finance/finance-report/tabs";
import { FinanceReport } from "@/src/components/_core/dashboard/finance/finance-report/finance-report";
import { Expenses } from "@/src/components/_core/dashboard/finance/finance-report/expenses";

const FinanceReportPage = () => {
    const [activeTab, setActiveTab] = useState('finance-report');

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-[#121926] font-black text-2xl pb-2">Finance</h1>
                    <p className="text-[#9AA4B2]">Manage your finances and payments</p>
                </div>
                <Select>
                    <SelectTrigger className="w-45 border border-[#CDD5DF] font-bold text-[#9AA4B2]">
                        <SelectValue placeholder="This Month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="text-[#9AA4B2] font-bold">
                            <SelectItem value="light">Last Week</SelectItem>
                            <SelectItem value="dark">This Month</SelectItem>
                            <SelectItem value="system">Last Week</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <FinanceReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'finance-report' && <FinanceReport />}
            {activeTab === 'expenses' && <Expenses />}
        </>
    )
}

export default FinanceReportPage;
