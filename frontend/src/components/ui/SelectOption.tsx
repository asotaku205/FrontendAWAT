import type { SelectHTMLAttributes } from "react";
import { ListFilter } from "lucide-react";

export type SelectOptionItem = string | { label: string; value: string };

type SelectOptionProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "title"> & {
  title: string;
  placeholder: string;
  option: SelectOptionItem[];
  isFilter?: boolean;
};

const SelectOption = ({
  title,
  placeholder,
  option,
  isFilter = false,
  className = "",
  ...props
}: SelectOptionProps) => (
  <label className="flex min-w-36 flex-col gap-1.5 text-sm">
    <span className="flex items-center gap-1.5 font-medium text-gray-700">
      {isFilter && <ListFilter aria-hidden="true" size={14} />}
      {title}
    </span>
    <select
      className={`h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
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
