import Table, { type TableColumn } from "../components/ui/Table";
import useApiData from "../hooks/useApiData";
import usePagination from "../hooks/usePagination";
import { API_ENDPOINTS } from "../services/api";
import type { TelesaleRecord } from "../services/types";

const pageSize = 5;

const columns: TableColumn<TelesaleRecord>[] = [
  { key: "orderCode", title: "Mã đơn" },
  { key: "customerName", title: "Khách hàng" },
  { key: "phoneNumber", title: "Số điện thoại" },
  { key: "product", title: "Sản phẩm" },
  { key: "problem", title: "Nội dung cần gọi" },
  { key: "address", title: "Địa chỉ" },
  { key: "dateCreated", title: "Ngày tạo" },
  { key: "status", title: "Trạng thái" },
  { key: "staffName", title: "Nhân viên" },
];

const Telesale = () => {
  const { data, error, isLoading } = useApiData<TelesaleRecord[]>(
    API_ENDPOINTS.telesaleRecords,
  );
  const records = data ?? [];
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination({
    data: records,
    pageSize,
  });

  if (isLoading) return <p role="status">Đang tải danh sách telesale...</p>;
  if (error) return <p role="alert">Không tải được danh sách telesale: {error}</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-bold">Phân phối telesale</h1>
      <Table
        columns={columns}
        records={currentData}
        pagination={{
          page: currentPage,
          pageSize,
          totalPages,
          totalRecords: records.length,
          onPageChange: setCurrentPage,
        }}
      />
    </section>
  );
};

export default Telesale;
