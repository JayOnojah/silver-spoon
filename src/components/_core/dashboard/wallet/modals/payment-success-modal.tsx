import { useState } from 'react';

import { 
    Mail, 
    MessageCircle, 
    Copy, 
    Check, 
    Link 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PaymentLinkModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void
}

export default function PaymentSuccessModal({ open, onOpenChange }: PaymentLinkModalProps) {
    const [copied, setCopied] = useState(false);

    const paymentLink = "https://Silverspoon/Paystack--b4b58555-...";

    const handleCopy = () => {
        navigator.clipboard.writeText(paymentLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md font-sans bg-linear-to-br from-emerald-50 rounded-3xl via-white to-white border-0 shadow-2xl">
                {/* Success Icon */}
                <div className="flex justify-center mt-8 mb-4">
                    <div className="bg-emerald-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Check className="text-white" size={25} strokeWidth={3} />
                    </div>
                </div>

                <DialogHeader className="text-center space-y-3">
                    <DialogTitle className="text-2xl text-center font-black text-[#121926]">
                        Payment Link Generated Successfully!
                    </DialogTitle>
                    <DialogDescription className="text-center text-[#9AA4B2] px-2">
                        Copy and share with your customer and payment will automatically reflect on your wallet once it's made
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    {/* Share Link Card */}
                    <div className="bg-[#F9F0EE] p-5 rounded-2xl">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Link className="text-gray-600" size={18} />
                                <Label className="font-semibold text-[#4B5565]">Share Link</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Input
                                    value={paymentLink}
                                    readOnly
                                    className="flex-1 border-gray-200 text-gray-700"
                                />
                                <Button
                                    onClick={handleCopy}
                                    size="icon"
                                    className="bg-orange-500 hover:bg-orange-600 shrink-0"
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#F74F25] hover:shadow-md transition-all"
                        >
                            <MessageCircle className="w-8 h-8 text-gray-700" />
                            <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                        </button>

                        <button
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#F74F25] hover:shadow-md transition-all"
                        >
                            <Mail className="w-8 h-8 text-gray-700" />
                            <span className="text-sm font-medium text-gray-900">Email</span>
                        </button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}