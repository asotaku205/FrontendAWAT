import { Button } from "../../components/ui/button";
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import {
  businessSignals,
  realKpis,
  recentOrders,
} from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
const statusClass: Record<string, string> = {
  "Thành công": "bg-green-100 text-green-700",
  "Đang xử lý": "bg-yellow-100 text-yellow-700",
  "Đang giao": "bg-blue-100 text-blue-700",
  "Đơn hoàn": "bg-red-100 text-red-700",
};
const realColumns: TableColumn<(typeof recentOrders)[number]>[] = [
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
const TabReal = () => {
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: recentOrders,
      pageSize: 4,
    });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {realKpis.map((k) => (
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
          <div className="flex items-center h-80 justify-center rounded-lg border-2  border-gray-300 bg-gray-50 px-4 text-center text-sm text-gray-400">
            Biểu đồ
          </div>
        </Panel>

        <Panel title="Tín hiệu kinh doanh">
          <div className="space-y-3">
            {businessSignals.map((s) => (
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
        <Button variant="link" className="px-0">
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
