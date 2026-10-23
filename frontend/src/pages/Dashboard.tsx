
import Card from "../components/ui/Card";
import Description from "../components/ui/Description";
import useApiData from "../hooks/useApiData";
import { API_ENDPOINTS } from "../services/api";
import type { DashboardSummary } from "../services/types";

const Dashboard = () => {
  const { data, error, isLoading } = useApiData<DashboardSummary>(
    API_ENDPOINTS.dashboardSummary,
  );

  if (isLoading) return <p role="status">Đang tải dữ liệu tổng quan...</p>;
  if (error) {
    return <p role="alert">Không tải được dữ liệu tổng quan: {error}</p>;
  }
  if (!data) return <p role="alert">Không có dữ liệu tổng quan.</p>;

  return (
    <div className="space-y-6">
      <Description
        title="Dashboard"
        description="Tổng quan hoạt động logistics và các chỉ số vận hành."
      />
      <section aria-label="Chỉ số tổng quan" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Đơn hàng hôm nay"
          description={data.ordersToday.toLocaleString("vi-VN")}
          status="Hôm nay"
        />
        <Card
          title="Đơn đang xử lý"
          description={data.processingOrders.toLocaleString("vi-VN")}
          status="Đang xử lý"
        />
        <Card
          title="Đơn cần chú ý"
          description={data.ordersNeedingAttention.toLocaleString("vi-VN")}
          status="Cần theo dõi"
        />
        <Card
          title="Tỷ lệ hoàn thành"
          description={`${data.completionRate}%`}
          status="Trong ngày"
        />
      </section>
    </div>
  );
};

export default Dashboard;