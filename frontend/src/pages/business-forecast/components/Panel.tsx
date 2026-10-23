import type { ReactNode } from "react";

type PanelType = {
  title?: string;
  children: ReactNode;
   className?: string;
};
const Panel = ({ title, children, className}: PanelType) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}>
      <div className="mb-3 text-sm font-semibold text-gray-900">{title}</div>
      {children}
    </div>
  );
};

export default Panel;
