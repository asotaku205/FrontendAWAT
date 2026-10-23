import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import usePagination from "../../hooks/usePagination";
import {
  activityKpis,
  activityLog,
  recentActivities,
  upcomingTasks,
} from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
const activityColumns: TableColumn<(typeof recentActivities)[number]>[] = [
  { key: "time", title: "Thời gian" },
  { key: "activity", title: "Hoạt động" },
  { key: "group", title: "Nhóm" },
  {
    key: "by",
    title: "Người / hệ thống",
  },
  {
    key: "result",
    title: "Kết quả",
    render: (o) => (
      <span
        className={`rounded px-2 py-0.5 text-xs font-semibold ${o.result === "Thành công" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {o.result}
      </span>
    ),
  },
  {
    key: "related",
    title: "Liên quan",
  },
];
const TabActivity = () => {
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: recentActivities,
      pageSize: 4,
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {activityKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Hoạt động gần đây" className="col-span-2">
          <Table
            columns={activityColumns}
            records={currentData}
            rowKey="activity"
            pagination={{
              page: currentPage,
              pageSize: 4,
              totalPages,
              totalRecords: currentData.length,
              onPageChange: setCurrentPage,
            }}
          />
        </Panel>

        <Panel title="Công việc tiếp theo">
          <div className="space-y-3">
            {upcomingTasks.map((t) => (
              <div
                key={t.text}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${t.level === "Gấp" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {t.level}
                  </span>
                  <span className="text-gray-700">{t.text}</span>
                </div>
                <span className="shrink-0 text-xs text-gray-500">{t.time}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Panel
          title="Tiến độ xử lý hôm nay"
          className="rounded-lg border border-gray-200 bg-white p-4"
        >
          <div className="text-xs text-gray-500 my-2">
            23 đã xử lý - 7 chờ xác nhận - 2 quá hạn
          </div>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-gray-700">Hoàn thành</span>
            <span className="font-semibold text-gray-900">72%</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xl font-bold text-gray-900">298</div>
              <div className="text-xs text-gray-500">Tác vụ thành công</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xl font-bold text-gray-900">32</div>
              <div className="text-xs text-gray-500">Đang chạy / chờ</div>
            </div>
          </div>
        </Panel>

        <Panel title="Nhật ký xử lý gần đây">
          <div className="space-y-2.5">
            {activityLog.map((l, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="shrink-0 text-gray-500">{l.time}</span>
                <span className="text-gray-700">{l.text}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default TabActivity;
