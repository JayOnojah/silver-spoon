'use client'

import { useState, useMemo, useEffect } from 'react';
import { Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FormatCurrency } from '../../format-currency';

interface Transaction {
    id: string;
    type: 'order' | 'withdrawal';
    orderNumber?: string;
    amount: number;
    date: string;
    status: 'Completed' | 'In Progress';
}

const transactions: Transaction[] = [
    {
        id: '1',
        type: 'order',
        orderNumber: 'ORD-1001',
        amount: 45000.00,
        date: 'Dec 19, 2025, 10:30 AM',
        status: 'Completed'
    },
    {
        id: '2',
        type: 'order',
        orderNumber: 'ORD-1001',
        amount: 45000.00,
        date: 'Dec 19, 2025, 10:30 AM',
        status: 'Completed'
    },
    {
        id: '3',
        type: 'withdrawal',
        amount: -15000,
        date: 'Dec 19, 2025, 10:30 AM',
        status: 'Completed'
    },
    {
        id: '4',
        type: 'order',
        orderNumber: 'ORD-1001',
        amount: 45000.00,
        date: 'Dec 19, 2025, 10:30 AM',
        status: 'Completed'
    },
    {
        id: '5',
        type: 'withdrawal',
        amount: -15000,
        date: 'Dec 19, 2025, 10:30 AM',
        status: 'In Progress'
    }
];

export const RecentTransactions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery])

    const filteredTransactions = useMemo(() => {
        let filtered = transactions;

        if (debouncedQuery.trim()) {
            filtered = filtered.filter((transaction) =>
                transaction.orderNumber?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                transaction.type.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
        }

        return filtered;
    }, [debouncedQuery]);


    return (
        <div className="w-full p-6 bg-white rounded-2xl font-sans mt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-bold text-[#121926]">Recent Transactions</h1>
                <button className="text-[#F74F25] hover:text-[#F74F25]/90 text-sm hover:underline cursor-pointer">
                    View All
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[#9AA4B2]" />
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by order number, customer name..."
                    className="w-full pl-12 pr-4 py-6 md:text-base text-xs border-gray-200 rounded-lg text-[#9AA4B2]"
                />
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="bg-white border border-[#CDD5DF] rounded-xl md:p-4 p-2 py-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`md:w-12 md:h-12 w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'order'
                                ? 'bg-[#F0FDF4]'
                                : 'bg-[#F9F0EE]'
                                }`}>
                                {transaction.type === 'order' ? (
                                    <ArrowDownLeft className="w-5 h-5 text-[#40B773]" />
                                ) : (
                                    <ArrowUpRight className="w-5 h-5 text-[#FF5B4D]" />
                                )}
                            </div>

                            {/* Transaction Details */}
                            <div>
                                <h3 className="md:text-sm text-xs font-bold text-[#121926] mb-1">
                                    {transaction.type === 'order' ? transaction.orderNumber : 'Withdrawal'}
                                </h3>
                                <p className="text-[10px] md:text-xs text-[#9AA4B2]">{transaction.date}</p>
                            </div>
                        </div>

                        {/* Amount and Status */}
                        <div className="flex flex-col items-end gap-2">
                            <p className={`text-xs md:text-sm font-bold ${transaction.amount > 0 ? 'text-[#40B773]' : 'text-[#FF5B4D]'
                                }`}>
                                {transaction.amount > 0 ? '+' : ''} {FormatCurrency(transaction.amount)}
                            </p>

                            <Badge
                                variant="outline"
                                className={`rounded-full md:text-xs text-[10px] font-medium ${transaction.status === 'Completed'
                                    ? 'bg-[#F0FDF4] text-[#22C55E] border-[#22C55E]'
                                    : 'bg-[#FEFCE8] text-[#71451F] border-[#71451F]'
                                    }`}
                            >
                                {transaction.status}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}