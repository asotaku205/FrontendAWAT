import type { TableColumn } from "../../../components/Table";
import type { DistributionOrder } from "../../../services/types";

export const orderColumns: TableColumn<DistributionOrder>[] = [
  { key: "orderCode", title: "Mã đơn" },
  { key: "sku", title: "SKU" },
  { key: "location", title: "Vị trí kho" },
  { key: "employees", title: "Nhân viên" },
  { key: "status", title: "Trạng thái" },
  {
    key: "block",
    title: "Block",
    render: ({ block }) => block ?? "—",
  },
];
