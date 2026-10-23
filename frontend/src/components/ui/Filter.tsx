import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "./button";

type FilterProps = {
  children: ReactNode;
  onReset?: () => void;
  className?: string;
};

const Filter = ({ children, onReset, className = "" }: FilterProps) => (
  <section
    aria-label="Bộ lọc" 
    className={`flex flex-wrap items-end gap-4 rounded-lg border border-gray-200 bg-white p-4 ${className}`}
  >
    {children}
    {onReset && (
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
      >
        <RotateCcw aria-hidden="true" size={15} />
        Xóa bộ lọc
      </Button>
    )}
  </section>
);

export default Filter;
