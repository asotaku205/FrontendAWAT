import { useNavigate } from "react-router";
import Card from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import Table, { type TableColumn } from "../../components/ui/Table";
import useApiData from "../../hooks/useApiData";
import { API_ENDPOINTS } from "../../services/api";
import type {
  TelesaleEmployee,
  TelesaleOverviewResponse,
  TelesaleSummary,
} from "../../services/types";

type PriorityOrder = TelesaleOverviewResponse["priorityOrdersList"][number];

const TelesaleOverview = () => {
  const navigate = useNavigate();
  const {
    data: employees,
    error: employeesError,
    isLoading: areEmployeesLoading,
  } = useApiData<TelesaleEmployee[]>(API_ENDPOINTS.telesaleEmployees);
  const {
    data: summary,
    error: summaryError,
  } = useApiData<TelesaleSummary>(API_ENDPOINTS.telesaleSummary);
  const {
    data: overview,
    error: overviewError,
    isLoading: isOverviewLoading,
  } = useApiData<TelesaleOverviewResponse>(API_ENDPOINTS.telesaleOverview);
  const successCount = summary?.successfulCalls;
  const failedCount = summary?.failedCalls;
  const completedPriorityCalls = overview?.completedPriorityCalls ?? 0;
  const plannedPriorityCalls = overview?.priorityOrders ?? 0;
  const completion = plannedPriorityCalls
    ? Math.round((completedPriorityCalls / plannedPriorityCalls) * 1000) / 10
    : 0;
  const priorityOrderColumns: TableColumn<PriorityOrder>[] = [
    { key: "code", title: "Mã đơn" },
    { key: "customer", title: "Khách hàng" },
    { key: "phone", title: "SĐT" },
    { key: "eta", title: "ETA" },
    { key: "suggestion", title: "Gợi ý gọi" },
    { key: "reason", title: "Lý do ưu tiên" },
    { key: "status", title: "Trạng thái hệ thống" },
  ];
  const employeeColumns: TableColumn<TelesaleEmployee>[] = [
    { key: "employeeName", title: "Nhân viên" },
    { key: "receivingStatus", title: "Trạng thái" },
    { key: "totalCalls", title: "Tổng cuộc" },
    { key: "successfulCalls", title: "Thành công" },
    { key: "failedCalls", title: "Thất bại" },
    { key: "successRate", title: "Tỉ lệ TC", render: ({ successRate }) => `${successRate}%` },
    { key: "averageCallTime", title: "TG gọi TB" },
    {
      key: "progress",
      title: "Tiến độ",
      render: ({ progress }) => (
        <div className="flex min-w-24 items-center gap-2">
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"
          >
            <span className="block h-full rounded-full bg-red-700" style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>
      ),
    },
    {
      key: "employeeName",
      id: "employeeDetails",
      title: "Chi tiết",
      render: ({ employeeName }) => (
        <button
          type="button"
          className="font-medium text-red-700 underline"
          onClick={() =>
            navigate(
              `/telesale/Employees?${new URLSearchParams({ employeeName })}`,
            )
          }
        >
          Xem
        </button>
      ),
    },
  ];

  return (
    <section className="flex min-w-0 flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          { label: "Tổng đơn hôm nay", value: overview?.totalOrdersToday },
          { label: "Đơn nên ưu tiên gọi", value: overview?.priorityOrders },
          { label: "Đã xử lý", value: overview?.completedPriorityCalls },
          { label: "Not need call", value: overview?.notNeedCall },
          { label: "Tỷ lệ thành công", value: summary ? `${summary.successRate}%` : undefined },
        ].map(({ label, value }) => (
          <Card
            key={label}
            title={label}
            description={
              (isOverviewLoading || areEmployeesLoading) && value === undefined
                ? "..."
                : String(value ?? "—")
            }
          />
        ))}
      </div>
      {overviewError && <p role="alert" className="text-sm text-red-700">Không tải được tổng quan Telesale: {overviewError}</p>}
      {summaryError && <p role="alert" className="text-sm text-red-700">Không tải được thống kê Telesale: {summaryError}</p>}
      {employeesError && <p role="alert" className="text-sm text-red-700">Không tải được nhân viên Telesale: {employeesError}</p>}

      <div className="grid gap-2 lg:grid-cols-[1.45fr_0.95fr]">
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900">
            Tiến độ tổng quan Telesale
          </h2>
          <div className="mb-2 mt-3 flex items-center justify-between gap-3 text-sm font-medium text-gray-700">
            <span>{completedPriorityCalls}/{plannedPriorityCalls} cuộc gọi ưu tiên hôm nay đã hoàn tất</span>
            <span className="font-semibold text-red-700">{completion}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-valuenow={completion} aria-valuemin={0} aria-valuemax={100}>
            <span className="block h-full rounded-full bg-red-700" style={{ width: `${completion}%` }} />
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Kết quả gọi hôm nay</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">Thành công</span>
                <strong className="text-gray-900">{successCount ?? "—"}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">Thất bại</span>
                <strong className="text-gray-900">{failedCount ?? "—"}</strong>
              </div>
            </div>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between gap-2"><dt className="text-gray-500">TG gọi TB</dt><dd className="font-semibold text-gray-900">{summary ? `${Math.floor(summary.averageCallTimeSeconds / 60)}p${String(summary.averageCallTimeSeconds % 60).padStart(2, "0")}` : "—"}</dd></div>
              <div className="flex justify-between gap-2"><dt className="text-gray-500">NV đang nhận</dt><dd className="font-semibold text-gray-900">{summary?.activeEmployees ?? "—"}</dd></div>
              <div className="flex justify-between gap-2"><dt className="text-gray-500">NV đang tạm dừng</dt><dd className="font-semibold text-gray-900">{summary?.pausedEmployees ?? "—"}</dd></div>
            </dl>
          </div>
        </section>
      </div>

      <div>
        <Button
          type="button"
          className="gap-2"
          onClick={() => navigate("/telesale/split")}
        >
          Chia tự động
        </Button>
      </div>

      <section>
        {isOverviewLoading ? (
          <p role="status" className="rounded-lg border border-gray-200 bg-white p-5 text-sm text-gray-500">
            Đang tải đơn ưu tiên...
          </p>
        ) : (
        <Table
          title="Đơn ưu tiên gọi tiếp theo"
          columns={priorityOrderColumns}
          records={overview?.priorityOrdersList ?? []}
          rowKey="code"
          tableClassName="min-w-[850px]"
        />
        )}
      </section>

      <section>
        <Table
          title="Tiến độ nhân viên Telesale"
          columns={employeeColumns}
          records={(employees ?? []).filter((employee) => employee.workingStatus).slice(0, 6)}
          rowKey="employeeName"
          tableClassName="min-w-[850px]"
        />
      </section>
      <p className="sr-only">Tổng số cuộc gọi hôm nay: {summary?.totalCallsToday ?? "—"}</p>
    </section>
  );
};

export default TelesaleOverview;
