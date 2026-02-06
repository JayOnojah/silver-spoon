'use client'

import { useState } from "react";
import { Plus } from "lucide-react";
import { AllCustomer } from "@/src/components/_core/dashboard/customer";
import CreateCustomerModal from "@/src/components/_core/dashboard/customer/modals/create-customer-modal";

const Customer = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="font-sans flex-col md:flex-row flex justify-between gap-4 md:items-center">
                <h1 className="text-2xl font-black text-[#121926]">Customer</h1>
                <CreateCustomerModal open={open} setOpen={setOpen} btnName="New Customer" icon={<Plus />}/>
            </div>
            <AllCustomer />
        </>
    )
}

export default Customer;
