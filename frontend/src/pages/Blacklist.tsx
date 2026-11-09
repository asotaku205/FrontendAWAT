import axios from "axios";
import { useState } from "react";
import { statusBadgeClass } from "../mocks/blacklist-data";
import type { BlacklistOrder, BlacklistOrderStatus } from "../services/types";
import usePagination from "../hooks/use-pagination";
import OrderDetailModal from "../features/blacklist/OrderDetailModal";
import type { TableColumn } from "../components/Table";
import Panel from "../features/business-forecast/components/Panel";
import Table from "../components/Table";
import { Button } from "../components/Button";
import { API_ENDPOINTS, apiPatch } from "../services/api";
import useApiData from "../hooks/use-api-data";
import Modal from "../components/Modal";
import type { BlacklistDecisionRequest } from "../services/types";

const STATUS_FILTERS: ("all" | BlacklistOrderStatus)[] = [
  "all",
  "Đã kiểm tra",
  "Hoàn nhiều lần",
  "Blacklist",
  "Đã hủy",
];

const BlacklistCheck = () => {
  type Decision = { action: "go" | "cancel"; orderCodes: string[] };
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | BlacklistOrderStatus
  >("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState<
    Record<string, BlacklistOrderStatus>
  >({});
  const [pendingDecision, setPendingDecision] = useState<Decision | null>(null);
  const [decisionError, setDecisionError] = useState<string | null>(null);
  const [isSavingDecision, setIsSavingDecision] = useState(false);
  const params = new URLSearchParams();
  if (statusFilter !== "all") {
    params.set("status", statusFilter);
  }
  if (sourceFilter !== "all") {
    params.set("orderSource", sourceFilter);
  }
  const queryString = params.toString();
  const blacklistEndpoint = queryString
    ? `${API_ENDPOINTS.blacklistOrders}?${queryString}`
    : API_ENDPOINTS.blacklistOrders;

  const {
    data: blacklistOrderData,
    error,
    isLoading,
  } = useApiData<BlacklistOrder[]>(blacklistEndpoint);
  const rows = blacklistOrderData ?? [];
  const updatedRows = rows.map((order) => ({
    ...order,
    status: statusUpdates[order.orderCode] ?? order.status,
  }));
  const reviewOrders = updatedRows.filter(
    (order) =>
      order.status === "Blacklist" || order.status === "Hoàn nhiều lần",
  );
  const filtered = updatedRows.filter((r) => {
    if (
      isReviewing &&
      r.status !== "Blacklist" &&
      r.status !== "Hoàn nhiều lần"
    ) {
      return false;
    }
    if (
      query &&
      !r.orderCode.toLowerCase().includes(query.toLowerCase()) &&
      !r.phoneNumber.includes(query)
    )
      return false;
    return true;
  });
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: filtered,
      pageSize: 8,
    });

  if (isLoading)
    return <p role="status">Đang tải danh sách đơn blacklist...</p>;
  if (error || !blacklistOrderData) {
    return (
      <p role="alert">
        Không tải được dữ liệu: {error ?? "Phản hồi API không hợp lệ."}
      </p>
    );
  }
  const blacklistColumns: TableColumn<BlacklistOrder>[] = [
    { key: "orderCode", title: "Mã đơn" },
    { key: "orderDate", title: "Ngày đặt hàng" },
    { key: "customerName", title: "Tên khách hàng" },
    {
      key: "phoneNumber",
      title: "Số điện thoại",
    },
    {
      key: "productName",
      title: "Tên sản phẩm",
      render: (o) => (
        <div>
          <div>{o.productName}</div>
          <div className="text-xs text-gray-400">{o.refundRateSummary}</div>
        </div>
      ),
    },

    {
      key: "refundRateLastMonth",
      title: "Tỉ lệ hoàn 1 tháng",
      render: (o) => (
        <span
          className={
            o.refundRateLastMonth > 60
              ? "font-medium text-red-600"
              : "text-green-600"
          }
        >
          {o.refundRateLastMonth}%
        </span>
      ),
    },
    {
      key: "refundRateLast3Months",
      title: "Tỉ lệ hoàn 3 tháng",
      render: (o) => (
        <span
          className={
            o.refundRateLast3Months > 60
              ? "font-medium text-red-600"
              : "text-green-600"
          }
        >
          {o.refundRateLast3Months}%
        </span>
      ),
    },
    {
      key: "quantity",
      title: "Số lượng",
    },
    {
      key: "orderValue",
      title: "Giá trị đơn hàng",
    },
    {
      key: "orderSource",
      title: "Nguồn đơn",
    },
    {
      key: "adsStaffName",
      title: "Tên NV ADS",
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (o) => (
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${statusBadgeClass[o.status]}`}
        >
          {o.status}
        </span>
      ),
    },
    {
      key: "orderCode",
      id: "action", //tránh trùng React key với cột Mã đơn
      title: "",
      render: (o) => (
        <Button
          variant="link"
          size="sm"
          onClick={() => setDetailId(o.orderCode)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const askForDecision = (action: Decision["action"], orderCodes: string[]) => {
    if (orderCodes.length > 0) {
      setDecisionError(null);
      setPendingDecision({ action, orderCodes });
    }
  };

  const confirmDecision = async () => {
    if (!pendingDecision || isSavingDecision) return;
    const request: BlacklistDecisionRequest = {
      orderCodes: pendingDecision.orderCodes,
      status: pendingDecision.action === "go" ? "Đã kiểm tra" : "Đã hủy",
    };
    setIsSavingDecision(true);
    setDecisionError(null);
    try {
      const updatedOrders = await apiPatch<
        BlacklistOrder[],
        BlacklistDecisionRequest
      >(API_ENDPOINTS.blacklistOrders, request);
      setStatusUpdates((current) => {
        const updates = { ...current };
        updatedOrders.forEach((order) => {
          updates[order.orderCode] = order.status;
        });
        return updates;
      });
      setSelectedIds([]);
      setPendingDecision(null);
      setDetailId(null);
      setCurrentPage(1);
    } catch (requestError: unknown) {
      const responseMessage = axios.isAxiosError<{ message?: string }>(
        requestError,
      )
        ? requestError.response?.data?.message
        : undefined;
      setDecisionError(
        responseMessage ??
          (requestError instanceof Error
            ? requestError.message
            : "Không thể cập nhật trạng thái đơn hàng."),
      );
    } finally {
      setIsSavingDecision(false);
    }
  };

  const countBy = (s: BlacklistOrderStatus) =>
    updatedRows.filter((r) => r.status === s).length;
  const kpis = [
    { label: "Tất cả trạng thái", value: updatedRows.length },
    { label: "Đã kiểm tra", value: countBy("Đã kiểm tra") },
    { label: "Hoàn nhiều lần", value: countBy("Hoàn nhiều lần") },
    { label: "Blacklist", value: countBy("Blacklist") },
    { label: "Đã hủy", value: countBy("Đã hủy") },
  ];

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const toggleAll = () =>
    setSelectedIds((selected) =>
      selected.length === filtered.length
        ? []
        : filtered.map(({ orderCode }) => orderCode),
    );

  const detailOrder = updatedRows.find((r) => r.orderCode === detailId) ?? null;

  return (
    <div className="space-y-4">
      <div className="text-lg font-bold text-gray-900">
        Đơn check HNL &amp; Blacklist
      </div>

      <div className="grid grid-cols-6 gap-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="text-xs text-gray-500">{k.label}</div>
            <div className="mt-1 text-xl font-bold text-gray-900">
              {k.value}{" "}
              <span className="text-xs font-normal text-gray-400">đơn</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={isReviewing ? "outline" : "default"}
          onClick={() => {
            const nextReviewMode = !isReviewing;
            setIsReviewing(nextReviewMode);
            setStatusFilter("all");
            setSourceFilter("all");
            setQuery("");
            setSelectedIds([]);
            setCurrentPage(1);
          }}
        >
          {isReviewing ? "Quay lại danh sách đơn" : "Check Hoàn nhiều lần"}
        </Button>
        <span className="text-xs text-gray-500">
          {reviewOrders.length} đơn cần quyết định
        </span>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Nguồn: Tất cả</option>
          <option value="Sale Page">Sale Page</option>
          <option value="-">Khác</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | BlacklistOrderStatus)
          }
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "Tất cả trạng thái check HNL" : s}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm đơn hàng, SĐT..."
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        />
      </div>

      {isReviewing && selectedIds.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
          <span className="text-sm text-gray-700">
            Đã chọn <span className="font-bold">{selectedIds.length}</span> đơn
          </span>
          <Button onClick={() => askForDecision("go", selectedIds)}>
            Đi đơn
          </Button>
          <Button
            onClick={() => askForDecision("cancel", selectedIds)}
            variant="destructive"
          >
            Hủy đơn
          </Button>
          <span className="text-xs text-gray-400">
            (chỉ áp dụng cho đơn Blacklist / Hoàn nhiều lần)
          </span>
        </div>
      )}

      <Panel
        title={
          isReviewing
            ? "Đơn Blacklist và hoàn nhiều lần cần quyết định"
            : "Danh sách tất cả đơn check HNL & Blacklist"
        }
      >
        <Table
          columns={blacklistColumns}
          records={currentData}
          rowKey="orderCode"
          selection={
            isReviewing
              ? {
                  header: (
                    <input
                      type="checkbox"
                      checked={
                        currentData.length > 0 &&
                        currentData.every((r) =>
                          selectedIds.includes(r.orderCode),
                        )
                      }
                      onChange={toggleAll}
                    />
                  ),
                  render: (o) => (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(o.orderCode)}
                      onChange={() => toggleSelection(o.orderCode)}
                    />
                  ),
                }
              : undefined
          }
          pagination={{
            page: currentPage,
            pageSize: 8,
            totalPages,
            totalRecords: currentData.length,
            onPageChange: setCurrentPage,
          }}
        />
      </Panel>
      <OrderDetailModal
        order={detailOrder}
        onClose={() => setDetailId(null)}
        onDecision={(action, order) => {
          setDetailId(null);
          askForDecision(action, [order.orderCode]);
        }}
      />
      <Modal
        title={
          pendingDecision?.action === "go"
            ? "Xác nhận đi đơn"
            : "Xác nhận hủy đơn"
        }
        open={pendingDecision !== null}
        onClose={() => {
          if (!isSavingDecision) {
            setPendingDecision(null);
            setDecisionError(null);
          }
        }}
      >
        <p className="text-sm text-gray-700">
          {pendingDecision?.action === "go"
            ? `Bạn xác nhận cho ${pendingDecision.orderCodes.length} đơn được đi? Trạng thái sẽ chuyển thành “Đã kiểm tra”.`
            : `Bạn xác nhận hủy ${pendingDecision?.orderCodes.length} đơn đã chọn? Trạng thái sẽ chuyển thành “Đã hủy”.`}
        </p>
        {decisionError && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            Không thể cập nhật đơn hàng: {decisionError}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <Button
            variant="outline"
            disabled={isSavingDecision}
            onClick={() => {
              setPendingDecision(null);
              setDecisionError(null);
            }}
          >
            Quay lại
          </Button>
          <Button
            variant={
              pendingDecision?.action === "cancel" ? "destructive" : "default"
            }
            disabled={isSavingDecision}
            onClick={confirmDecision}
          >
            {isSavingDecision ? "Đang cập nhật..." : "Xác nhận"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BlacklistCheck;
