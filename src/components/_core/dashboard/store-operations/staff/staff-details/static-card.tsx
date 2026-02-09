interface StatsCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}

export const StatsCard = ({
    icon,
    value,
    label,
}: StatsCardProps) => {
    return (
        <div className="bg-white p-4 rounded-2xl">
            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[20px] font-black my-2 text-[#121926]">{value}</span>
                <span className="text-sm text-[#9AA4B2]">{label}</span>
            </div>
        </div>
    );
};