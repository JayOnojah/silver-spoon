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
import { AnalyticsTabs } from "@/src/components/_core/dashboard/analytics/analytics-tabs";
import { BusinessAnalytics } from "@/src/components/_core/dashboard/analytics/business-analytics";

export default function BusinessAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('business-analytics');

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[#121926] font-black text-2xl pb-2">Analytics</h1>
          <p className="text-[#9AA4B2]">Track your business performance</p>
        </div>
        <Select>
          <SelectTrigger className="w-45 h-12! border border-[#CDD5DF] font-bold text-[#9AA4B2]">
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
      <AnalyticsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'business-analytics' && <BusinessAnalytics />}
    </>
  )
}