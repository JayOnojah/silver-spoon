"use client";

const clients = [
    { rank: 1, name: "Sarah Jones", referrals: 12 },
    { rank: 2, name: "Sarah Jones", referrals: 12 },
    { rank: 3, name: "Sarah Jones", referrals: 12 },
    { rank: 4, name: "Sarah Jones", referrals: 12 },
    { rank: 5, name: "Sarah Jones", referrals: 12 },
    { rank: 6, name: "Sarah Jones", referrals: 12 },
    { rank: 7, name: "Michael Brown", referrals: 12 },
    { rank: 8, name: "Emily White", referrals: 12 },
    { rank: 9, name: "David Green", referrals: 12 },
    { rank: 10, name: "David Green", referrals: 12 },
];

export default function TopReferringClients() {
    return (
        <div className="w-full bg-white rounded-2xl p-5">
            {/* Header */}
            <h2 className="text-sm font-bold text-[#121926] mb-4">
                Top 10 Referring Clients
            </h2>

            {/* List */}
            <div className="flex flex-col divide-y divide-gray-50">
                {clients.map((client) => (
                    <div
                        key={client.rank}
                        className="flex items-center gap-4 py-2.5"
                    >
                        {/* Rank */}
                        <span className="w-5 text-sm text-[#F4511E] text-right shrink-0 font-medium">
                            {client.rank}
                        </span>

                        {/* Name */}
                        <span className="flex-1 text-sm text-gray-400">
                            {client.name}
                        </span>

                        {/* Referrals */}
                        <span className="text-sm text-[#121926] font-medium shrink-0">
                            {client.referrals} Referrals
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}