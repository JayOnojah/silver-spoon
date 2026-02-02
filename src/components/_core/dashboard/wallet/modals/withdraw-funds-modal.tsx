'use client';

import { ReactNode, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormatCurrency } from '../format-currency';
import EditBankAccountModal from './edit-bank-account';
import { WithdrawalSuccessModal } from './withdrawal-success-modal';
import { Edit } from '../../design-operations/svg';
import Image from 'next/image';

interface WithdrawFundsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    btnName: string;
    icon: ReactNode
}

export default function WithdrawFundsModal({
    btnName,
    icon
}: WithdrawFundsModalProps) {
    const [amount, setAmount] = useState('');
    const availableBalance = 893000;
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showEditBank, setShowEditBank] = useState(false);
    const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);

    const handleMaxClick = () => {
        setAmount(availableBalance.toString());
    };

    const handleWithdraw = () => {
        setShowWithdraw(false);
        setShowWithdrawSuccess(true);
    };

    const handleOpenEditBank = () => {
        setShowWithdraw(false);
        setShowEditBank(true);
    };

    const handleBackToWithdraw = () => {
        setShowEditBank(false);
        setShowWithdraw(true);
    };

    return (
        <>
            <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
                <DialogTrigger asChild>
                    <Button variant={'outline'} className="text-[#F74F25] w-full md:w-51 px-6! border-[#F74F25] rounded-xl h-12 font-bold hover:bg-transparent hover:text-[#F74F25]">
                        {icon}
                        {btnName}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl font-sans">
                    <DialogHeader className="px-8 pt-8 pb-6">
                        <DialogTitle className="text-2xl font-black text-[#121926]">
                            Withdraw Funds
                        </DialogTitle>
                    </DialogHeader>

                    <div className="px-8 pb-8 space-y-6">
                        <div className="bg-[#F9F0EE] rounded-lg p-6 text-center">
                            <div className="text-sm text-[#9AA4B2] mb-2">Available Balance</div>
                            <div className="text-2xl font-black text-[#121926]">
                                {FormatCurrency(availableBalance)}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-base text-[#4B5565] font-medium">
                                Amount <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="amount"
                                    type="text"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pr-16 h-12 text-base"
                                />
                                <button
                                    type="button"
                                    onClick={handleMaxClick}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F74F25] cursor-pointer font-bold hover:text-[#F74F25]/90"
                                >
                                    Max
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#F9F0EE] rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-[#090202]">Bank details</h3>
                                <button
                                    onClick={handleOpenEditBank}
                                    className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-800">
                                    <Edit />
                                    <span className="text-sm text-[#9AA4B2] font-bold">Edit</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <Image src="/images/pngs/zenith.png" alt='icon' width={15} height={15} />
                                </div>
                                <div>
                                    <div className="font-bold text-base text-[#121926]">Zenith bank</div>
                                    <div className="text-[#9AA4B2] text-sm">22242356712</div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleWithdraw}
                            disabled={!amount}
                            className="w-full h-12 bg-[#F74F25] hover:bg-[#F74F25]/90 text-white text-base font-semibold rounded-xl"
                        >
                            Withdraw Funds
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <EditBankAccountModal
                open={showEditBank}
                onOpenChange={setShowEditBank}
                onBack={handleBackToWithdraw}
            />
            <WithdrawalSuccessModal
                open={showWithdrawSuccess} 
                onOpenChange={setShowWithdrawSuccess}
            />
        </>
    );
}