import type { SelectHTMLAttributes } from "react";

export type SelectOptionItem = string | { label: string; value: string };

type SelectOptionVariant = "default" | "transparent";

type SelectOptionProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "title"> & {
  title?: string;
  placeholder?: string;
  option: SelectOptionItem[];
  isFilter?: boolean;
  variant?: SelectOptionVariant;
};

const SelectOption = ({
  title,
  placeholder,
  option,
  isFilter = false,
  variant = "default",
  className = "",
  ...props
}: SelectOptionProps) => (
  <label className="flex min-w-36 flex-col gap-1.5 text-sm">
    <span className="flex items-center gap-1.5 font-medium text-gray-700">
      {title}
    </span>
    <select
      className={`h-10 rounded-md px-3 text-sm outline-none ${variant === "transparent" || isFilter
          ? "border-0 bg-transparent focus:ring-0 focus:border-transparent"
          : "border border-gray-300 bg-white focus:border-red-700 focus:ring-2 focus:ring-red-100"
        } ${className}`}
      {...props}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {option.map((item) => {
        const value = typeof item === "string" ? item : item.value;
        const label = typeof item === "string" ? item : item.label;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  </label>
);

export default SelectOption;
