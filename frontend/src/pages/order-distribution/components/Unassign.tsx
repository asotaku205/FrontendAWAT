import { Button } from "../../../components/ui/button";
import Table from "../../../components/ui/Table";
import useApiData from "../../../hooks/useApiData";
import usePagination from "../../../hooks/usePagination";
import { API_ENDPOINTS } from "../../../services/api";
import type { DistributionOrder } from "../../../services/types";
import { orderColumns } from "./orderColumns";

const Unassign = () => {
  const { data, error, isLoading } = useApiData<DistributionOrder[]>(
    API_ENDPOINTS.orderDistribution.unassigned,
  );
  const orders = data ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: orders,
    pageSize: 5,
  });

  if (isLoading) return <p role="status">Đang tải danh sách đơn chưa chia...</p>;
  if (error) return <p role="alert">Không tải được danh sách đơn chưa chia: {error}</p>;

  return (
    <>
      <Button className="mb-2" title="Phân công tự động" />
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
    </>
  );
};

export default Unassign;
