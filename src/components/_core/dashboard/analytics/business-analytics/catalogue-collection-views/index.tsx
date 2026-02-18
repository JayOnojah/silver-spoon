"use client";

const data = [
    { name: "Bridal Elegance in t...", views: 700 },
    { name: "Bridal Elegance", views: 350 },
    { name: "Bridal Elegance", views: 320 },
    { name: "Bridal Elegance", views: 290 },
    { name: "Bridal Elegance", views: 260 },
];

const MAX_VIEWS = Math.max(...data.map((d) => d.views));

export default function CatalogueCollectionViews() {
    return (
        <div className="w-full bg-white rounded-2xl px-5 pt-5 pb-6 mt-6">
            {/* Header */}
            <h2 className="text-sm font-bold text-[#121926] mb-5">
                Catalogue Collection Views
            </h2>

            {/* Rows */}
            <div className="flex flex-col gap-3">
                {data.map((item, index) => {
                    const barWidth = (item.views / MAX_VIEWS) * 100;

                    return (
                        <div key={index} className="flex items-center gap-3">
                            {/* Label */}
                            <span className=" w-25 shrink-0 text-sm text-gray-400 truncate text-right">
                                {item.name}
                            </span>

                            {/* Bar + Value */}
                            <div className="flex items-center gap-2 flex-1">
                                <div
                                    className="h-4 rounded-lg bg-[#F4511E]"
                                    style={{ width: `${barWidth}%` }}
                                />
                                <span className="text-sm text-gray-500 shrink-0">
                                    {item.views}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}