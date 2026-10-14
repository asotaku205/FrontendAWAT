
import Card from "../components/ui/Card";
import Description from "../components/ui/Description";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Description
        title="Dashboard"
        description="Tổng quan hoạt động logistics và các chỉ số vận hành."
      />
      <section aria-label="Chỉ số tổng quan" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card title="Đơn hàng hôm nay" description="—" status="Chưa có dữ liệu" />
        <Card title="Đơn đang xử lý" description="—" status="Chưa có dữ liệu" />
        <Card title="Đơn cần chú ý" description="—" status="Chưa có dữ liệu" />
        <Card title="Tỷ lệ hoàn thành" description="—" status="Chưa có dữ liệu" />
      </section>
    </div>
  )
}

export default Dashboard