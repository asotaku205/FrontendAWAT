import { useState } from "react";
import { Button } from "../../components/Button";
import type { TableColumn } from "../../components/Table";
import Table from "../../components/Table";
import usePagination from "../../hooks/use-pagination";
import type { BusinessForecastData } from "../../services/types";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
import { HourlyRevenueChart } from "./components/ForecastCharts";
const statusClass: Record<string, string> = {
  "Thành công": "bg-green-100 text-green-700",
  "Đang xử lý": "bg-yellow-100 text-yellow-700",
  "Đang giao": "bg-blue-100 text-blue-700",
  "Đơn hoàn": "bg-red-100 text-red-700",
};
const realColumns: TableColumn<BusinessForecastData["real"]["recentOrders"][number]>[] = [
  { key: "id", title: "Mã đơn" },
  { key: "channel", title: "Kênh bán" },
  { key: "product", title: "Sản phẩm" },
  {
    key: "region",
    title: "Khu vực",
  },
  {
    key: "cod",
    title: "COD",
  },
  {
    key: "status",
    title: "Trạng thái",
    render: (o) => (
      <span
        className={`rounded px-2 py-0.5 text-xs font-semibold ${statusClass[o.status] ?? "bg-gray-100 text-gray-700"}`}
      >
        {o.status}
      </span>
    ),
  },
  { key: "updated", title: "Cập nhật" },
];



const TabReal = ({ data }: { data: BusinessForecastData["real"] }) => {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: data.recentOrders,
      pageSize: 4,
    });

  if (showAllOrders) {
    return (
      <AllOrdersPage
        orders={data.recentOrders}
        onBack={() => setShowAllOrders(false)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {data.kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-2">
        <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Kênh: Tất cả</option>
        </select>
        <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Khu vực: Tất cả</option>
        </select>
        <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Trạng thái: Tất cả</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Doanh thu theo giờ hôm nay" className="col-span-2">
          <div className="mb-2 text-xs text-gray-500">Đơn vị: triệu đồng</div>
          <HourlyRevenueChart data={data.hourlyRevenue} />
        </Panel>

        <Panel title="Tín hiệu kinh doanh">
          <div className="space-y-3">
            {data.businessSignals.map((s) => (
              <div
                key={s.text}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-gray-700">{s.text}</span>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-semibold ${s.badgeClass}`}
                >
                  {s.badge}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Đơn hàng gần đây */}
      <Panel title="Đơn hàng gần đây">
        <Button
          variant="link"
          className="px-0"
          onClick={() => setShowAllOrders(true)}
        >
          Xem toàn bộ đơn
        </Button>

        <Table
          columns={realColumns}
          records={currentData}
          rowKey="id"
          pagination={{
            page: currentPage,
            pageSize: 4,
            totalPages,
            totalRecords: currentData.length,
            onPageChange: setCurrentPage,
          }}
        />
      </Panel>

    </div>
  );
};

export default TabReal;


const AllOrdersPage = ({
  orders,
  onBack,
}: {
  orders: BusinessForecastData["real"]["recentOrders"];
  onBack: () => void;
}) => {
  const [channelFilter, setChannelFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesChannel = channelFilter === "all" || order.channel === channelFilter;
    const matchesRegion = regionFilter === "all" || order.region === regionFilter;
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const searchText = search.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      order.id.toLowerCase().includes(searchText) ||
      order.product.toLowerCase().includes(searchText);

    return matchesChannel && matchesRegion && matchesStatus && matchesSearch;
  });

  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({ data: filteredOrders, pageSize: 4 });

  const resetFilters = () => {
    setChannelFilter("all");
    setRegionFilter("all");
    setStatusFilter("all");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Toàn bộ đơn hàng</h2>
          <p className="text-sm text-gray-500">Lọc và tra cứu các đơn hàng thực tế.</p>
        </div>
        <Button variant="outline" onClick={onBack}>Quay lại tổng quan thực tế</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Tìm mã đơn hoặc mã sản phẩm..."
          className="min-w-56 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        />
        <select
          value={channelFilter}
          onChange={(event) => {
            setChannelFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Kênh: Tất cả</option>
          {[...new Set(orders.map((order) => order.channel))].map((channel) => (
            <option key={channel} value={channel}>{channel}</option>
          ))}
        </select>
        <select
          value={regionFilter}
          onChange={(event) => {
            setRegionFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Khu vực: Tất cả</option>
          {[...new Set(orders.map((order) => order.region))].map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Trạng thái: Tất cả</option>
          {[...new Set(orders.map((order) => order.status))].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <Button variant="outline" onClick={resetFilters}>Xóa bộ lọc</Button>
      </div>

      <Panel title={`Danh sách đơn (${filteredOrders.length})`}>
        <Table
          columns={realColumns}
          records={currentData}
          rowKey="id"
          emptyMessage="Không tìm thấy đơn phù hợp với bộ lọc."
          pagination={{
            page: currentPage,
            pageSize: 4,
            totalPages,
            totalRecords: filteredOrders.length,
            onPageChange: setCurrentPage,
          }}
        />
      </Panel>
    </div>
  );
};