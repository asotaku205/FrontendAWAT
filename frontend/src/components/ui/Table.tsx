import type { ReactNode } from "react";
import Pagination from "./Pagination";

export type TableColumn<T> = {
  key: keyof T;
  id?: string;
  title: ReactNode;
  className?: string;
  render?: (record: T) => ReactNode;
};

type TableSelection<T> = {
  header: ReactNode;
  render: (record: T) => ReactNode;
  className?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  title?: string;
  records: T[];
  rowKey?: keyof T;
  emptyMessage?: string;
  className?: string;
  tableClassName?: string;
  selection?: TableSelection<T>;
  toolbar?: ReactNode;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    onPageChange: (page: number) => void;
  };
};

const Table = <T extends object>({
  columns,
  title,
  records,
  rowKey,
  emptyMessage = "Không có bản ghi",
  className = "",
  tableClassName = "",
  selection,
  toolbar,
  pagination,
}: TableProps<T>) => (
  <section className={`overflow-hidden rounded-lg border border-gray-200 bg-white ${className}`}>
    {title && (
      <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
        {title}
      </h2>
    )}
    {toolbar}
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse text-left text-xs ${tableClassName}`}>
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            {selection && (
              <th
                scope="col"
                className={`border-b border-r border-gray-200 px-3 py-3 ${selection.className ?? ""}`}
              >
                {selection.header}
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id ?? String(column.key)}
                scope="col"
                className={`whitespace-nowrap border-b border-r border-gray-200 px-3 py-3 font-semibold ${column.className ?? ""}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.length ? (
            records.map((record, index) => (
              <tr
                key={rowKey ? String(record[rowKey]) : index}
                className="text-gray-700 hover:bg-gray-50"
              >
                {selection && (
                  <td
                    className={`items-center border-b border-r border-gray-200 px-3 py-3 ${selection.className ?? ""}`}
                  >
                    {selection.render(record)}
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.id ?? String(column.key)}
                    className={`items-center border-b border-r border-gray-200 px-3 py-3 ${column.className ?? ""}`}
                  >
                    {column.render
                      ? column.render(record)
                      : String(record[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-8 text-center text-gray-500"
                colSpan={Math.max(columns.length + (selection ? 1 : 0), 1)}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    {pagination && (
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
        <span className="text-xs text-gray-400">
          Hiển thị{" "}
          <span className="font-medium text-gray-600">
            {records.length
              ? (pagination.page - 1) * pagination.pageSize + 1
              : 0}
            -
            {Math.min(
              pagination.page * pagination.pageSize,
              pagination.totalRecords,
            )}
          </span>{" "}
          / <span className="font-medium text-gray-600">{pagination.totalRecords}</span>{" "}
          bản ghi
        </span>
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      </div>
    )}
  </section>
);

export default Table;
