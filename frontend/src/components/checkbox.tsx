import type { InputHTMLAttributes } from "react";

type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  title?: string;
};

const CheckBox = ({ title, className = "", ...props }: CheckBoxProps) => {
  const checkbox = (
    <input
      type="checkbox"
      className={`size-4 rounded border-gray-300 accent-red-700 focus:ring-red-600 ${className}`}
      {...props}
    />
  );

  return title ? (
    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
      {checkbox}
      {title}
    </label>
  ) : (
    checkbox
  );
};

export default CheckBox;
