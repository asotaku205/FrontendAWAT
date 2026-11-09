import { useMemo, useState } from "react";
import axios from "axios";
import {
  ArrowDownWideNarrow,
  Check,
  Phone,
  RotateCcw,
  UsersRound,
} from "lucide-react";
import Card from "../../components/Card";
import { Button } from "../../components/Button";
import CheckBox from "../../components/checkbox";
import Modal from "../../components/Modal";
import SearchInput from "../../components/SearchInput";
import SelectOption from "../../components/SelectOption";
import Table, { type TableColumn } from "../../components/Table";
import useApiData from "../../hooks/use-api-data";
import usePagination from "../../hooks/use-pagination";
import { API_ENDPOINTS, apiPatch, apiPost } from "../../services/api";
import type {
  TelesaleAssignmentAgent,
  TelesaleAssignmentSummary,
  TelesalePriorityOrder,
  TelesaleWorkSummary,
  TelesaleWorkOrder,
} from "../../services/types";

type AssignmentView = "dispatch" | "work";

type AssignmentResponse = {
  assignedOrders: number;
  selectedEmployees?: number;
};

const pageSize = 7;
const priorityOptions = ["Theo ETA", "Theo số đơn", "Thủ công"];

const getRequestError = (error: unknown) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return (
      error.response?.data?.message ??
      "Không thể kết nối đến máy chủ. Vui lòng thử lại."
    );
  }
  return error instanceof Error
    ? error.message
    : "Đã xảy ra lỗi. Vui lòng thử lại.";
};

const getOrderColumns = (): TableColumn<TelesalePriorityOrder>[] => [
  { key: "orderCode", title: "Mã đơn", className: "whitespace-nowrap" },
  { key: "waybill", title: "Waybill", className: "whitespace-nowrap" },
  { key: "customerName", title: "Khách hàng" },
  { key: "phoneNumber", title: "SĐT", className: "whitespace-nowrap" },
  { key: "expectedDelivery", title: "Dự kiến giao", className: "whitespace-nowrap" },
  { key: "product", title: "Sản phẩm" },
  {
    key: "eta",
    title: "ETA",
    render: ({ eta }) => (
      <span
        className={`font-semibold ${
          eta.startsWith("2h") || eta.startsWith("3h")
            ? "text-red-700"
            : "text-gray-700"
        }`}
      >
        {eta}
      </span>
    ),
  },
  { key: "callSuggestion", title: "Gợi ý gọi", className: "whitespace-nowrap" },
  {
    key: "status",
    title: "Trạng thái",
    render: ({ status }) => (
      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
        {status}
      </span>
    ),
  },
];

