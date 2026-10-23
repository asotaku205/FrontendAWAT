import { Button } from "../../components/ui/button"
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import { forecastKpis, forecastScenarios, productsToPrepare, weeklyRisks } from "../../mock/ForecastData"
import KpiCard from "./components/KpiCard"
import Panel from "./components/Panel"
const forecastColumns: TableColumn<(typeof productsToPrepare)[number]>[] = [
  { key: "code", title: "Mã SP" },
  { key: "name", title: "Sản phẩm" },
  { key: "demand", title: "Nhu cầu 14 ngày" },
  {
    key: "stock",
    title: "Tồn hiện tại",
  },
  {
    key: "daysLeft",
    title: "Đủ bán",
  },
  {
    key: "action",
    title: "Hành động",
    render:(o) => (
      <Button className={"min-w-40"} size='xs' variant={"outline"}>
      {o.action}
    </Button>
    ),
  },
];
const TabForecast = () => {
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: productsToPrepare,
      pageSize: 4,
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {forecastKpis.map((k) => (
           <KpiCard
         key={k.label}
         label={k.label}
         value={k.value}
         sub={k.sub}
         />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Doanh thu: thực tế so với dự báo" className="col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-800" /> THỰC TẾ
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-300" /> DỰ BÁO
              </span>
            </div>
          </div>
          <div
            className="flex items-center  h-80 justify-center rounded-lg border-2    border-gray-300 bg-gray-50 px-4 text-center text-sm text-gray-400"
          
          >
            Biểu đồ 
          </div>
        </Panel>

        {/* Kịch bản dự báo */}
        <Panel title="Kịch bản dự báo">
          <div className="space-y-3">
            {forecastScenarios.map((s) => (
              <div key={s.name} className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">{s.name}</div>
                <div className="mt-0.5 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-gray-900">{s.value}</span>
                  <span className={`text-sm font-semibold ${s.changeClass}`}>{s.change}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Sản phẩm cần chuẩn bị */}
        <Panel title="Sản phẩm cần chuẩn bị" className="col-span-2 ">
           <Table
          columns={forecastColumns}
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

        {/* Rủi ro tuần tới */}
        <Panel title="Rủi ro tuần tới">
          <div className="space-y-2.5">
            {weeklyRisks.map((r) => (
              <div key={r} className="flex items-start gap-2 text-sm p-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">
                  !
                </span>
                <span className="text-gray-700">{r}</span>
              </div>
            ))}
          </div>
          <Button className="my-6 mx-2">
            Xem hành động đề xuất
          </Button>
        </Panel>
      </div>
    </div>
  )
}

export default TabForecast