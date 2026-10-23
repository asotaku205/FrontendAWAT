import { Button } from "../../components/ui/button";
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import {
  customerActions,
  customerKpis,
  customersToWatch,
  returnReasons,
} from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";

const customerColumns: TableColumn<(typeof customersToWatch)[number]>[] = [
  { key: "name", title: "Khách hàng / SĐT" },
  { key: "group", title: "Nhóm" },
  { key: "orders", title: "Số đơn" },
  {
    key: "avgValue",
    title: "Giá trị TB",
  },
  {
    key: "returnRate",
    title: "Tỷ lệ hoàn",
  },
  {
    key: "suggestion",
    title: "Gợi ý xử lý",
  },
  {
    key: "action",
    title: "Trạng thái",
    render: (o) => (
      <Button size="xs" variant={"outline"}>
        {o.action}
      </Button>
    ),
  },
];
const TabCustomer = () => {
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: customersToWatch,
      pageSize: 4,
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {customerKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Xu hướng khách hàng 14 ngày" className="col-span-2 ">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-800" /> Khách mới
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-300" /> Quay lại
              </span>
            </div>
          </div>
          <div className="flex items-center  h-80 justify-center rounded-lg border-2  border-gray-300 bg-gray-50 px-4 text-center text-sm text-gray-400">
            Biểu đồ
          </div>
        </Panel>

        <Panel title="Hành động với khách hàng">
          <div className="space-y-3">
            {customerActions.map((c) => (
              <div
                key={c.text}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <div className="text-gray-700">{c.text}</div>
                  <div className="text-xs text-gray-500">{c.count} khách</div>
                </div>
                <Button size="xs" variant={"outline"}>
                  {c.action}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Khách hàng cần chú ý" className="col-span-2">
          <Table
            columns={customerColumns}
            records={currentData}
            rowKey="name"
            pagination={{
              page: currentPage,
              pageSize: 4,
              totalPages,
              totalRecords: currentData.length,
              onPageChange: setCurrentPage,
            }}
          />
        </Panel>

        <Panel title="Lý do hoàn phổ biến">
          <div className="space-y-3">
            {returnReasons.map((r) => (
              <div key={r.reason}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-700">{r.reason}</span>
                  <span className="font-semibold text-gray-900">
                    {r.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default TabCustomer;
