import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const SearchInput = ({
  placeholder,
  className = "",
  ...props
}: SearchInputProps) => (
  <div className="relative min-w-64">
    <Search
      aria-hidden="true"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      size={18}
    />
    <input
      type="text"
      placeholder={placeholder}
      className={`h-10 w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100 ${className}`}
      {...props}
    />
  </div>
);

export default SearchInput;