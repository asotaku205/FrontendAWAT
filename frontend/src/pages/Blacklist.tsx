import { useState } from "react";
import {
  initialOrders,
  statusBadgeClass,
  needsDecision,
  type OrderStatus,
  type CheckOrder,
} from "../mock/BlacklistData";
import usePagination from "../hooks/usePagination";
import OrderDetailModal from "./Blacklist/OrderDetailModal";
import type { TableColumn } from "../components/ui/Table";
import Panel from "./business-forecast/components/Panel";
import Table from "../components/ui/Table";
import { Button } from "../components/ui/button";

const STATUS_FILTERS: ("all" | OrderStatus)[] = [
  "all",
  "Chờ kiểm tra",
  "Đã kiểm tra",
  "Hoàn nhiều lần",
  "Blacklist",
  "Đã hủy",
];

const BlacklistCheck = () => {
  const [rows, setRows] = useState<CheckOrder[]>(initialOrders);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [query, setQuery] = useState("");
  const blacklistColumns: TableColumn<CheckOrder>[] = [
    { key: "id", title: "Mã đơn" },
    { key: "orderDate", title: "Ngày đặt hàng" },
    { key: "customer", title: "Tên khách hàng" },
    {
      key: "phone",
      title: "Số điện thoại",
    },
    {
      key: "product",
      title: "Tên sản phẩm",
      render: (o) => (
        <div>
          <div>{o.product}</div>
          <div className="text-xs text-gray-400">{o.refundRateNote}</div>
        </div>
      ),
    },

    {
      key: "refundRate1m",
      title: "Tỉ lệ hoàn 1 tháng",
      render: (o) => (
        <span
          className={
            o.refundRate1m > 60 ? "font-medium text-red-600" : "text-green-600"
          }
        >
          {o.refundRate1m}%
        </span>
      ),
    },
    {
      key: "refundRate3m",
      title: "Tỉ lệ hoàn 3 tháng",
      render: (o) => (
        <span
          className={
            o.refundRate3m > 60 ? "font-medium text-red-600" : "text-green-600"
          }
        >
          {o.refundRate3m}%
        </span>
      ),
    },
    {
      key: "qty",
      title: "Số lượng",
    },
    {
      key: "amount",
      title: "Giá trị đơn hàng",
    },
    {
      key: "source",
      title: "Nguồn đơn",
    },
    {
      key: "adsStaff",
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
      key: "id",
      id: "action", //tránh trùng React key với cột Mã đơn
      title: "",
      render: (o) => (
        <Button variant="link" size="sm" onClick={() => setDetailId(o.id)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  const filtered = rows.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (sourceFilter !== "all" && r.source !== sourceFilter) return false;
    if (
      query &&
      !r.id.toLowerCase().includes(query.toLowerCase()) &&
      !r.phone.includes(query)
    )
      return false;
    return true;
  });

  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: filtered,
      pageSize: 8,
    });

  const countBy = (s: OrderStatus) => rows.filter((r) => r.status === s).length;
  const kpis = [
    { label: "Tất cả trạng thái", value: rows.length },
    { label: "Chờ kiểm tra", value: countBy("Chờ kiểm tra") },
    { label: "Đã kiểm tra", value: countBy("Đã kiểm tra") },
    { label: "Hoàn nhiều lần", value: countBy("Hoàn nhiều lần") },
    { label: "Blacklist", value: countBy("Blacklist") },
    { label: "Đã hủy", value: countBy("Đã hủy") },
  ];

  const toggleSelection = (id: string) => {
  setSelectedIds((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  );
};
 const toggleAll = () =>
    setSelectedIds((selected) =>
      selected.length === filtered.length
        ? []
        : filtered.map(({ id }) => id),
    );

  const detailOrder = rows.find((r) => r.id === detailId) ?? null;

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
        <Button>Check Hoàn nhiều lần</Button>
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
            setStatusFilter(e.target.value as "all" | OrderStatus)
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

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
          <span className="text-sm text-gray-700">
            Đã chọn <span className="font-bold">{selectedIds.length}</span> đơn
          </span>
          <Button onClick={() => setSelectedIds([])}>Duyệt đi đơn</Button>
          <Button onClick={() => setSelectedIds([])} variant={"outline"}>
            Huỷ đơn
          </Button>
          <span className="text-xs text-gray-400">
            (chỉ áp dụng cho đơn Blacklist / Hoàn nhiều lần)
          </span>
        </div>
      )}

      <Panel title=" Danh sách tất cả đơn check HNL &amp; Blacklist">
        <Table
          columns={blacklistColumns}
          records={currentData}
          rowKey="id"
          selection={{
            header: (
              <input
                type="checkbox"
                checked={
                  currentData.length > 0 &&
                  currentData.every((r) => selectedIds.includes(r.id))
                }
                onChange={toggleAll}
              />
            ),
            render: (o) => (
              <input
                type="checkbox"
                checked={selectedIds.includes(o.id)}
                onChange={() => toggleSelection(o.id)}
              />
            ),
          }}
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
      />
    </div>
  );
};

export default BlacklistCheck;
