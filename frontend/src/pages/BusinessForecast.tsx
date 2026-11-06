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
import useApiData from "../hooks/useApiData";
import { API_ENDPOINTS } from "../services/api";
import type { BusinessForecastData } from "../services/types";

const BusinessForecast = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { data, error, isLoading } = useApiData<BusinessForecastData>(
    API_ENDPOINTS.forecastData,
  );
  const tabs = [
    { id: "overview", label: "Tổng quan" },
    { id: "real", label: "Thực tế" },
    { id: "forecast", label: "Dự báo" },
    { id: "channel", label: "Kênh bán" },
    { id: "stock", label: "Tồn kho" },
    { id: "customer", label: "Khách hàng" },
    { id: "warning", label: "Cảnh báo" },
    { id: "activity", label: "Hoạt động" },
  ];

  const handleOverviewAction = (action: string) => {
    const targetTab: Record<string, string> = {
      "Chuẩn bị nhập / sản xuất": "stock",
      "Xem đơn hoàn": "real",
      "Giảm ngân sách": "channel",
      "Tăng tồn kho": "stock",
    };
    const nextTab = targetTab[action];
    if (nextTab) setActiveTab(nextTab);
  };

  if (isLoading) return <p role="status">Đang tải dữ liệu dự báo kinh doanh...</p>;
  if (error) {
    return <p role="alert">Không tải được dữ liệu dự báo kinh doanh: {error}</p>;
  }
  if (!data) return <p role="alert">Không có dữ liệu dự báo kinh doanh.</p>;

  const activeContent = (() => {
    switch (activeTab) {
      case "overview": return <TabOverview data={data.overview} onTodoAction={handleOverviewAction} />;
      case "real": return <TabReal data={data.real} />;
      case "forecast": return <TabForecast data={data.forecast} />;
      case "channel": return <TabChannel data={data.channel} />;
      case "stock": return <TabStock data={data.stock} />;
      case "customer": return <TabCustomer data={data.customer} />;
      case "warning": return <TabWarning data={data.warning} onNavigateTab={setActiveTab} />;
      case "activity": return <TabActivity data={data.activity} />;
      default: return <TabOverview data={data.overview} onTodoAction={handleOverviewAction} />;
    }
  })();

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
      {activeContent}
    </div>
  );
};

export default BusinessForecast;
