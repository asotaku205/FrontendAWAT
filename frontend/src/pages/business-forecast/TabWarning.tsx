import { Button } from "../../components/ui/button";
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import { alertDetail, alertList, warningKpis } from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
const warningColumns: TableColumn<(typeof alertList)[number]>[] = [
  { key: "level", title: "Mức" },
  { key: "group", title: "Nhóm" },
  { key: "issue", title: "Vấn đề" },
  {
    key: "impact",
    title: "Ảnh hưởng",
  },
  {
    key: "deadline",
    title: "Hạn xử lý",
  },
  {
    key: "owner",
    title: "Phụ trách",
  },

  {
    key: "action",
    title: "Hành động",
    render: (o) => (
      <Button size={"xs"} variant={"outline"}>
        {o.action}
      </Button>
    ),
  },
];
const TabWarning = () => {
   const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: alertList,
      pageSize: 4,
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {warningKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="flex gap-2">
        <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Mức độ: Tất cả</option>
        </select>
        <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Nhóm: Tất cả</option>
        </select>
        <select className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <option>Phụ trách: Tất cả</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Danh sách cảnh báo */}
        <Panel title="Danh sách cảnh báo" className="col-span-2 ">
          <Table
          columns={warningColumns}
          records={currentData}
          rowKey="issue"
          pagination={{
            page: currentPage,
            pageSize: 4,
            totalPages,
            totalRecords: currentData.length,
            onPageChange: setCurrentPage,
          }}
        />
        </Panel>

        {/* Chi tiết cảnh báo */}
        <Panel title="Chi tiết cảnh báo">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
              {alertDetail.level}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {alertDetail.title}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tồn hiện tại</span>
              <span className="font-semibold text-gray-900">
                {alertDetail.stock}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Đủ bán</span>
              <span className="font-semibold text-gray-900">
                {alertDetail.daysLeft}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nhu cầu 14 ngày</span>
              <span className="font-semibold text-gray-900">
                {alertDetail.demand14d}
              </span>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-gray-50 p-3">
            <div className="text-xs text-gray-500">Đề xuất</div>
            <div className="mt-0.5 text-sm text-gray-800">
              {alertDetail.suggestion}
            </div>
          </div>
          <Button className={"w-full my-2"} variant={"outline"}>
            Giao xử lý
          </Button>
          <Button className={"w-full "}>Thực hiện ngay</Button>
          <Button className={"w-full my-2"} variant={"outline"}>
            Đánh dấu đã xử lý
          </Button>
        </Panel>
      </div>
    </div>
  );
};

export default TabWarning;
