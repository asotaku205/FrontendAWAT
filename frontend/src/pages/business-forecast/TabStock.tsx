import { Button } from "../../components/ui/button";
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import { stockList, urgentStock, warehouseKpis } from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
const stockColumns: TableColumn<(typeof stockList)[number]>[] = [
  { key: "code", title: "Mã đơn" },
  { key: "name", title: "Sản phẩm" },
  { key: "stock", title: "Tồn" },
  {
    key: "sold7d",
    title: "Đơn bán được/tuần",
  },
  {
    key: "forecast14d",
    title: "Dự báo trong 14 ngày",
  },
  {
    key: "daysLeft",
    title: "Đủ hàng",
  },
  {
    key: "status",
    title: "Trạng thái",
  },
  {
    key: "action",
    title: "Hành động",
    render: (o) => (
      <Button size="xs" variant={"outline"}>
        {o.action}
      </Button>
    ),
  },
];
const TabStock = () => {
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: stockList,
      pageSize: 4,
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {warehouseKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Số ngày đủ hàng theo nhóm" className="col-span-2 ">
          <div className="text-xs text-gray-500 m-2">Mức an toàn: 14 ngày</div>

          <div className="flex items-center h-80 justify-center rounded-lg border-2  border-gray-300 bg-gray-50 px-4 text-center text-sm text-gray-400">
            Biểu đồ
          </div>
        </Panel>

        {/* Cần xử lý ngay */}
        <Panel title="Cần xử lý ngay">
          <div className="space-y-3">
            {urgentStock.map((u) => (
              <div
                key={u.code}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <div className="font-medium text-gray-800">{u.code}</div>
                  <div className="text-xs text-gray-500">{u.note}</div>
                </div>
                <Button size="xs" variant="outline">
                  {u.action}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Danh sách tồn kho */}
      <Panel title="Danh sách tồn kho">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900"></div>
          <div className="flex gap-2">
            <Button>Tạo đề xuất nhập hàng</Button>
            <Button variant="outline">Xem hàng đang về</Button>
          </div>
        </div>
         <Table
          columns={stockColumns}
          records={currentData}
          rowKey="code"
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

export default TabStock;
