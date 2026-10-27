import { Button } from "../../components/ui/button";
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import {
  channelEfficiencyData,
  channelKpis,
  channelsToOptimize,
} from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
const channelColumns: TableColumn<(typeof channelEfficiencyData)[number]>[] = [
  { key: "channel", title: "Kênh" },
  { key: "cost", title: "Chi phí" },
  { key: "revenue", title: "Doanh thu" },
  {
    key: "efficiency",
    title: "Hiệu quả",
  },
  {
    key: "returnRate",
    title: "Tỷ lệ hoàn",
  },
  {
    key: "growth",
    title: "Tăng trưởng",
  },
  { key: "suggestion", title: "Đề xuất" },
];
const TabChannel = () => {
   const { currentData, totalPages, currentPage, setCurrentPage } =
      usePagination({
        data: channelEfficiencyData,
        pageSize: 4,
      });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {channelKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Chi phí doanh thu theo kênh" className="col-span-2 ">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-800" /> Doanh thu
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-gray-400" /> Chi phí
              </span>
            </div>
          </div>
          <div className="flex items-center h-80 justify-center rounded-lg border-2 border-gray-300 bg-gray-50 px-4 text-center text-sm text-gray-400">
            Biểu đồ
          </div>
        </Panel>

        <Panel title="Kênh cần tối ưu">
          <div className="space-y-3">
            {channelsToOptimize.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <div className="font-medium text-gray-800">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.note}</div>
                </div>
                <Button className="min-w-40" size="xs">
                  {c.action}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Hiệu quả theo kênh">
       <Table
          columns={channelColumns}
          records={currentData}
          rowKey="channel"
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

export default TabChannel;