const AutoAssignModal = ({
  agents,
  priorityOrderCount,
  selectedAgentIds,
  onAgentSelectionChange,
  onAgentUpdate,
  onClose,
  onConfirm,
  isSubmitting,
  errorMessage,
}: {
  agents: TelesaleAssignmentAgent[];
  priorityOrderCount: number | undefined;
  selectedAgentIds: string[];
  onAgentSelectionChange: (ids: string[]) => void;
  onAgentUpdate: (
    employeeId: string,
    values: { autoAccept?: boolean; priority?: string },
  ) => void;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  errorMessage: string;
}) => {
  const availableAgentIds = agents
    .filter(({ status }) => status === "Đang làm")
    .map(({ employeeId }) => employeeId);
  const allSelected =
    availableAgentIds.length > 0 &&
    availableAgentIds.every((id) => selectedAgentIds.includes(id));

  return (
    <Modal
      title="Thiết lập chia tự động Telesale"
      description={`Pool hiện có ${priorityOrderCount ?? "—"} đơn nên gọi. Hệ thống sẽ tự phân cho Telesale đang làm theo ETA và thời gian gợi ý gọi.`}
      open
      onClose={onClose}
      className="max-h-[calc(100vh-2rem)] !max-w-[560px] overflow-y-auto rounded-lg"
      contentClassName="p-0"
    >
      <div className="space-y-3 p-4">
        <CheckBox
          title="Chọn tất cả nhân viên đang làm"
          checked={allSelected}
          onChange={(event) =>
            onAgentSelectionChange(event.target.checked ? availableAgentIds : [])
          }
          className="size-4"
        />

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[520px] text-left text-[10px]">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="w-10 px-2 py-2 text-center">Chọn</th>
                <th className="px-2 py-2">Nhân viên CSKH</th>
                <th className="px-2 py-2">Trạng thái</th>
                <th className="px-2 py-2">Đơn đang gọi</th>
                <th className="px-2 py-2">Tự nhận tiếp</th>
                <th className="px-2 py-2">Ưu tiên / ETA</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => {
                const isAvailable = agent.status === "Đang làm";
                return (
                  <tr key={agent.employeeId} className="border-t border-gray-100">
                    <td className="px-2 py-2 text-center">
                      <CheckBox
                        aria-label={`Chọn ${agent.employeeName}`}
                        checked={selectedAgentIds.includes(agent.employeeId)}
                        disabled={!isAvailable}
                        onChange={(event) => {
                          const nextIds = event.target.checked
                            ? [...selectedAgentIds, agent.employeeId]
                            : selectedAgentIds.filter(
                                (id) => id !== agent.employeeId,
                              );
                          onAgentSelectionChange(nextIds);
                        }}
                      />
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-800">
                      {agent.employeeName}
                      <span className="ml-2 text-xs text-gray-400">
                        {agent.employeeId}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          isAvailable
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      {agent.activeCalls}
                    </td>
                    <td className="px-2 py-2">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={agent.autoAccept}
                        aria-label={`Tự nhận đơn tiếp: ${agent.employeeName}`}
                        disabled={!isAvailable}
                        onClick={() =>
                          onAgentUpdate(agent.employeeId, {
                            autoAccept: !agent.autoAccept,
                          })
                        }
                        className={`relative h-6 w-11 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                          agent.autoAccept ? "bg-red-700" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                            agent.autoAccept ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <select
                        aria-label={`Ưu tiên chia đơn: ${agent.employeeName}`}
                        value={agent.priority}
                        disabled={!isAvailable}
                        onChange={(event) =>
                          onAgentUpdate(agent.employeeId, {
                            priority: event.target.value,
                          })
                        }
                        className="h-9 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 disabled:bg-gray-50"
                      >
                        {priorityOptions.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {errorMessage && (
          <p role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        )}
      </div>
      <footer className="flex flex-wrap justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button
          type="button"
          disabled={isSubmitting || selectedAgentIds.length === 0}
          onClick={onConfirm}
        >
          {isSubmitting ? "Đang chia đơn..." : "Bật chia tự động"}
        </Button>
      </footer>
    </Modal>
  );
};

const DispatchView = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [sortByEta, setSortByEta] = useState(false);
  const [selectedOrderCodes, setSelectedOrderCodes] = useState<string[]>([]);
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>([]);
  const [manualAgentId, setManualAgentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [refresh, setRefresh] = useState(0);

  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);
  if (deliveryDate) params.set("deliveryDate", deliveryDate);
  params.set("refresh", String(refresh));
  const ordersEndpoint = `${API_ENDPOINTS.telesaleAssignment.orders}?${params.toString()}`;

  const { data: orders, error: ordersError, isLoading: ordersLoading } =
    useApiData<TelesalePriorityOrder[]>(ordersEndpoint);
  const { data: agents, error: agentsError, isLoading: agentsLoading } =
    useApiData<TelesaleAssignmentAgent[]>(
      `${API_ENDPOINTS.telesaleAssignment.agents}?refresh=${refresh}`,
    );
  const { data: summary, error: summaryError } =
    useApiData<TelesaleAssignmentSummary>(
      `${API_ENDPOINTS.telesaleAssignment.summary}?refresh=${refresh}`,
    );

  const sortedOrders = useMemo(() => {
    const records = [...(orders ?? [])];
    if (!sortByEta) return records;
    return records.sort((first, second) => {
      const firstHours = Number.parseFloat(first.eta);
      const secondHours = Number.parseFloat(second.eta);
      const firstTotalHours = firstHours * (first.eta.includes("ngày") ? 24 : 1);
      const secondTotalHours =
        secondHours * (second.eta.includes("ngày") ? 24 : 1);
      return firstTotalHours - secondTotalHours;
    });
  }, [orders, sortByEta]);

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination({ data: sortedOrders, pageSize });
  const activeAgents = (agents ?? []).filter(
    ({ status: agentStatus }) => agentStatus === "Đang làm",
  );
  const allVisibleSelected =
    currentData.some((order) => order.status === "Chưa chia") &&
    currentData
      .filter((order) => order.status === "Chưa chia")
      .every((order) => selectedOrderCodes.includes(order.orderCode));

  const selectedManualAgentId =
    manualAgentId || activeAgents[0]?.employeeId || "";

  const toggleOrder = (orderCode: string, checked: boolean) => {
    setSelectedOrderCodes((selected) =>
      checked
        ? [...new Set([...selected, orderCode])]
        : selected.filter((code) => code !== orderCode),
    );
  };

  const updateAgent = async (
    employeeId: string,
    values: { autoAccept?: boolean; priority?: string },
  ) => {
    try {
      await apiPatch<TelesaleAssignmentAgent, { employeeId: string } & typeof values>(
        API_ENDPOINTS.telesaleAssignment.receiving,
        { employeeId, ...values },
      );
      setRefresh((value) => value + 1);
    } catch (error) {
      setErrorMessage(getRequestError(error));
    }
  };

  const assignAutomatically = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const result = await apiPost<
        AssignmentResponse,
        { employeeIds: string[]; orderCodes: string[] }
      >(API_ENDPOINTS.telesaleAssignment.autoAssign, {
        employeeIds: selectedAgentIds,
        orderCodes: selectedOrderCodes,
      });
      setNotice(`${result.assignedOrders} đơn đã được phân cho nhân viên.`);
      setSelectedOrderCodes([]);
      setAssignModalOpen(false);
      setRefresh((value) => value + 1);
    } catch (error) {
      setErrorMessage(getRequestError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const assignManually = async () => {
    setErrorMessage("");
    if (!selectedOrderCodes.length || !selectedManualAgentId) {
      setErrorMessage("Chọn đơn hàng và nhân viên trước khi phân công.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await apiPost<
        AssignmentResponse,
        { employeeId: string; orderCodes: string[] }
      >(API_ENDPOINTS.telesaleAssignment.manualAssign, {
        employeeId: selectedManualAgentId,
        orderCodes: selectedOrderCodes,
      });
      setNotice(`${result.assignedOrders} đơn đã được phân công thủ công.`);
      setSelectedOrderCodes([]);
      setRefresh((value) => value + 1);
    } catch (error) {
      setErrorMessage(getRequestError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setDeliveryDate("");
    setSortByEta(false);
    setSelectedOrderCodes([]);
    setCurrentPage(1);
  };

  const orderColumns = getOrderColumns();

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900">
          CSKH - Phân chia đơn
        </h1>
        <Button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setSelectedAgentIds(activeAgents.map(({ employeeId }) => employeeId));
            setAssignModalOpen(true);
          }}
          disabled={activeAgents.length === 0}
          className="gap-2"
        >
          <UsersRound aria-hidden="true" size={17} />
          Chia tự động
        </Button>
      </header>

      {summaryError && (
        <p role="alert" className="text-sm text-red-700">
          Không tải được thống kê: {summaryError}
        </p>
      )}
      <section
        aria-label="Tổng quan phân chia đơn Telesale"
        className="grid grid-cols-2 gap-3 lg:grid-cols-5"
      >
        {[
          { title: "Tất cả đơn", value: String(summary?.totalOrders ?? "—") },
          { title: "Đơn nên ưu tiên gọi", value: String(summary?.priorityOrders ?? "—") },
          { title: "Đã tự chia hôm nay", value: String(summary?.assignedToday ?? "—") },
          { title: "NV đang hoạt động", value: String(summary?.activeEmployees ?? "—") },
          { title: "Not need call", value: String(summary?.notNeedCall ?? "—") },
        ].map(({ title, value }) => (
          <Card key={title} title={title} description={value} />
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 py-4">
          <div>
            <h2 className="text-sm font-semibold uppercase text-gray-900">
              Danh sách đơn nên ưu tiên gọi
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 xl:flex-row xl:items-end">
          <SearchInput
            placeholder="Tìm mã đơn, SĐT, khách hàng..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10"
          />
          <SelectOption
            title="Trạng thái"
            placeholder="Tất cả trạng thái"
            option={["Chưa chia", "Đã chia", "Đang gọi"]}
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setCurrentPage(1);
            }}
            className="min-w-44"
          />
          <label className="flex min-w-40 flex-col gap-1.5 text-sm">
            <span className="font-medium text-gray-700">Dự kiến giao</span>
            <input
              type="date"
              value={
                deliveryDate
                  ? deliveryDate.split("/").reverse().join("-")
                  : ""
              }
              onChange={(event) => {
                const [year, month, day] = event.target.value.split("-");
                setDeliveryDate(
                  event.target.value ? `${day}/${month}/${year}` : "",
                );
                setCurrentPage(1);
              }}
              className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
            />
          </label>
          <Button
            type="button"
            variant={sortByEta ? "default" : "outline"}
            className="gap-2"
            onClick={() => setSortByEta((value) => !value)}
          >
            <ArrowDownWideNarrow aria-hidden="true" size={16} />
            {sortByEta ? "ETA gần nhất" : "Sắp xếp theo ETA"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="gap-2 text-gray-600"
            onClick={resetFilters}
          >
            <RotateCcw aria-hidden="true" size={16} />
            Xóa bộ lọc
          </Button>
        </div>

        {agentsError && (
          <p role="alert" className="px-4 pt-3 text-sm text-red-700">
            Không tải được nhân viên: {agentsError}
          </p>
        )}
        {errorMessage && !isAssignModalOpen && (
          <p role="alert" className="px-4 pt-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}
        {notice && (
          <p
            role="status"
            className="mx-4 mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
          >
            {notice}
          </p>
        )}

        {selectedOrderCodes.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 bg-red-50/50 px-4 py-3">
            <span className="text-sm font-medium text-gray-800">
              Đã chọn {selectedOrderCodes.length} đơn
            </span>
            {agentsLoading ? (
              <span role="status" className="text-sm text-gray-500">
                Đang tải nhân viên...
              </span>
            ) : (
              <SelectOption
                title="Nhân viên"
                placeholder="Chọn nhân viên CSKH"
                option={activeAgents.map(({ employeeId, employeeName }) => ({
                  label: `${employeeName} (${employeeId})`,
                  value: employeeId,
                }))}
                value={selectedManualAgentId}
                onChange={(event) => setManualAgentId(event.target.value)}
                className="min-w-64"
              />
            )}
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting || !selectedManualAgentId}
              onClick={assignManually}
            >
              {isSubmitting ? "Đang phân công..." : "Phân công đã chọn"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setErrorMessage("");
                setSelectedAgentIds(activeAgents.map(({ employeeId }) => employeeId));
                setAssignModalOpen(true);
              }}
            >
              Chia tự động
            </Button>
          </div>
        )}

        {ordersLoading ? (
          <p role="status" className="px-4 py-10 text-center text-sm text-gray-500">
            Đang tải danh sách đơn ưu tiên...
          </p>
        ) : ordersError ? (
          <p role="alert" className="px-4 py-10 text-center text-sm text-red-700">
            Không tải được danh sách đơn: {ordersError}
          </p>
        ) : (
          <Table
            columns={orderColumns}
            records={currentData}
            rowKey="orderCode"
            tableClassName="min-w-[1120px]"
            selection={{
              header: (
                <CheckBox
                  aria-label="Chọn tất cả đơn trên trang"
                  checked={allVisibleSelected}
                  onChange={(event) =>
                    setSelectedOrderCodes((selected) =>
                      event.target.checked
                        ? [...new Set([
                            ...selected,
                            ...currentData
                              .filter(({ status }) => status === "Chưa chia")
                              .map(({ orderCode }) => orderCode),
                          ])]
                        : selected.filter(
                            (code) =>
                              !currentData.some(
                                (order) => order.orderCode === code,
                              ),
                          ),
                    )
                  }
                />
              ),
              render: (order) => (
                <CheckBox
                  aria-label={`Chọn đơn ${order.orderCode}`}
                  checked={selectedOrderCodes.includes(order.orderCode)}
                  disabled={order.status !== "Chưa chia"}
                  onChange={(event) =>
                    toggleOrder(order.orderCode, event.target.checked)
                  }
                />
              ),
              className: "w-10 text-center",
            }}
            emptyMessage="Không có đơn hàng phù hợp với bộ lọc."
            pagination={{
              page: currentPage,
              pageSize,
              totalPages,
              totalRecords: sortedOrders.length,
              onPageChange: setCurrentPage,
            }}
          />
        )}
      </section>

      {isAssignModalOpen && (
        <AutoAssignModal
          agents={agents ?? []}
          priorityOrderCount={summary?.priorityOrders}
          selectedAgentIds={selectedAgentIds}
          onAgentSelectionChange={setSelectedAgentIds}
          onAgentUpdate={(employeeId, values) => {
            if (values.autoAccept !== undefined) {
              void updateAgent(employeeId, { autoAccept: values.autoAccept });
            }
            if (values.priority) {
              void updateAgent(employeeId, { priority: values.priority });
            }
          }}
          onClose={() => setAssignModalOpen(false)}
          onConfirm={assignAutomatically}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

const WorkView = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [workSearch, setWorkSearch] = useState("");
  const [selectedOrderCode, setSelectedOrderCode] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const { data: agents, error: agentsError, isLoading: agentsLoading } =
    useApiData<TelesaleAssignmentAgent[]>(
      `${API_ENDPOINTS.telesaleAssignment.agents}?refresh=${refresh}`,
    );
  const employeeOptions = useMemo(() => agents ?? [], [agents]);
  const availableEmployeeOptions = useMemo(
    () =>
      employeeOptions.filter(({ status }) => status === "Đang làm"),
    [employeeOptions],
  );
  const selectedEmployeeName =
    employeeName ||
    availableEmployeeOptions[0]?.employeeName ||
    employeeOptions[0]?.employeeName ||
    "";

  const workSummaryEndpoint = `${API_ENDPOINTS.telesaleAssignment.workSummary}?${new URLSearchParams(
    { employeeName: selectedEmployeeName, refresh: String(refresh) },
  ).toString()}`;
  const {
    data: workSummary,
    error: workSummaryError,
    isLoading: workSummaryLoading,
  } = useApiData<TelesaleWorkSummary>(workSummaryEndpoint);
  const workOrdersEndpoint = `${API_ENDPOINTS.telesaleAssignment.workOrders}?${new URLSearchParams(
    { employeeName: selectedEmployeeName, refresh: String(refresh) },
  ).toString()}`;
  const {
    data: workOrders,
    error: workOrdersError,
    isLoading: workOrdersLoading,
  } = useApiData<TelesaleWorkOrder[]>(workOrdersEndpoint);
  const currentOrder =
    workOrders?.find(({ orderCode }) => orderCode === selectedOrderCode) ??
    workOrders?.find(({ result }) => result === "Đang gọi") ??
    workOrders?.[0];
  const visibleWorkOrders = useMemo(() => {
    const query = workSearch.trim().toLocaleLowerCase("vi-VN");
    return (workOrders ?? []).filter((order) => {
      const searchableText =
        `${order.orderCode} ${order.customerName} ${order.phoneNumber} ${order.waybill}`
          .toLocaleLowerCase("vi-VN");
      return !query || searchableText.includes(query);
    });
  }, [workOrders, workSearch]);

  const updateResult = async (result: "Thành công" | "Thất bại") => {
    if (!currentOrder) return;
    setErrorMessage("");
    setIsSaving(true);
    try {
      await apiPatch<TelesaleWorkOrder, { orderCode: string; result: string }>(
        API_ENDPOINTS.telesaleAssignment.callResult,
        { orderCode: currentOrder.orderCode, result },
      );
      setNotice(`Đã lưu kết quả “${result}” cho đơn ${currentOrder.orderCode}.`);
      setRefresh((value) => value + 1);
    } catch (error) {
      setErrorMessage(getRequestError(error));
    } finally {
      setIsSaving(false);
    }
  };

  const toggleReceiving = async () => {
    const agent = employeeOptions.find(
      ({ employeeName: name }) => name === selectedEmployeeName,
    );
    if (!agent) return;
    setErrorMessage("");
    setIsSaving(true);
    try {
      const status = agent.status === "Đang làm" ? "Nghỉ" : "Đang làm";
      await apiPatch<TelesaleAssignmentAgent, { employeeId: string; status: string }>(
        API_ENDPOINTS.telesaleAssignment.receiving,
        { employeeId: agent.employeeId, status },
      );
      setEmployeeName(agent.employeeName);
      setNotice(
        status === "Nghỉ"
          ? "Đã tạm dừng nhận cuộc gọi mới."
          : "Đã bật nhận cuộc gọi mới.",
      );
      setRefresh((value) => value + 1);
    } catch (error) {
      setErrorMessage(getRequestError(error));
    } finally {
      setIsSaving(false);
    }
  };

  const agent = employeeOptions.find(
    ({ employeeName: name }) => name === selectedEmployeeName,
  );
  const workProgress = workSummary && workSummary.targetCalls > 0
    ? Math.min(
        Math.round((workSummary.completedCalls / workSummary.targetCalls) * 100),
        100,
      )
    : null;

  return (
    <section className="flex min-w-0 flex-col gap-4">
      {agentsLoading && <p role="status">Đang tải nhân viên...</p>}
      {agentsError && <p role="alert">Không tải được nhân viên: {agentsError}</p>}
      {workSummaryError && <p role="alert" className="text-red-700">Không tải được thống kê công việc: {workSummaryError}</p>}
      {errorMessage && <p role="alert" className="text-red-700">{errorMessage}</p>}
      {notice && <p role="status" className="text-green-700">{notice}</p>}

      <div className="grid gap-2 lg:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Tổng cuộc gọi", workSummary?.totalCalls],
            ["Thành công", workSummary?.successfulCalls],
            ["Thất bại", workSummary?.failedCalls],
            ["Tốc độ gọi trung bình", workSummary?.averageCallSpeed],
          ].map(([title, value]) => (
            <Card
              key={title}
              title={String(title)}
              description={
                workSummaryLoading && value === undefined
                  ? "..."
                  : String(value ?? "—")
              }
            />
          ))}
        </div>
        <p className="self-center rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
          Ngày: {workSummary?.date ?? "—"}
        </p>
      </div>

      {agent && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="min-w-52 flex-1">
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Tiến độ ca: {workSummary?.completedCalls ?? "—"}/{workSummary?.targetCalls ?? "—"} cuộc gọi ·{" "}
              {workProgress ?? "—"}%
            </p>
            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <span
                className="block h-full rounded-full bg-red-700"
                style={{
                  width: `${workProgress ?? 0}%`,
                }}
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={() => void toggleReceiving()}
          >
            {agent.status === "Đang làm" ? "Tạm dừng nhận cuộc gọi mới" : "Bật nhận cuộc gọi mới"}
          </Button>
        </section>
      )}

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.75fr)]">
        <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">Danh sách đơn được phân công</h2>
          <div className="p-2">
            <SearchInput
              aria-label="Tìm kiếm đơn được phân công"
              placeholder="Tìm kiếm mã đơn, SĐT, khách hàng..."
              value={workSearch}
              onChange={(event) => setWorkSearch(event.target.value)}
              className="h-8 text-xs"
            />
          </div>
          {workOrdersLoading ? (
            <p role="status" className="p-4">Đang tải danh sách đơn...</p>
          ) : workOrdersError ? (
            <p role="alert" className="p-4 text-red-700">Không tải được đơn: {workOrdersError}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-xs">
                <thead className="bg-gray-100 text-gray-800"><tr>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">Mã đơn</th>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">Tên khách hàng</th>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">SĐT</th>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">Waybill</th>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">Mốc giao dự kiến</th>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">Thời lượng</th>
                  <th className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-semibold">Kết quả</th>
                </tr></thead>
                <tbody>
                  {visibleWorkOrders.map((order) => (
                    <tr
                      key={order.orderCode}
                      onClick={() => setSelectedOrderCode(order.orderCode)}
                      className={`text-gray-700 hover:bg-gray-50 ${
                        currentOrder?.orderCode === order.orderCode ? "bg-red-50" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3">{order.orderCode}</td>
                      <td className="border-b border-gray-200 px-3 py-3">{order.customerName}</td>
                      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3">{order.phoneNumber}</td>
                      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3">{order.waybill.slice(0, 10)}...</td>
                      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3">{order.expectedDelivery}</td>
                      <td className="whitespace-nowrap border-b border-gray-200 px-3 py-3">{order.duration}</td>
                      <td className="border-b border-gray-200 px-3 py-3">
                        <span className={`inline-block min-w-20 rounded-full px-2 py-1 text-center text-xs font-medium ${order.result === "Thành công" ? "bg-green-50 text-green-700" : order.result === "Thất bại" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-700"}`}>
                          {order.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {visibleWorkOrders.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Không có đơn được phân công</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          {currentOrder ? (
            <>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold">Chi tiết đơn hàng</h2>
                  <p className="mt-1 text-xs font-bold text-red-700">{currentOrder.orderCode}</p>
                </div>
                <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  {currentOrder.result}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex min-h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700">Bắt đầu gọi: {workSummary?.currentCallStartedAt ?? "—"}</span>
                <span className="inline-flex min-h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700">Đang gọi: {workSummary ? `${Math.floor(workSummary.currentCallDurationSeconds / 60)}:${String(workSummary.currentCallDurationSeconds % 60).padStart(2, "0")}` : "—"}</span>
              </div>
              <dl className="mt-3 grid grid-cols-[110px_1fr] gap-y-2 rounded-md border border-gray-200 p-3 text-xs">
                <dt className="text-gray-500">Waybill</dt><dd>{currentOrder.waybill}</dd>
                <dt className="text-gray-500">Mốc giao dự kiến</dt><dd>{currentOrder.expectedDelivery}</dd>
                <dt className="text-gray-500">Người phụ trách</dt><dd>{selectedEmployeeName}</dd>
              </dl>
              <section className="mt-3 rounded-md border border-gray-200 p-3">
                <h3 className="text-sm font-semibold text-gray-900">Thông tin khách hàng</h3>
                <p className="mt-2 text-sm text-gray-800">{currentOrder.customerName}</p>
                <p className="mt-2 text-sm text-gray-700">{currentOrder.phoneNumber}</p>
                <p className="mt-2 text-xs text-gray-500">{currentOrder.address}</p>
              </section>
              <section className="mt-3 rounded-md border border-gray-200 p-3">
                <h3 className="text-sm font-semibold text-gray-900">Trạng thái vận chuyển</h3>
                <ol className="mt-2 space-y-2">
                  {currentOrder.shippingEvents.map((event) => (
                    <li key={`${event.time}-${event.status}`} className="grid grid-cols-[12px_90px_1fr] gap-1 text-xs text-gray-700">
                      <span className="text-green-700">•</span><span>{event.time}</span><span>{event.status}</span>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="mt-3 rounded-md border border-gray-200 p-3">
                <h3 className="text-sm font-semibold text-gray-900">Cập nhật nhanh</h3>
                <div className="mt-2 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    disabled={isSaving || currentOrder.result !== "Đang gọi"}
                    onClick={() => void updateResult("Thành công")}
                  ><Check aria-hidden="true" size={14} /> Thành công</Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                    disabled={isSaving || currentOrder.result !== "Đang gọi"}
                    onClick={() => void updateResult("Thất bại")}
                  ><Phone aria-hidden="true" size={14} /> Thất bại</Button>
                </div>
              </section>
            </>
          ) : (
            <p className="p-5 text-sm text-gray-500">Chưa có đơn được phân công.</p>
          )}
        </aside>
      </section>
    </section>
  );
};

const AssignmentPage = ({ view = "dispatch" }: { view?: AssignmentView }) => {
  return (
    view === "dispatch" ? <DispatchView /> : <WorkView />
  );
};

export default AssignmentPage;
