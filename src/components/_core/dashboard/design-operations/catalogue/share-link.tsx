import { ReactNode, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import {
    Image,
    Link,
    Copy,
    Check,
    MessageCircle,
    Mail,
    Share2,
    Instagram,
    Facebook
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface ShareCollectionProps {
    shareUrl?: string;
    onTogglePublic?: (isPublic: boolean) => void;
    onShare?: (platform: string) => void;
    btnShare: ReactNode;
    selectedImageCount: number;
}

export const ShareLink = ({
    shareUrl = "https://Silverspoon/Paystack--b4b58555-a109-4cfa...",
    onTogglePublic,
    onShare,
    btnShare,
    selectedImageCount
}: ShareCollectionProps) => {
    const [open, setOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleTogglePublic = (checked: boolean) => {
        setIsPublic(checked);
        onTogglePublic?.(checked);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleSharePlatform = (platform: string) => {
        onShare?.(platform);
        // Add actual sharing logic here
    };

    return (
        <TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {btnShare}
                </DialogTrigger>

                <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl border-0 font-sans">
                    <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between px-8 pt-8 pb-6">
                            <div>
                                <DialogTitle className="text-2xl font-black text-[#121926] mb-2">
                                    Send To Vendor
                                </DialogTitle>
                                <p className="text-sm text-[#9AA4B2]">
                                    Share the selected designs with the vendor
                                </p>
                            </div>

                        </div>

                        <div className="md:px-8 px-4 md:pb-8 pb-4">
                            {/* Set as Public Section */}
                            <div className="bg-[#F6F6F6] flex justify-between items-center rounded-2xl p-5 mb-6">
                                <div className="flex items-center gap-2 text-[#4B5565]">
                                    <Image />
                                    <div>
                                        <span className='font-bold pr-0.5'>{selectedImageCount}</span>
                                        <span>Images Selected</span>
                                    </div>
                                </div>
                                <Button className='text-[#121926] font-500 bg-transparent hover:bg-neutral-200'>
                                    Change
                                </Button>
                            </div>
                            {/* Divider */}
                            <div className="border-t border-gray-200 mb-6" />
                            {/* Share Link Section */}
                            <div className="bg-[#F6F6F6] rounded-2xl p-5 mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Link className="w-5 h-5 text-[#9AA4B2]" />
                                    <h3 className="font-medium text-[#4B5565] text-base">
                                        Share Link
                                    </h3>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex-1 rounded-xl px-4 py-3 border border-[#CDD5DF]">
                                        <input
                                            type="text"
                                            value={shareUrl}
                                            readOnly
                                            className="w-full text-gray-700 text-sm outline-none bg-transparent"
                                        />
                                    </div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={handleCopy}
                                                className="w-12 h-12 bg-[#121926] hover:bg-[#121926]/90 rounded-xl flex items-center justify-center transition-colors shrink-0"
                                            >
                                                {copied ? (
                                                    <Check className="w-5 h-5 text-white" />
                                                ) : (
                                                    <Copy className="w-5 h-5 text-white" />
                                                )}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{copied ? 'Copied to clipboard' : 'Click to copy'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            {/* Social Share Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button
                                    onClick={() => handleSharePlatform('whatsapp')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#121926] hover:shadow-md transition-all"
                                >
                                    <MessageCircle className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                                </button>

                                <button
                                    onClick={() => handleSharePlatform('email')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#121926] hover:shadow-md transition-all"
                                >
                                    <Mail className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Email</span>
                                </button>

                                <button
                                    onClick={() => handleSharePlatform('instagram')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#121926] hover:shadow-md transition-all"
                                >
                                    <Instagram className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Instagram</span>
                                </button>

                                <button
                                    onClick={() => handleSharePlatform('facebook')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#121926] hover:shadow-md transition-all"
                                >
                                    <Facebook className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Facebook</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
};