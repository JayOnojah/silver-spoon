import { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import {
    Globe,
    Link,
    Copy,
    Check,
    MessageCircle,
    Mail,
    Share2,
    Instagram,
    Facebook
} from 'lucide-react';

interface ShareCollectionProps {
    shareUrl?: string;
    onTogglePublic?: (isPublic: boolean) => void;
    onShare?: (platform: string) => void;
}

export const ShareCollection = ({
    shareUrl = "https://Silverspoon/Paystack--b4b58555-a109-4cfa...",
    onTogglePublic,
    onShare
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
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Share2 className="w-5 h-5 text-[#9AA4B2]" />
                            </button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Share</p>
                    </TooltipContent>
                </Tooltip>

                <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl border-0 font-sans">
                    <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between px-8 pt-8 pb-6">
                            <div>
                                <DialogTitle className="text-2xl font-black text-[#121926] mb-2">
                                    Share Collection
                                </DialogTitle>
                                <p className="text-sm text-[#9AA4B2]">
                                    Generate a shareable link for this collection
                                </p>
                            </div>

                        </div>

                        <div className="md:px-8 px-4 md:pb-8 pb-4">
                            {/* Set as Public Section */}
                            <div className="bg-[#F9F0EE] rounded-2xl p-5 mb-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <Globe className="w-6 h-6 text-[#9AA4B2]" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-[#121926] text-base mb-1">
                                                Set as Public
                                            </h3>
                                            <p className="text-[#9AA4B2] text-sm">
                                                When enabled, anyone with the link can view this catalogue.
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={isPublic}
                                        onCheckedChange={handleTogglePublic}
                                        className="data-[state=checked]:bg-[#F74F25]"
                                    />
                                </div>
                            </div>
                            {/* Divider */}
                            <div className="border-t border-gray-200 mb-6" />
                            {/* Share Link Section */}
                            <div className="bg-[#F9F0EE] rounded-2xl p-5 mb-6">
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
                                                className="w-12 h-12 bg-[#F74F25] hover:bg-[#F74F25]/90 rounded-xl flex items-center justify-center transition-colors shrink-0"
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
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#F74F25] hover:shadow-md transition-all"
                                >
                                    <MessageCircle className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                                </button>

                                <button
                                    onClick={() => handleSharePlatform('email')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#F74F25] hover:shadow-md transition-all"
                                >
                                    <Mail className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Email</span>
                                </button>

                                <button
                                    onClick={() => handleSharePlatform('instagram')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#F74F25] hover:shadow-md transition-all"
                                >
                                    <Instagram className="w-8 h-8 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Instagram</span>
                                </button>

                                <button
                                    onClick={() => handleSharePlatform('facebook')}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#F74F25] hover:shadow-md transition-all"
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