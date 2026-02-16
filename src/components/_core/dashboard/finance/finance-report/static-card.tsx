import { FormatCurrency } from "../../shared/format-currency";
interface StatsCardProps {
    icon: React.ReactNode;
    value: number;
    label: string;
    range?: string | null;
    className?: string;
}

export const StatsCard = ({
    icon,
    value,
    label,
    range,
    className
}: StatsCardProps) => {
    return (
        <div className={`bg-white p-4 rounded-2xl ${className ?? ''}`}>
            <div className="flex justify-between items-center ">
                <div>
                    {icon}
                </div>
                <p className={`text-xs ${label === 'Expenditure Made' ? 
                    'text-[#9AA4B2]' 
                    : label === 'Total Outstanding'
                    ? 'text-[#FF5B4D]' : 'text-[#40B773]'}`}>{range}</p>
            </div>
            <div className="flex flex-col">
                <span className="text-[20px] font-black my-2 text-[#121926]">{range === null ? value : FormatCurrency(value) }</span>
                <span className="text-sm text-[#9AA4B2]">{label}</span>
            </div>
        </div>
    );
};