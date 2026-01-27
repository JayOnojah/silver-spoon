"use client";

import {
  IconCalendar,
  IconCurrencyDollar,
  IconHelp,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import ProductionPipeline from "./production-pipeline";
import Metric from "./metric";
import RecentOrders from "./recent-orders";

const DashboardContent = () => {
  // Set to true to show filled state, false for empty state
  const isFilled = true;

  return (
    <div className="space-y-6 mt-10">
      {/* Top Row - Metric Cards */}
      <Metric isFilled={isFilled} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main Area */}
        <div className="lg:col-span-2 space-y-6">
          <ProductionPipeline isFilled={isFilled} />
          <RecentOrders isFilled={isFilled} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Need Help Getting Started? Card */}
          <div
            className="rounded-xl p-6"
            style={{
              background:
                "linear-gradient(232.99deg, #F74F25 -7.62%, #912E16 97.57%)",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-white/20 rounded-lg p-2">
                <IconHelp className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Need Help Getting Started?
                </h3>
                <p className="text-sm text-white/90">
                  Watch our quick tutorials and learn how to use Silver spoon
                  effectively.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full bg-white text-primary hover:bg-white/90 border-white rounded-xl h-12"
            >
              <IconPlayerPlay className="size-5 mr-2" />
              Watch Video Tutorials
            </Button>
          </div>

          {/* No Appointment Yet Card */}
          <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-[#FFF1EC] rounded-lg p-4 mb-4">
                <IconCalendar className="size-8 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                No Appointment Yet
              </h3>
              <p className="text-sm text-[#9AA4B2] text-center">
                Upcoming appointments will be displayed here
              </p>
            </div>
          </div>

          {/* No Finance Report Yet Card */}
          <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-[#FFF1EC] rounded-lg p-4 mb-4">
                <IconCurrencyDollar className="size-8 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                No Finance Report Yet
              </h3>
              <p className="text-sm text-[#9AA4B2] text-center">
                Financial snapshots will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
