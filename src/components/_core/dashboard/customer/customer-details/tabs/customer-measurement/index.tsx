import { Edit, Trash } from "../../../../design-operations/svg"
import { Copy } from "lucide-react"

interface Measurementa {
    id: number;
    label: string;
    value: string;
}

const measurements: Measurementa[] = [
    { id: 1, label: 'Bust', value: '36 Inches' },
    { id: 2, label: 'Waist', value: '28 Inches' },
    { id: 3, label: 'Hips', value: '38 Inches' },
    { id: 4, label: 'Shoulder Width', value: '16 Inches' },
    { id: 5, label: 'Sleeve Length', value: '24 Inches' },
    { id: 6, label: 'Inseam', value: '30 Inches' },
];

export const CustomerMeasurement = () => {
    return (
        <div className="bg-white rounded-2xl p-6 mt-4 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-[#121926] font-bold">Measurements</h1>
                <button className="text-[#F74F25] text-sm font-bold flex items-center gap-1 cursor-pointer">
                    <Edit />
                    Edit Measurements
                </button>
            </div>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {measurements.map((measurement) => (
                    <div className="bg-[#F9F0EE] p-4 rounded-xl flex items-start justify-between" key={measurement.id}>
                        <div>
                            <p className="text-[#9AA4B2] text-xs">{measurement.label}</p>
                            <p className="text-[#121926] text-sm font-bold mt-2">{measurement.value}</p>
                        </div>
                        <div className="flex gap-4 text-[#9AA4B2]">
                            <button className="cursor-pointer">
                                <Copy size={20} />
                            </button>
                            <button className="cursor-pointer">
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border border-[#F74F25] bg-[#F9F0EE] p-4 rounded-xl">
                <p className="text-[#9AA4B2] text-xs mb-1">Measurement Notes</p>
                <h1 className="text-[#121926] font-bold text-sm">Customer prefers slightly loose fit around waist area</h1>
            </div>
        </div>
    )
}