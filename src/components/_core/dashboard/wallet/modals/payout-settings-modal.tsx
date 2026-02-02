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
import { Edit } from '../../design-operations/svg';
import Image from 'next/image';

interface PayoutSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    btnName: string;
    icon: ReactNode
}

export default function PayoutSettingsModal({
    btnName,
    icon
}: PayoutSettingsModalProps) {
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showEditBank, setShowEditBank] = useState(false);


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
                    <Button variant={'outline'} className="text-[#9AA4B2] px-6! w-full md:w-51 border-[#9AA4B2] rounded-xl h-12 font-bold hover:bg-transparent hover:text-[#9AA4B2]">
                        {icon}
                        {btnName}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl font-sans">
                    <DialogHeader className="px-8 pt-8 pb-6">
                        <DialogTitle className="text-2xl font-black text-[#121926]">
                            Payout Settings
                        </DialogTitle>
                    </DialogHeader>
                    <div className="bg-[#F9F0EE] rounded-lg p-6 mx-6 mb-6">
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
                </DialogContent>
            </Dialog>
            <EditBankAccountModal
                open={showEditBank}
                onOpenChange={setShowEditBank}
                onBack={handleBackToWithdraw}
            />
        </>
    );
}