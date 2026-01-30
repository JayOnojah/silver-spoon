import { IconArrowRight, IconArrowUpRight, IconCalendar } from "@tabler/icons-react";
import React from "react";

interface Appointment {
  time: string;
  meridiem: "AM" | "PM";
  title: string;
  subtitle: string;
  variant: "purple" | "blue" | "green";
}

interface UpComingAppointmentProps {
  isFilled?: boolean;
}

const UpComingAppointment = ({ isFilled }: UpComingAppointmentProps) => {
  const appointments: Appointment[] = [
    {
      time: "10:00",
      meridiem: "AM",
      title: "Fitting",
      subtitle: "John Doe",
      variant: "purple",
    },
    {
      time: "10:00",
      meridiem: "AM",
      title: "Measurements",
      subtitle: "John Doe",
      variant: "blue",
    },
    {
      time: "10:00",
      meridiem: "AM",
      title: "Consultation",
      subtitle: "New Customer",
      variant: "green",
    },
  ];

  if (!isFilled) {
    return (
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
    );
  }

  const stylesByVariant: Record<Appointment["variant"], string> = {
    purple: "bg-[#F5F3FF] border-[#C4B5FD]",
    blue: "bg-[#EFF6FF] border-[#BFDBFE]",
    green: "bg-[#ECFDF3] border-[#BBF7D0]",
  };

  const timeTextByVariant: Record<Appointment["variant"], string> = {
    purple: "text-[#7C3AED]",
    blue: "text-[#2563EB]",
    green: "text-[#16A34A]",
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">
          Upcoming Appointments
        </h3>
        <button
          type="button"
          className="inline-flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
          aria-label="View appointments"
        >
          <IconArrowRight className="size-5" />
        </button>
      </div>

      <div className="space-y-3">
        {appointments.map((appt, idx) => (
          <div
            key={`${appt.title}-${idx}`}
            className={`rounded-xl border px-4 py-3 ${stylesByVariant[appt.variant]}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 text-center">
                <div
                  className={`text-sm font-bold leading-none ${timeTextByVariant[appt.variant]}`}
                >
                  {appt.time}
                </div>
                <div
                  className={`text-xs font-bold mt-1 ${timeTextByVariant[appt.variant]}`}
                >
                  {appt.meridiem}
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground truncate">
                  {appt.title}
                </div>
                <div className="text-xs text-[#9AA4B2] truncate">
                  {appt.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpComingAppointment;
