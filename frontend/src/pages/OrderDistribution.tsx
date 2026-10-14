import { useState } from "react";
import { Button } from "../components/ui/button";
import Table, { type TableColumn } from "../components/ui/Table";
import useApiData from "../hooks/useApiData";
import usePagination from "../hooks/usePagination";
import { API_ENDPOINTS } from "../services/api";
import type {
  AuditLogRecord,
  DistributionRecommendation,
  PrintRequest,
} from "../services/types";
import AllOrder from "./order-distribution/components/AllOrder";
import AssignProposalModal from "./order-distribution/components/AssignProposalModal";
import EmployeesTab from "./order-distribution/components/EmployeesTab";
import PrintOrderModal from "./order-distribution/components/PrintOrderModal";
import ProcessTab from "./order-distribution/components/ProcessTab";

type OrderDistributionTab = "all" | "process" | "employees";

const auditLogColumns: TableColumn<AuditLogRecord>[] = [
  { key: "batch", title: "Đợt", render: ({ batch }) => `Đợt ${batch}` },
  { key: "approveTime", title: "Giờ duyệt" },
  { key: "orderCount", title: "Số đơn", render: ({ orderCount }) => `${orderCount} đơn` },
  {
    key: "employeesCount",
    title: "Nhân viên",
    render: ({ employeesCount }) => `${employeesCount} nhân viên`,
  },
  {
    key: "exceptionOrder",
    title: "Đơn ngoại lệ",
    render: ({ exceptionOrder }) => `${exceptionOrder} đơn ngoại lệ`,
  },
  { key: "manager", title: "Người duyệt" },
  { key: "note", title: "Ghi chú" },
];

const OrderDistribution = () => {
  const [tabOpen, setTabOpen] = useState<OrderDistributionTab>("all");
  const [isAssignProposalModalOpen, setAssignProposalModalOpen] = useState(false);
  const [isPrintOrderModalOpen, setPrintOrderModalOpen] = useState(false);
  const { data: auditLog, error: auditLogError, isLoading: isAuditLogLoading } =
    useApiData<AuditLogRecord[]>(API_ENDPOINTS.orderDistribution.auditLog);
  const { data: recommendation, error: recommendationError } =
    useApiData<DistributionRecommendation>(
      API_ENDPOINTS.orderDistribution.recommendation,
    );
  const { data: printRequest, error: printRequestError } =
    useApiData<PrintRequest>(API_ENDPOINTS.orderDistribution.printRequest);
  const auditRecords = auditLog ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: auditRecords,
    pageSize: 5,
  });
  const tabClassName = (tab: OrderDistributionTab) =>
    `rounded-md px-3 py-2 justify-center gap-1.5 ${
      tabOpen === tab
        ? "bg-red-700 text-white font-bold hover:bg-red-800"
        : "border border-gray-100 bg-white font-medium hover:bg-red-700 hover:text-white"
    }`;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-bold">Phân phối đơn hàng</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            className={tabClassName("all")}
            onClick={() => setTabOpen("all")}
          >
            Xem tất cả
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={tabClassName("process")}
            onClick={() => setTabOpen("process")}
          >
            Cần chú ý
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={tabClassName("employees")}
            onClick={() => setTabOpen("employees")}
          >
            Nhân viên
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-b-red-600 bg-white px-4 py-3">
        {recommendationError ? (
          <p role="alert">Không tải được đề xuất phân công: {recommendationError}</p>
        ) : recommendation ? (
          <p className="font-bold text-red-800">
            ĐỢT {recommendation.batch}: {recommendation.orderCount} ĐƠN /{" "}
            {recommendation.employeesCount} NHÂN VIÊN:
            <span className="text-sm font-normal text-gray-500">
              {" "}
              AI đã tính phương án tối ưu - {recommendation.manualOrderCount} đơn cần xử lý tay
            </span>
          </p>
        ) : (
          <p role="status">Đang tải đề xuất phân công...</p>
        )}
        <Button
          type="button"
          disabled={!recommendation}
          onClick={() => setAssignProposalModalOpen(true)}
        >
          Xem đề xuất phân công
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-b-red-600 bg-white px-2 py-2">
        {printRequestError ? (
          <p role="alert">Không tải được yêu cầu in: {printRequestError}</p>
        ) : printRequest ? (
          <p className="text-xs font-normal text-gray-500">
            [Máy in] 1 nhân viên yêu cầu in block tiếp: {printRequest.employeeName}{" "}
            ({printRequest.employeeId}) - Block tiếp theo{" "}
            {printRequest.nextBlockCount} phiếu
          </p>
        ) : (
          <p role="status">Đang tải yêu cầu in...</p>
        )}
        <Button
          type="button"
          disabled={!printRequest}
          onClick={() => setPrintOrderModalOpen(true)}
        >
          Xác nhận in mới
        </Button>
      </div>

      {tabOpen === "all" ? (
        <AllOrder />
      ) : tabOpen === "process" ? (
        <ProcessTab
          onViewAll={() => setTabOpen("all")}
          printRequest={printRequest}
        />
      ) : (
        <EmployeesTab />
      )}

      <div className="mt-6">
        {isAuditLogLoading ? (
          <p role="status">Đang tải lịch sử phân công...</p>
        ) : auditLogError ? (
          <p role="alert">Không tải được lịch sử phân công: {auditLogError}</p>
        ) : (
          <Table
            title="Audit log - Lịch sử duyệt đợt phân công hôm nay"
            columns={auditLogColumns}
            records={currentData}
            rowKey="batch"
            pagination={{
              page: currentPage,
              pageSize: 5,
              totalPages,
              totalRecords: auditRecords.length,
              onPageChange: setCurrentPage,
            }}
          />
        )}
      </div>

      {isAssignProposalModalOpen && recommendation && (
        <AssignProposalModal
          recommendation={recommendation}
          setIsAgssignProposalModalOpen={setAssignProposalModalOpen}
        />
      )}
      {isPrintOrderModalOpen && printRequest && (
        <PrintOrderModal
          printRequest={printRequest}
          setPrintOrderModalOpen={setPrintOrderModalOpen}
        />
      )}
    </>
  );
};

export default OrderDistribution;
