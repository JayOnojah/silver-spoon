import { useState } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trash } from '../../../../design-operations/svg';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/src/components/ui/input';

export const Properties = () => {
    const [customerSource, setCustomerSource] = useState('referral');
    const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);
    const [customProperties, setCustomProperties] = useState<Array<{ id: number; type: string; value: string }>>([]);
    const [nextId, setNextId] = useState(1);

    const getPlaceholder = () => {
        switch (customerSource) {
            case 'referral':
                return 'Select Customer';
            case 'social':
                return 'Select Social Media';
            default:
                return 'e.g., Exhibition, Friend’s, Family etc';
        }
    };

    const handleAddCustomProperties = () => {
        setCustomProperties([...customProperties, { id: nextId, type: '', value: '' }]);
        setNextId(nextId + 1);
    };

    const handleRemoveProperty = (id: number) => {
        setCustomProperties(customProperties.filter(prop => prop.id !== id));
    };

    const handleUpdateProperty = (id: number, field: 'type' | 'value', newValue: string) => {
        setCustomProperties(customProperties.map(prop =>
            prop.id === id ? { ...prop, [field]: newValue } : prop
        ));
    };

    return (
        <div className="p-6 mt-4 bg-white rounded-2xl w-full">
            <h2 className="font-bold mb-4 text-[#121926]">Properties</h2>
            <div className='border p-6 border-[#CDD5DF] rounded-xl mb-4'>
                {/* Customer Source Radio Group */}
                <div className="mb-4">
                    <Label htmlFor="customer-source" className="block font-medium text-[#4B5565] mb-2">
                        Customer Source<span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                        id="customer-source"
                        value={customerSource}
                        onValueChange={setCustomerSource}
                        className="flex items-center space-x-6"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="referral" id="referral" />
                            <Label htmlFor="referral" className='text-sm text-[#121926] font-bold cursor-pointer'>Customer Referral</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="social" id="social" />
                            <Label htmlFor="social" className='text-sm text-[#121926] font-bold cursor-pointer'>Social Media</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="others" id="others" />
                            <Label htmlFor="others" className='text-sm text-[#121926] font-bold cursor-pointer'>Others</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Select Customer Dropdown */}
                <div>
                    <Label htmlFor="select-customer" className="block font-medium text-[#4B5565] mb-2">
                        Select Customer<span className="text-red-500">*</span>
                    </Label>
                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                        <SelectTrigger className="w-full h-12! rounded-xl">
                            <SelectValue placeholder={getPlaceholder()} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="customer1">Customer A</SelectItem>
                            <SelectItem value="customer2">Customer B</SelectItem>
                            <SelectItem value="customer3">Customer C</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {customProperties.map((property) => (
                <div key={property.id} className='border border-[#CDD5DF] p-6 rounded-xl mb-6'>
                    <div className='mb-4'>
                        <div className='flex justify-between items-center'>
                            <Label className="block font-medium text-[#4B5565] mb-2">
                                Property Type<span className="text-red-500">*</span>
                            </Label>
                            <button
                                className='cursor-pointer'
                                onClick={() => handleRemoveProperty(property.id)}
                            >
                                <Trash />
                            </button>
                        </div>
                        <Input
                            placeholder="e.g., Age, Gender, Class etc"
                            className="w-full h-12! rounded-xl placeholder:text-[#9AA4B2] text-[#121926]"
                            value={property.type}
                            onChange={(e) => handleUpdateProperty(property.id, 'type', e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="block font-medium text-[#4B5565] mb-2">
                            Property Value<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            placeholder="Enter Value"
                            className="w-full h-12! rounded-xl placeholder:text-[#9AA4B2] text-[#121926]"
                            value={property.value}
                            onChange={(e) => handleUpdateProperty(property.id, 'value', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            {/* Add Custom Properties Button */}
            <Button
                onClick={handleAddCustomProperties}
                className="bg-[#F74F25] h-12 hover:bg-[#F74F25]/90 text-white"
            >
                + Custom Properties
            </Button>
        </div>
    );
};