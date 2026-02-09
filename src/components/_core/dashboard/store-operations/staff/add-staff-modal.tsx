"use client";

import { useState } from "react";
import { X, Phone } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddStaffModal({
   
}) {
    const [open, onOpenChange] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryCode: "+234",
        permissions: {
            customers: false,
            orders: false,
            designOperations: false,
            inventory: false,
            analytics: false,
            storeOperations: false,
            wallet: false,
            marketing: false,
            finance: false,
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        onOpenChange(false);
    };

    const handlePermissionChange = (permission: keyof typeof formData.permissions) => {
        setFormData((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permission]: !prev.permissions[permission],
            },
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-[#F74F25] rounded-2xl w-full md:w-36 text-white h-12 font-bold font-sans hover:bg-[#F74F25]/90">
                    <Plus className="w-5 h-5" />
                    New Staff
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-150 p-0 gap-0 rounded-3xl py-3">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-2xl font-black text-[#121926]">
                        Add New Staff Member
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="px-6 pb-6">
                    <div className="space-y-4">
                        {/* First Name and Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, firstName: e.target.value })
                                    }
                                    required
                                    className="h-12 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, lastName: e.target.value })
                                    }
                                    required
                                    className="h-12 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter Email Address"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                className="h-12 rounded-xl"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                Phone Number <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex gap-2">
                                <Select
                                    value={formData.countryCode}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, countryCode: value })
                                    }
                                >
                                    <SelectTrigger className="w-27.5 h-12! rounded-xl">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="+234">+234</SelectItem>
                                        <SelectItem value="+1">+1</SelectItem>
                                        <SelectItem value="+44">+44</SelectItem>
                                        <SelectItem value="+91">+91</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="relative flex-1">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter Mobile Number"
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phoneNumber: e.target.value })
                                        }
                                        required
                                        className="h-12 pl-10 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Permissions */}
                        <div className="space-y-3">
                            <Label>
                                Permissions<span className="text-red-500">*</span>
                            </Label>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="customers"
                                        checked={formData.permissions.customers}
                                        onCheckedChange={() => handlePermissionChange("customers")}
                                    />
                                    <label
                                        htmlFor="customers"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Customers
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="orders"
                                        checked={formData.permissions.orders}
                                        onCheckedChange={() => handlePermissionChange("orders")}
                                    />
                                    <label
                                        htmlFor="orders"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Orders
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="designOperations"
                                        checked={formData.permissions.designOperations}
                                        onCheckedChange={() =>
                                            handlePermissionChange("designOperations")
                                        }
                                    />
                                    <label
                                        htmlFor="designOperations"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Design Operations
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="inventory"
                                        checked={formData.permissions.inventory}
                                        onCheckedChange={() => handlePermissionChange("inventory")}
                                    />
                                    <label
                                        htmlFor="inventory"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Inventory
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="analytics"
                                        checked={formData.permissions.analytics}
                                        onCheckedChange={() => handlePermissionChange("analytics")}
                                    />
                                    <label
                                        htmlFor="analytics"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Analytics
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="storeOperations"
                                        checked={formData.permissions.storeOperations}
                                        onCheckedChange={() =>
                                            handlePermissionChange("storeOperations")
                                        }
                                    />
                                    <label
                                        htmlFor="storeOperations"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Store Operations
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="wallet"
                                        checked={formData.permissions.wallet}
                                        onCheckedChange={() => handlePermissionChange("wallet")}
                                    />
                                    <label
                                        htmlFor="wallet"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Wallet
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="marketing"
                                        checked={formData.permissions.marketing}
                                        onCheckedChange={() => handlePermissionChange("marketing")}
                                    />
                                    <label
                                        htmlFor="marketing"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Marketing
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="finance"
                                        checked={formData.permissions.finance}
                                        onCheckedChange={() => handlePermissionChange("finance")}
                                    />
                                    <label
                                        htmlFor="finance"
                                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Finance
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl font-bold bg-[#F74F25] hover:bg-[#F74F25]/90 text-white mt-6"
                        >
                            Send Invitation
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}