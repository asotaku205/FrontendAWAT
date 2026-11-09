import { useMemo, useState } from "react";
import {
  Clock3,
  Headphones,
  PhoneCall,
  Timer,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import Card from "../../components/Card";
import SearchInput from "../../components/SearchInput";
import SelectOption from "../../components/SelectOption";
import Table, { type TableColumn } from "../../components/Table";
import useApiData from "../../hooks/use-api-data";
import usePagination from "../../hooks/use-pagination";
import { API_ENDPOINTS } from "../../services/api";
import type {
  TelesaleCallRecord,
  TelesaleEmployee,
  TelesaleEmployeeCallSummary,
  TelesaleEmployeeFilterOptions,
} from "../../services/types";

const pageSize = 7;

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) return `${hours} giờ ${minutes} phút`;
  if (minutes > 0) return `${minutes} phút ${remainingSeconds} giây`;
  return `${remainingSeconds} giây`;
};

const shortTime = (dateTime: string | null) => {
  if (!dateTime) return "—";
  return dateTime.split(" ")[1]?.slice(0, 5) ?? dateTime;
};

const EmployeeSummaryPanel = ({
  employee,
  calls,
  summary,
}: {
  employee: TelesaleEmployee;
  calls: TelesaleCallRecord[];
  summary: TelesaleEmployeeCallSummary;
}) => {
  const afterCallSeconds = calls.reduce(
    (total, call) => total + call.afterCallSeconds,
    0,
  );
  const callSeconds = calls.reduce(
    (total, call) => total + call.durationSeconds,
    0,
  );
  const totalCalls = summary.totalCalls;
  const successfulPercent =
    totalCalls > 0 ? (summary.successfulCalls / totalCalls) * 100 : 0;
  const failedPercent =
    totalCalls > 0 ? (summary.failedCalls / totalCalls) * 100 : 0;

  const longestCallSeconds = Math.max(
    0,
    ...calls.map(({ durationSeconds }) => durationSeconds),
  );
  const pausedSeconds = employee.pausedSeconds ?? 0;
  const totalTrackedSeconds = callSeconds + afterCallSeconds + pausedSeconds;
  const timeRows = [
    {
      label: "Bắt đầu hoạt động",
      value: shortTime(calls[0]?.assignedAt ?? calls[0]?.startedAt ?? null),
      icon: Clock3,
    },
    {
      label: "Tổng thời gian gọi",
      value: employee.totalCallTime,
      icon: PhoneCall,
    },
    {
      label: "Xử lý sau gọi",
      value: formatDuration(afterCallSeconds),
      icon: Timer,
    },
    {
      label: "Thời gian tạm dừng",
      value: formatDuration(pausedSeconds),
      icon: Timer,
    },
    {
      label: "Cuộc gọi dài nhất",
      value: formatDuration(longestCallSeconds),
      icon: Clock3,
    },
    {
      label: "Cuộc gọi tự động nhận",
      value: `${calls.filter(({ nextOrderReceivedAt }) => nextOrderReceivedAt).length}`,
      icon: Headphones,
    },
  ];

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">
          Tổng hợp thời gian làm việc
        </h2>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            employee.receivingStatus === "Đang nhận"
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {employee.receivingStatus}
        </span>
      </div>

      <dl className="mt-5 space-y-4">
        {timeRows.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-sm text-gray-500">
              <Icon aria-hidden="true" size={16} className="text-gray-400" />
              {label}
            </dt>
            <dd className="text-right text-sm font-semibold text-gray-800">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 border-t border-gray-100 pt-3">
        <h3 className="mb-2 text-xs font-semibold text-gray-800">Tỷ trọng thời gian</h3>
        {[
          { label: "Gọi chính", seconds: callSeconds, color: "bg-green-700" },
          { label: "Sau gọi", seconds: afterCallSeconds, color: "bg-amber-700" },
          { label: "Tạm dừng", seconds: pausedSeconds, color: "bg-gray-600" },
        ].map(({ label, seconds, color }) => {
          const percent = totalTrackedSeconds > 0
            ? Math.round((seconds / totalTrackedSeconds) * 100)
            : 0;
          return (
            <div key={label} className="mb-2 grid grid-cols-[54px_1fr_28px] items-center gap-2 text-[9px]">
              <span className="text-gray-500">{label}</span>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <span
                  className={`block h-full rounded-full ${color}`}
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
              <span>{percent}%</span>
            </div>
          );
        })}
        <p className="sr-only">{totalCalls} cuộc gọi, {successfulPercent}% thành công, {failedPercent}% thất bại</p>
      </div>

      <div className="mt-5 rounded-lg bg-gray-50 px-3.5 py-3">
        <p className="text-xs text-gray-500">Tiến độ cuộc gọi</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-red-700"
              style={{ width: `${employee.progress}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-800">
            {employee.progress}%
          </span>
        </div>
      </div>
    </aside>
  );
};

const EmployeeDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const employeeName = searchParams.get("employeeName") ?? "";
  const [orderSearch, setOrderSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const employeeQuery = new URLSearchParams({ employeeName });
  const employeeEndpoint = `${API_ENDPOINTS.telesaleEmployees}?${employeeQuery.toString()}`;
  const summaryQuery = new URLSearchParams({ employeeName });
  const summaryEndpoint = `${API_ENDPOINTS.telesaleEmployeeSummary}?${summaryQuery.toString()}`;
  const callsQuery = new URLSearchParams({ employeeName });
  const callsEndpoint = `${API_ENDPOINTS.telesaleCalls}?${callsQuery.toString()}`;

  const {
    data: filterOptions,
    error: optionsError,
    isLoading: optionsLoading,
  } = useApiData<TelesaleEmployeeFilterOptions>(
    API_ENDPOINTS.telesaleEmployeeOptions,
  );
  const {
    data: employees,
    error: employeeError,
    isLoading: employeeLoading,
  } = useApiData<TelesaleEmployee[]>(employeeEndpoint);
  const {
    data: summary,
    error: summaryError,
    isLoading: summaryLoading,
  } = useApiData<TelesaleEmployeeCallSummary>(summaryEndpoint);
  const {
    data: calls,
    error: callsError,
    isLoading: callsLoading,
  } = useApiData<TelesaleCallRecord[]>(callsEndpoint);

  const employee = employees?.find(
    (record) => record.employeeName === employeeName,
  );
  const filteredCalls = useMemo(() => {
    const normalizedSearch = orderSearch.trim().toLocaleLowerCase("vi-VN");
    return (calls ?? []).filter((call) => {
      const matchesSearch =
        !normalizedSearch ||
        call.orderCode.toLocaleLowerCase("vi-VN").includes(normalizedSearch) ||
        call.waybill.toLocaleLowerCase("vi-VN").includes(normalizedSearch);
      return matchesSearch && (!resultFilter || call.result === resultFilter);
    });
  }, [calls, orderSearch, resultFilter]);
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({ data: filteredCalls, pageSize });

  const columns: TableColumn<TelesaleCallRecord>[] = [
    {
      key: "orderCode",
      title: "Mã đơn",
      className: "whitespace-nowrap",
      render: (call) => (
        <button
          type="button"
          className="font-medium text-red-700 underline"
          onClick={() => navigate(`/telesale/calls/${encodeURIComponent(call.orderCode)}?${new URLSearchParams({ employeeName })}`)}
        >
          {call.orderCode}
        </button>
      ),
    },
    { key: "waybill", title: "Waybill", className: "whitespace-nowrap" },
    {
      key: "assignedAt",
      title: "Được phân lúc",
      render: ({ assignedAt, startedAt }) => shortTime(assignedAt ?? startedAt),
    },
    {
      key: "startedAt",
      title: "Bắt đầu",
      render: ({ startedAt }) => shortTime(startedAt),
    },
    {
      key: "endedAt",
      title: "Kết thúc",
      render: ({ endedAt }) => shortTime(endedAt),
    },
    {
      key: "durationSeconds",
      title: "Thời lượng",
      render: ({ durationSeconds }) => formatDuration(durationSeconds),
    },
    {
      key: "afterCallSeconds",
      title: "Sau gọi",
      render: ({ afterCallSeconds }) => formatDuration(afterCallSeconds),
    },
    {
      key: "nextOrderReceivedAt",
      title: "Nhận đơn tiếp",
      render: ({ nextOrderReceivedAt }) => shortTime(nextOrderReceivedAt),
    },
    {
      key: "result",
      title: "Kết quả",
      render: (call) => (
        <button
          type="button"
          className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
            call.result === "Thành công"
              ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          }`}
          onClick={() => navigate(`/telesale/calls/${encodeURIComponent(call.orderCode)}?${new URLSearchParams({ employeeName })}`)}
        >
          {call.result}
        </button>
      ),
    },
  ];

  const handleEmployeeChange = (name: string) => {
    setCurrentPage(1);
    if (name) {
      setSearchParams({ employeeName: name });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section className="space-y-5">
      {employeeName && (
        <>
          {employeeError && (
            <p role="alert" className="text-sm text-red-700">
              Không tải được thông tin nhân viên: {employeeError}
            </p>
          )}
          {summaryError && (
            <p role="alert" className="text-sm text-red-700">
              Không tải được thống kê cuộc gọi: {summaryError}
            </p>
          )}
          {callsError && (
            <p role="alert" className="text-sm text-red-700">
              Không tải được lịch sử cuộc gọi: {callsError}
            </p>
          )}

          <section
            aria-label={`Thống kê cuộc gọi của ${employeeName}`}
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            {[
              {
                title: "Tổng cuộc gọi",
                value: summary?.totalCalls.toLocaleString("vi-VN"),
                accent: "text-gray-900",
              },
              {
                title: "Thành công",
                value: summary?.successfulCalls.toLocaleString("vi-VN"),
                accent: "text-green-700",
              },
              {
                title: "Thất bại",
                value: summary?.failedCalls.toLocaleString("vi-VN"),
                accent: "text-red-700",
              },
              {
                title: "Thời gian gọi trung bình",
                value: summary?.averageCallTime,
                accent: "text-blue-700",
              },
            ].map(({ title, value, accent }) => (
              <Card
                key={title}
                title={title}
                description={summaryLoading ? "..." : value ?? "—"}
                descriptionClassName={accent}
              />
            ))}
          </section>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="self-end rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
              Nhân viên: {employeeName}
            </span>
            {optionsLoading ? (
              <span role="status">Đang tải nhân viên...</span>
            ) : optionsError ? (
              <span role="alert">Không tải được danh sách nhân viên: {optionsError}</span>
            ) : (
              <SelectOption
                title="Nhân viên"
                placeholder="Chọn nhân viên"
                option={filterOptions?.employees ?? []}
                value={employeeName}
                onChange={(event) => handleEmployeeChange(event.target.value)}
              />
            )}
            <SelectOption
              title="Kết quả"
              placeholder="Kết quả: Tất cả"
              option={["Thành công", "Thất bại"]}
              value={resultFilter}
              onChange={(event) => {
                setResultFilter(event.target.value);
                setCurrentPage(1);
              }}
            />
            <SearchInput
              placeholder="Tìm mã đơn / Waybill..."
              value={orderSearch}
              onChange={(event) => {
                setOrderSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="h-8 max-w-56"
            />
          </div>

          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.8fr)]">
            <section className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">Lịch sử cuộc gọi</h2>
              {callsLoading ? (
                <p role="status" className="px-4 py-10 text-center text-sm text-gray-500">
                  Đang tải lịch sử cuộc gọi...
                </p>
              ) : (
                <Table
                  columns={columns}
                  records={currentData}
                  rowKey="orderCode"
                  tableClassName="min-w-[760px]"
                  className="overflow-hidden rounded-none border-0"
                  emptyMessage={
                    orderSearch || resultFilter
                      ? "Không tìm thấy cuộc gọi phù hợp."
                      : "Nhân viên chưa có lịch sử cuộc gọi."
                  }
                  pagination={{
                    page: currentPage,
                    pageSize,
                    totalPages,
                    totalRecords: filteredCalls.length,
                    onPageChange: setCurrentPage,
                  }}
                />
              )}
            </section>

            {employeeLoading ? (
              <section
                role="status"
                className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500 shadow-sm"
              >
                Đang tải thông tin nhân viên...
              </section>
            ) : employee && summary ? (
              <EmployeeSummaryPanel
                employee={employee}
                calls={calls ?? []}
                summary={summary}
              />
            ) : (
              <section className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500 shadow-sm">
                Chưa có dữ liệu tổng hợp cho nhân viên này.
              </section>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default EmployeeDetailPage;
