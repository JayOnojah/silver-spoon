'use client'

import { useState } from 'react';
import { CustomerTabs } from "./customer-tabs"
import { CustomerOrders } from './orders';
import { Appointments } from './appointments';
import { CustomerMeasurement } from './customer-measurement';
import { Moodboard } from './moodboard.tsx';

export const CustomerOperations = () => {
    const [activeTab, setActiveTab] = useState('orders');

    return (
        <div className="mt-6 flex flex-col w-full md:flex-row justify-between gap-8 items-start">
            <div className='w-full'>
                <CustomerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'orders' && <CustomerOrders />}
                {activeTab === 'customer-measurements' && <CustomerMeasurement />}
                {activeTab === 'moodboard' && <Moodboard />}
            </div>
            <Appointments />
        </div>
    )
}