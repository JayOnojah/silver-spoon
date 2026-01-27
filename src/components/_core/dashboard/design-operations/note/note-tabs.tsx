'use client';

import { useState, useRef, useEffect } from 'react';

interface Tab {
    id: string;
    label: string;
    count: number;
}

// Move tabs outside the component so it's not recreated on every render
const tabs: Tab[] = [
    { id: 'all-notes', label: 'All Notes', count: 30 },
    { id: 'orders', label: 'For Orders', count: 30 },
    { id: 'customers', label: 'For Customers', count: 30 },
];

export default function NoteTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
        const activeElement = tabRefs.current[activeIndex];

        if (activeElement) {
            setIndicatorStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth,
            });
        }
    }, [activeTab]); // Remove 'tabs' from dependencies

    return (
        <div className="w-full bg-white rounded-xl pr-6">
            <div className="relative overflow-x-auto">
                <div className="flex gap-8 px-6 whitespace-nowrap">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative py-4 text-sm cursor-pointer font-bold transition-colors duration-200 ${activeTab === tab.id
                                    ? 'text-[#121926]'
                                    : 'text-[#9AA4B2] hover:text-gray-600'
                                }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>

                {/* Animated underline indicator */}
                <div
                    className="absolute bottom-0 h-1 bg-[#F74F25] transition-all duration-300 ease-out"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                    }}
                />
            </div>
        </div>
    );
}