import type { ReactNode } from "react";
import CheckBox from "../../../components/ui/checkbox";
import Table from "../../../components/ui/Table";
import type { AddressParseOptions } from "../../../services/types";
import { createAddressTableColumns, type AddressRow } from "./AddressTableColumns";

type AddressTableProps = {
  records: AddressRow[];
  selectedIds: string[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onToggleAll: () => void;
  onToggleRow: (orderCode: string) => void;
  mode: "pending" | "parsed";
  addressOptions: AddressParseOptions;
  onOpenDetails?: (orderCode: string) => void;
  toolbar?: ReactNode;
};

const AddressTable = ({
  records,
  selectedIds,
  totalRecords,
  currentPage,
  totalPages,
  onPageChange,
  onToggleAll,
  onToggleRow,
  mode,
  addressOptions,
  onOpenDetails,
  toolbar,
}: AddressTableProps) => (
  <Table
    columns={createAddressTableColumns(mode, addressOptions, onOpenDetails)}
    records={records}
    rowKey="orderCode"
    tableClassName="min-w-max"
    toolbar={toolbar}
    selection={{
      header: (
        <CheckBox
          checked={totalRecords > 0 && selectedIds.length === totalRecords}
          onChange={onToggleAll}
        />
      ),
      render: (record) => (
        <CheckBox
          checked={selectedIds.includes(record.orderCode)}
          onChange={() => onToggleRow(record.orderCode)}
        />
      ),
    }}
    pagination={{
      page: currentPage,
      pageSize: 5,
      totalPages,
      totalRecords,
      onPageChange,
    }}
  />
);

export default AddressTable;
