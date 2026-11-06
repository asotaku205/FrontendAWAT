import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import type { TableColumn } from "../../components/ui/Table";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import usePagination from "../../hooks/usePagination";
import type { BusinessForecastData } from "../../services/types";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";

type TabWarningProps = {
  data: BusinessForecastData["warning"];
  onNavigateTab: (tab: string) => void;
};

const TabWarning = ({ data, onNavigateTab }: TabWarningProps) => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(data.alertData[0]?.issue ?? "");
  const [levelFilter, setLevelFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ownerUpdates, setOwnerUpdates] = useState<Record<string, string>>({});
  const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>({});
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isConfirmDoneOpen, setIsConfirmDoneOpen] = useState(false);
  const [newOwner, setNewOwner] = useState("");

  const alerts = data.alertData.map((alert) => ({
    ...alert,
    owner: ownerUpdates[alert.issue] ?? alert.owner,
    status: statusUpdates[alert.issue] ?? "Mới",
  }));

  const filteredAlerts = alerts.filter((alert) => {
    return (
      (levelFilter === "all" || alert.level === levelFilter) &&
      (groupFilter === "all" || alert.group === groupFilter) &&
      (ownerFilter === "all" || alert.owner === ownerFilter) &&
      (statusFilter === "all" || alert.status === statusFilter)
    );
  });

  const selectedAlert =
    filteredAlerts.find((alert) => alert.issue === selectedIssue) ??
    filteredAlerts[0] ??
    null;

  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({ data: filteredAlerts, pageSize: 4 });

  const alertColumns: TableColumn<(typeof alerts)[number]>[] = [
    { key: "level", title: "Mức" },
    { key: "group", title: "Nhóm" },
    { key: "issue", title: "Vấn đề" },
    { key: "impact", title: "Ảnh hưởng" },
    { key: "deadline", title: "Hạn xử lý" },
    { key: "owner", title: "Phụ trách" },
    { key: "status", title: "Trạng thái" },
    {
      key: "action",
      title: "Chi tiết",
      render: (alert) => (
        <Button
          size="xs"
          variant="outline"
          onClick={() => setSelectedIssue(alert.issue)}
        >
          {selectedAlert?.issue === alert.issue ? "Đang xem" : "Xem"}
        </Button>
      ),
    },
  ];

  const openAssignment = () => {
    if (!selectedAlert) return;
    setNewOwner(selectedAlert.owner);
    setIsAssignModalOpen(true);
  };

  const confirmAssignment = () => {
    if (!selectedAlert || !newOwner) return;
    setOwnerUpdates((current) => ({
      ...current,
      [selectedAlert.issue]: newOwner,
    }));
    setStatusUpdates((current) => ({
      ...current,
      [selectedAlert.issue]: "Đang xử lý",
    }));
    setIsAssignModalOpen(false);
  };

  const markAsDone = () => {
    if (!selectedAlert) return;
    setStatusUpdates((current) => ({
      ...current,
      [selectedAlert.issue]: "Đã xử lý",
    }));
    setIsConfirmDoneOpen(false);
  };

  const openRelatedPage = () => {
    if (!selectedAlert) return;
    if (selectedAlert.group === "Tồn kho" || selectedAlert.group === "Nguồn cung") {
      onNavigateTab("stock");
    } else if (selectedAlert.group === "Marketing") {
      onNavigateTab("channel");
    } else if (selectedAlert.group === "Khách hàng") {
      onNavigateTab("customer");
    } else if (selectedAlert.group === "Đơn hàng") {
      navigate("/order-distribution");
    }
  };

  const getSuggestion = () => {
    if (!selectedAlert) return "";
    if (selectedAlert.group === "Tồn kho") return data.alertDetail.suggestion;
    if (selectedAlert.group === "Nguồn cung") return "Mở tab Tồn kho để theo dõi nguồn cung và hàng đang về.";
    if (selectedAlert.group === "Marketing") return "Mở tab Kênh bán để xem hiệu quả và đề xuất tối ưu.";
    if (selectedAlert.group === "Khách hàng") return "Mở tab Khách hàng để cập nhật trạng thái; khách rủi ro có thể được đẩy sang Telesale ưu tiên.";
    return "Mở trang phân phối đơn để rà soát các đơn có nguy cơ trễ.";
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="grid grid-cols-5 gap-3">
          {data.kpis.map((kpi) => (
            <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} sub={kpi.sub} />
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          KPI là số tổng hợp; bảng bên dưới đang dùng một phần dữ liệu mẫu.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={levelFilter}
          onChange={(event) => {
            setLevelFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Mức độ: Tất cả</option>
          {[...new Set(alerts.map((alert) => alert.level))].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <select
          value={groupFilter}
          onChange={(event) => {
            setGroupFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Nhóm: Tất cả</option>
          {[...new Set(alerts.map((alert) => alert.group))].map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
        <select
          value={ownerFilter}
          onChange={(event) => {
            setOwnerFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Phụ trách: Tất cả</option>
          {[...new Set(alerts.map((alert) => alert.owner))].map((owner) => (
            <option key={owner} value={owner}>{owner}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">Trạng thái: Tất cả</option>
          <option value="Mới">Mới</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã xử lý">Đã xử lý</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Danh sách cảnh báo" className="col-span-2">
          <Table
            columns={alertColumns}
            records={currentData}
            rowKey="issue"
            emptyMessage="Không có cảnh báo phù hợp bộ lọc."
            pagination={{
              page: currentPage,
              pageSize: 4,
              totalPages,
              totalRecords: filteredAlerts.length,
              onPageChange: setCurrentPage,
            }}
          />
        </Panel>

        <Panel title="Chi tiết cảnh báo">
          {selectedAlert ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                  {selectedAlert.level}
                </span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                  {selectedAlert.status}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{selectedAlert.issue}</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Nhóm</dt><dd>{selectedAlert.group}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Ảnh hưởng</dt><dd className="text-right">{selectedAlert.impact}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Hạn xử lý</dt><dd>{selectedAlert.deadline}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Phụ trách</dt><dd>{selectedAlert.owner}</dd></div>
              </dl>
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Nơi xử lý / đề xuất</div>
                <div className="mt-1 text-sm text-gray-800">{getSuggestion()}</div>
              </div>
              <div className="space-y-2 pt-1">
                <Button className="w-full" variant="outline" onClick={openAssignment}>
                  Giao xử lý
                </Button>
                <Button className="w-full" onClick={openRelatedPage}>
                  Mở nơi xử lý
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={selectedAlert.status === "Đã xử lý"}
                  onClick={() => setIsConfirmDoneOpen(true)}
                >
                  Đánh dấu đã xử lý
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Không có cảnh báo để hiển thị.</p>
          )}
        </Panel>
      </div>

      <Modal
        title="Giao phụ trách cảnh báo"
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      >
        {selectedAlert && (
          <div>
            <p className="mb-3 text-sm text-gray-700">{selectedAlert.issue}</p>
            <label className="block text-sm text-gray-700">
              Người phụ trách
              <select
                value={newOwner}
                onChange={(event) => setNewOwner(event.target.value)}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2"
              >
                {[...new Set(alerts.map((alert) => alert.owner))].map((owner) => (
                  <option key={owner} value={owner}>{owner}</option>
                ))}
              </select>
            </label>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>Quay lại</Button>
              <Button onClick={confirmAssignment}>Xác nhận giao</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Xác nhận hoàn tất cảnh báo"
        open={isConfirmDoneOpen}
        onClose={() => setIsConfirmDoneOpen(false)}
      >
        <p className="text-sm text-gray-700">
          Xác nhận đánh dấu <strong>{selectedAlert?.issue}</strong> là đã xử lý?
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsConfirmDoneOpen(false)}>Quay lại</Button>
          <Button onClick={markAsDone}>Xác nhận</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TabWarning;
