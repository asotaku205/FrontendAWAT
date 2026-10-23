import Table, { type TableColumn } from "../components/ui/Table";
import useBusinessForecast from "../hooks/useBusinessForecast";
import usePagination from "../hooks/usePagination";
import type { ForecastProduct } from "../services/types";

const pageSize = 5;

const columns: TableColumn<ForecastProduct>[] = [
  { key: "product", title: "Sản phẩm", className: "min-w-64" },
  { key: "orderCode", title: "Mã đơn" },
  {
    key: "ecommerce",
    title: "Kênh bán",
    render: ({ ecommerce }) => ecommerce.join(", "),
  },
  { key: "stock", title: "Tồn kho" },
  { key: "processing", title: "Đang xử lý" },
  { key: "fillRate", title: "Tỷ lệ đáp ứng", render: ({ fillRate }) => `${fillRate}%` },
  { key: "aiRecommend", title: "AI đề xuất" },
  { key: "status", title: "Trạng thái" },
  { key: "reason", title: "Lý do", className: "min-w-64" },
];

const BusinessForecast = () => {
  const { data, error, isLoading } = useBusinessForecast();
  const records = data ?? [];
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination({
    data: records,
    pageSize,
  });

  if (isLoading) return <p role="status">Đang tải dự báo kinh doanh...</p>;
  if (error) return <p role="alert">Không tải được dự báo kinh doanh: {error}</p>;

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-bold">Dự đoán kinh doanh</h1>
      <Table
        columns={columns}
        records={currentData}
        tableClassName="min-w-max"
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

export default BusinessForecast;
