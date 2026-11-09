import { useState } from "react";
import { Button } from "../../../components/Button";
import Filter from "../../../components/Filter";
import SearchInput from "../../../components/SearchInput";
import SelectOption from "../../../components/SelectOption";
import Table, { type TableColumn } from "../../../components/Table";
import useApiData from "../../../hooks/use-api-data";
import usePagination from "../../../hooks/use-pagination";
import { API_ENDPOINTS } from "../../../services/api";
import type {
  OrderDistributionFilterOptions,
  PrintRequest,
  WarehouseEmployee,
} from "../../../services/types";
import PrintOrderModal from "./PrintOrderModal";

const pageSize = 5;

const EmployeesTab = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [isPrintOrderModalOpen, setPrintOrderModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: employees, error, isLoading } = useApiData<WarehouseEmployee[]>(
    `${API_ENDPOINTS.orderDistribution.employees}?refresh=${refreshKey}`,
  );
  const { data: filterOptions, error: filterError, isLoading: filtersLoading } =
    useApiData<OrderDistributionFilterOptions>(
      API_ENDPOINTS.orderDistribution.options,
    );
  const { data: printRequest, error: printError } = useApiData<PrintRequest | null>(
    `${API_ENDPOINTS.orderDistribution.printRequest}?refresh=${refreshKey}`,
  );
  const records = employees ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: records,
    pageSize,
  });
  const columns: TableColumn<WarehouseEmployee>[] = [
    { key: "employees", title: "Nhân viên" },
    { key: "currentBlock", title: "Đợt hiện tại" },
    { key: "completedOrder", title: "Đơn hoàn thành" },
    { key: "remainingOrder", title: "Đơn còn lại" },
    {
      key: "performance",
      title: "Tốc độ làm (1 giờ)",
      render: ({ performance }) => `${performance} đơn/giờ`,
    },
    {
      key: "eta",
      title: "ETA",
      render: ({ eta }) => `${eta} phút`,
    },
    {
      key: "status",
      title: "Trạng thái",
      render: ({ status }) =>
        status === "In thêm" ? (
          <Button
            type="button"
            size="sm"
            onClick={() => setPrintOrderModalOpen(true)}
          >
            {status}
          </Button>
        ) : (
          status
        ),
    },
  ];

  if (isLoading) return <p role="status">Đang tải danh sách nhân viên...</p>;
  if (error) return <p role="alert">Không tải được danh sách nhân viên: {error}</p>;

  return (
    <>
      <Filter className="mb-2 rounded border-gray-300 p-4 text-xs">
        <div className="flex flex-wrap gap-4">
          <SearchInput placeholder="Tìm kiếm nhân viên..." />
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAdvanceSearchOpen((open) => !open)}
          >
            {isAdvanceSearchOpen ? "Ẩn bộ lọc" : "Lọc nâng cao"}
          </Button>
        </div>
        {isAdvanceSearchOpen && filtersLoading && (
          <p role="status">Đang tải tùy chọn bộ lọc...</p>
        )}
        {isAdvanceSearchOpen && filterError && (
          <p role="alert">Không tải được tùy chọn bộ lọc: {filterError}</p>
        )}
        {isAdvanceSearchOpen && filterOptions && (
          <div className="flex flex-wrap gap-4">
            <SelectOption
              title="Khu vực kho"
              placeholder="Tất cả kho"
              option={filterOptions.locations}
              isFilter
            />
            <SelectOption
              title="Trạng thái"
              placeholder="Tất cả trạng thái"
              option={filterOptions.employeeStatuses}
              isFilter
            />
            <SelectOption
              title="Nhân viên"
              placeholder="Tất cả nhân viên"
              option={filterOptions.employees}
              isFilter
            />
          </div>
        )}
      </Filter>
      <Button
        type="button"
        className="mb-2"
        disabled={!printRequest}
        onClick={() => setPrintOrderModalOpen(true)}
      >
        In thêm cho NV sắp xong
      </Button>
      <Table
        columns={columns}
        records={currentData}
        rowKey="employees"
        pagination={{
          page: currentPage,
          pageSize,
          totalPages,
          totalRecords: records.length,
          onPageChange: setCurrentPage,
        }}
      />
      {printError && <p role="alert">Không tải được yêu cầu in: {printError}</p>}
      {isPrintOrderModalOpen && printRequest && (
        <PrintOrderModal
          printRequest={printRequest}
          setPrintOrderModalOpen={setPrintOrderModalOpen}
          onConfirmed={() => {
            setPrintOrderModalOpen(false);
            setRefreshKey((current) => current + 1);
          }}
        />
      )}
    </>
  );
};

export default EmployeesTab;
