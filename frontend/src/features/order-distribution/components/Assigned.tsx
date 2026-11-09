import Table from "../../../components/Table";
import useApiData from "../../../hooks/use-api-data";
import usePagination from "../../../hooks/use-pagination";
import { API_ENDPOINTS } from "../../../services/api";
import type { DistributionOrder } from "../../../services/types";
import { orderColumns } from "./orderColumns";

const Assigned = ({ refreshKey }: { refreshKey: number }) => {
  const { data, error, isLoading } = useApiData<DistributionOrder[]>(
    `${API_ENDPOINTS.orderDistribution.assigned}?refresh=${refreshKey}`,
  );
  const orders = data ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: orders,
    pageSize: 5,
  });

  if (isLoading) return <p role="status">Đang tải danh sách đơn đã chia...</p>;
  if (error) return <p role="alert">Không tải được danh sách đơn đã chia: {error}</p>;

  return (
    <Table
      columns={orderColumns}
      records={currentData}
      rowKey="orderCode"
      pagination={{
        page: currentPage,
        pageSize: 5,
        totalPages,
        totalRecords: orders.length,
        onPageChange: setCurrentPage,
      }}
    />
  );
};

export default Assigned;
