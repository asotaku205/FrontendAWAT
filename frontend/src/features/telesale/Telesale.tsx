import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Card from "../../components/Card";
import { Button } from "../../components/Button";
import Filter from "../../components/Filter";
import SearchInput from "../../components/SearchInput";
import SelectOption from "../../components/SelectOption";
import Table, { type TableColumn } from "../../components/Table";
import useApiData from "../../hooks/use-api-data";
import usePagination from "../../hooks/use-pagination";
import useTelesaleEmployees from "../../hooks/use-telesale-employees";
import { API_ENDPOINTS } from "../../services/api";
import type { TelesaleEmployee, TelesaleSummary } from "../../services/types";

const pageSize = 6;

const Telesale = () => {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    employees,
    error,
    isLoading,
    filterOptions,
    filterOptionsError,
    areFilterOptionsLoading,
    search,
    setSearch,
    employeeName,
    setEmployeeName,
    receivingStatus,
    setReceivingStatus,
    callStatus,
    setCallStatus,
    resetFilters,
    workingStatus,
    setWorkingStatus,
  } = useTelesaleEmployees();
  const {
    data: summary,
    error: summaryError,
    isLoading: isSummaryLoading,
  } = useApiData<TelesaleSummary>(API_ENDPOINTS.telesaleSummary);
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination({
    data: employees,
    pageSize,
  });

  const averageCallTime = useMemo(() => {
    if (!summary) return "—";
    const seconds = summary.averageCallTimeSeconds;
    return `${Math.floor(seconds / 60)}p${String(seconds % 60).padStart(2, "0")}`;
  }, [summary]);

  const columns: TableColumn<TelesaleEmployee>[] = [
    { key: "employeeName", title: "Nhân viên" },
    {
      key: "receivingStatus",
      title: "Nhận cuộc gọi",
      render: ({ receivingStatus }) => (
        <span className={receivingStatus === "Đang nhận" ? "text-green-700" : "text-amber-700"}>
          {receivingStatus}
        </span>
      ),
    },
    { key: "successfulCalls", title: "Thành công" },
    { key: "failedCalls", title: "Thất bại" },
    { key: "successRate", title: "Tỉ lệ TC", render: ({ successRate }) => `${successRate}%` },
    { key: "totalCalls", title: "Tổng cuộc" },
    { key: "averageCallTime", title: "TG gọi TB" },
    { key: "totalCallTime", title: "Tổng TG gọi" },
    {
      key: "progress",
      title: "Tiến độ",
      render: ({ progress }) => (
        <div className="flex min-w-20 items-center gap-1">
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
            <span
              className="block h-full rounded-full bg-red-700"
              style={{ width: `${progress}%` }}
            />
          </span>
          <span>{progress}%</span>
        </div>
      ),
    },
    {
      key: "employeeName",
      id: "details",
      title: "Chi tiết",
      render: (employee) => (
        <button
          type="button"
          className="font-medium text-red-700 underline"
          onClick={() =>
            navigate(`/telesale/Employees?${new URLSearchParams({ employeeName: employee.employeeName })}`)
          }
        >
          Xem
        </button>
      ),
    },
  ];

  return (
    <section className="flex min-w-0 flex-col gap-4">
      {summaryError && <p role="alert">Không tải được thống kê telesale: {summaryError}</p>}
      <div className="grid gap-2 lg:grid-cols-[minmax(0,4fr)_minmax(230px,1fr)]">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "NV đang nhận cuộc gọi", value: summary?.activeEmployees },
            { label: "NV đang tạm dừng", value: summary?.pausedEmployees },
            { label: "Tổng cuộc gọi hôm nay", value: summary?.totalCallsToday },
            { label: "Tỷ lệ thành công", value: summary ? `${summary.successRate}%` : "—" },
          ].map(({ label, value }) => (
            <Card
              key={label}
              title={label}
              description={isSummaryLoading ? "..." : String(value ?? "—")}
            />
          ))}
        </div>
        <aside className="flex flex-col justify-center gap-2 rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-sm">
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
            Kết quả hôm nay: {summary?.successfulCalls ?? "—"} Thành công · {summary?.failedCalls ?? "—"} Thất bại
          </p>
          <p className="rounded-md border border-gray-200 px-3 py-2 text-center text-gray-700">
            TG gọi TB toàn đội: <strong>{averageCallTime}</strong>
          </p>
        </aside>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <SelectOption
          title="Trạng thái làm việc"
          placeholder="Trạng thái: Đang làm"
          option={filterOptions?.workingStatuses ?? []}
          value={workingStatus}
          onChange={(event) => {
            setWorkingStatus(event.target.value);
            setCurrentPage(1);
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          {filtersOpen ? "Ẩn bộ lọc" : "Tìm nhân viên..."}
        </Button>
      </div>

      {filtersOpen && (
        <Filter
          onReset={() => {
            resetFilters();
            setCurrentPage(1);
          }}
        >
          <SearchInput
            placeholder="Tìm theo tên nhân viên"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
          {areFilterOptionsLoading ? (
            <p role="status">Đang tải tùy chọn lọc...</p>
          ) : filterOptions ? (
            <>
              <SelectOption
                title="Nhân viên"
                placeholder="Tất cả nhân viên"
                option={filterOptions.employees}
                value={employeeName}
                onChange={(event) => {
                  setEmployeeName(event.target.value);
                  setCurrentPage(1);
                }}
              />
              <SelectOption
                title="Trạng thái nhận"
                placeholder="Tất cả trạng thái"
                option={filterOptions.receivingStatuses}
                value={receivingStatus}
                onChange={(event) => {
                  setReceivingStatus(event.target.value);
                  setCurrentPage(1);
                }}
              />
              <SelectOption
                title="Trạng thái cuộc gọi"
                placeholder="Tất cả trạng thái"
                option={filterOptions.callStatuses}
                value={callStatus}
                onChange={(event) => {
                  setCallStatus(event.target.value);
                  setCurrentPage(1);
                }}
              />
            </>
          ) : null}
        </Filter>
      )}
      {filterOptionsError && <p role="alert">Không tải được bộ lọc: {filterOptionsError}</p>}

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
          Tổng quan tiến độ Telesale theo thời gian thực
        </h2>
        {isLoading ? (
          <p role="status" className="p-5">Đang tải danh sách nhân viên...</p>
        ) : error ? (
          <p role="alert" className="p-5 text-red-700">Không tải được danh sách: {error}</p>
        ) : (
          <Table
            columns={columns}
            records={currentData}
            rowKey="employeeName"
            className="overflow-hidden rounded-none border-0"
            tableClassName="min-w-[900px]"
            pagination={{
              page: currentPage,
              pageSize,
              totalPages,
              totalRecords: employees.length,
              onPageChange: setCurrentPage,
            }}
          />
        )}
      </section>
    </section>
  );
};

export default Telesale;
