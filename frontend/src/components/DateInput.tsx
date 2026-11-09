import type { InputHTMLAttributes } from "react";
import { CalendarDays } from "lucide-react";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  title: string;
};

const DateInput = ({ title, className = "", ...props }: DateInputProps) => (
  <label className="flex min-w-40 flex-col gap-1.5 text-sm">
    <span className="font-medium text-gray-700">{title}</span>
    <span className="relative">
      <input
        type="date"
        className={`h-10 w-full rounded-md border border-gray-300 bg-white px-3 pr-9 text-sm outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 ${className}`}
        {...props}
      />
      <CalendarDays
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
      />
    </span>
  </label>
);

export default DateInput;
