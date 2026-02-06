import { Check } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/src/components/ui/button';

interface PaymentLinkModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void
}

export const WithdrawalSuccessModal = ({ open, onOpenChange }: PaymentLinkModalProps) => {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md font-sans bg-linear-to-b from-green-100/50 rounded-3xl via-green to-white border-0 shadow-2xl">
                {/* Success Icon */}
                <div className="flex justify-center mt-8 mb-4">
                    <div className="bg-emerald-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Check className="text-white" size={25} strokeWidth={3} />
                    </div>
                </div>

                <DialogHeader className="text-center space-y-3">
                    <DialogTitle className="text-2xl text-center font-black text-[#121926]">
                        Withdrawal Request<br /> Successful🎉
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#9AA4B2] px-2">
                        Your withdrawals will be processed within the<br /> next 48 hours
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={() => onOpenChange(false)} className='bg-[#F74F25] h-12 mt-6 w-full flex-1 text-white font-bold rounded-xl'>
                    Back To Wallet
                </Button>
            </DialogContent>
        </Dialog>
    );
}