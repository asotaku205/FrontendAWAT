import { Dot } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { TableColumn } from "../../../components/ui/Table";
import type {
  AddressParseDataType,
  AddressParseOptions,
  PendingAddressDataType,
} from "../../../services/types";
import AddressCombobox from "./AddressCombobox";

export type AddressRow = Omit<PendingAddressDataType, "status"> &
  Partial<
    Pick<
      AddressParseDataType,
      "city" | "district" | "region" | "detailedAddress" | "reliability"
    >
  > & { status: string };

export const createAddressTableColumns = (
  mode: "pending" | "parsed",
  options: AddressParseOptions,
  onOpenDetails?: (orderCode: string) => void,
): TableColumn<AddressRow>[] => {
  const addressFields: {
    key: "city" | "district" | "region";
    label: string;
    items: string[];
  }[] = [
    { key: "city", label: "Tỉnh/TP", items: options.city },
    { key: "district", label: "Quận/Huyện", items: options.district },
    { key: "region", label: "Xã/Phường", items: options.region },
  ];

  return [
  {
    key: "orderCode",
    title: "Đơn/Khách",
    render: ({ orderCode, customerName }) => (
      <>
        <span>{orderCode}</span>
        <span className="block text-sm text-gray-500">{customerName}</span>
      </>
    ),
  },
  { key: "phoneNumber", title: "SĐT" },
  { key: "originalAddress", title: "Địa chỉ gốc", className: "w-40" },
  ...addressFields.map(({ key, label, items }) => ({
    key,
    title: renderAddressSelectHeader(label, items),
    className: "w-40",
    render: (record: AddressRow) => (
      <AddressCombobox
        items={items}
        placeholder={`Chọn ${label}`}
        value={mode === "parsed" ? record[key] : undefined}
      />
    ),
  })),
  {
    key: "detailedAddress",
    title: "Địa chỉ chi tiết",
    render: ({ detailedAddress }) => detailedAddress ?? "",
  },
  ...(mode === "parsed"
    ? [
        {
          key: "reliability" as keyof AddressRow,
          title: "Độ tin cậy",
          render: ({ reliability }: AddressRow) =>
            renderReliabilityIndicator(reliability ?? 0),
        },
      ]
    : []),
  { key: "status", title: "Trạng thái" },
  {
    key: "orderCode",
    id: "actions",
    title: "Hành động",
    render: (record) =>
      mode === "parsed" ? (
        <Button size="sm" onClick={() => onOpenDetails?.(record.orderCode)}>
          Chi tiết
        </Button>
      ) : (
        <Button size="sm">Tách</Button>
      ),
  },
  ];
};

const renderAddressSelectHeader = (label: string, items: readonly string[]) => (
  <div className="flex min-w-40 flex-col gap-1">
    <span>{label}</span>
    <AddressCombobox items={[...items]} placeholder={`Chọn ${label}`} />
  </div>
);

const renderReliabilityIndicator = (value: number) => {
  const color =
    value < 75 ? "#c10007" : value < 95 ? "#d08700" : "#00a63e";
  const textColor =
    value < 75 ? "text-red-700" : value < 95 ? "text-yellow-600" : "text-green-600";

  return (
    <span className={`flex items-center font-bold ${textColor}`}>
      <Dot size={28} color={color} strokeWidth={2.75} />
      {value}%
    </span>
  );
};
