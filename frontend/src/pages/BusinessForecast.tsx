import { useState } from "react";
import TabOverview from "./business-forecast/TabOverview";
import TabReal from "./business-forecast/TabReal";
import TabForecast from "./business-forecast/TabForecast";
import TabChannel from "./business-forecast/TabChannel";
import TabCustomer from "./business-forecast/TabCustomer";
import TabStock from "./business-forecast/TabStock";
import TabWarning from "./business-forecast/TabWarning";
import TabActivity from "./business-forecast/TabActivity";
import { Button } from "../components/ui/button";

const tabs = [
  { id: "overview", label: "Tổng quan", content: <TabOverview /> },
  { id: "real", label: "Thực tế", content: <TabReal /> },
  { id: "forecast", label: "Dự báo", content: <TabForecast /> },
  { id: "channel", label: "Kênh bán", content: <TabChannel /> },
  { id: "stock", label: "Tồn kho", content: <TabStock /> },
  { id: "customer", label: "Khách hàng", content: <TabCustomer /> },
  { id: "warning", label: "Cảnh báo", content: <TabWarning /> },
  { id: "activity", label: "Hoạt động", content: <TabActivity /> },
];

const BusinessForecast = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={` ${
              activeTab === t.id
                ? "bg-red-700 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </Button>
        ))}
      </div>
      {/* tab content */}
      {active.content}
    </div>
  );
};

export default BusinessForecast;
