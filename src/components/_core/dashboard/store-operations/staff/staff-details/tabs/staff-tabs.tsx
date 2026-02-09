'use client';

import { useState, useRef, useEffect } from 'react';

interface StaffTabsProps {
    activeTab: string;
    setActiveTab: (id: string) => void
}

interface Tab {
    id: string;
    label: string;
}

const tabs: Tab[] = [
    { id: 'recent-activities', label: 'Recent Activities' },
    { id: 'task-todos', label: 'Task & Todos' },
    { id: 'notes', label: 'Notes' },
];

export const StaffTabs = ({activeTab, setActiveTab}: StaffTabsProps) => {
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
    }, [activeTab]);

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
                            {tab.label}
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