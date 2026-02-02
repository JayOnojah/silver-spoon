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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface EditAddBankAccountModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBack: () => void
}

export default function EditBankAccountModal({
    open,
    onOpenChange,
    onBack,
}: EditAddBankAccountModalProps) {
    const [bankName, setBankName] = useState('Guaranterr Trust Bank');
    const [accountName, setAccountName] = useState('Oyakhilome Einstein Godstime');
    const [accountNumber, setAccountNumber] = useState('07433378393');

    const handleSaveChanges = () => {
        onBack();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl font-sans">
                <DialogHeader className="px-8 pt-8 pb-6">
                    <DialogTitle className="text-2xl mt-6 md:mt-0 text-[#121926] font-black flex gap-6 items-center">
                        <button className='cursor-pointer' onClick={onBack}>
                            <ArrowLeft className='w-5 h-5' />
                        </button>
                        Edit Bank Account
                    </DialogTitle>
                </DialogHeader>

                <div className="px-8 pb-8 space-y-6 rounded-3xl">
                    <div className="space-y-2">
                        <Label htmlFor="bank-name" className="text-base text-[#4B5565] font-medium">
                            Bank Name <span className="text-red-500">*</span>
                        </Label>
                        <Select value={bankName} onValueChange={setBankName}>
                            <SelectTrigger className="h-12! text-base w-full rounded-xl">
                                <SelectValue placeholder="Select bank" />
                            </SelectTrigger>
                            <SelectContent className='w-full'>
                                <SelectItem value="Guaranterr Trust Bank">Guaranterr Trust Bank</SelectItem>
                                <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                                <SelectItem value="Access Bank">Access Bank</SelectItem>
                                <SelectItem value="First Bank">First Bank</SelectItem>
                                <SelectItem value="UBA">UBA</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="account-name" className="text-base text-[#4B5565] font-medium">
                            Account Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="account-name"
                            type="text"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="h-12 text-base text-[#4B5565] rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="account-number" className="text-base text-[#4B5565] font-medium">
                            Account Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="account-number"
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="h-12! text-base text-[#4B5565] rounded-xl"
                        />
                    </div>

                    <Button
                        onClick={handleSaveChanges}
                        disabled={!bankName || !accountName || !accountNumber}
                        className="w-full h-14 bg-[#F74F25] hover:bg-[#F74F25]/90 text-white text-base font-bold rounded-xl"
                    >
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}