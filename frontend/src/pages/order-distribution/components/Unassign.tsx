import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import Table from "../../../components/ui/Table";
import useApiData from "../../../hooks/useApiData";
import usePagination from "../../../hooks/usePagination";
import { API_ENDPOINTS, apiPost } from "../../../services/api";
import type {
  AutoAssignOrdersResponse,
  DistributionOrder,
} from "../../../services/types";
import { orderColumns } from "./orderColumns";

const Unassign = ({
  refreshKey,
  onAssigned,
}: {
  refreshKey: number;
  onAssigned: () => void;
}) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);
  const { data, error, isLoading } = useApiData<DistributionOrder[]>(
    `${API_ENDPOINTS.orderDistribution.unassigned}?refresh=${refreshKey}`,
  );
  const orders = data ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: orders,
    pageSize: 5,
  });

  const autoAssign = async () => {
    if (isAssigning || orders.length === 0) return;
    setAssignError(null);
    setIsAssigning(true);
    try {
      await apiPost<AutoAssignOrdersResponse, Record<string, never>>(
        API_ENDPOINTS.orderDistribution.autoAssign,
        {},
      );
      onAssigned();
    } catch (requestError: unknown) {
      const responseMessage = axios.isAxiosError<{ message?: string }>(
        requestError,
      )
        ? requestError.response?.data?.message
        : undefined;
      setAssignError(
        responseMessage ??
          (requestError instanceof Error
            ? requestError.message
            : "Không thể phân công đơn hàng."),
      );
    } finally {
      setIsAssigning(false);
    }
  };

  if (isLoading) return <p role="status">Đang tải danh sách đơn chưa chia...</p>;
  if (error) return <p role="alert">Không tải được danh sách đơn chưa chia: {error}</p>;

  return (
    <>
      <Button
        className="mb-2"
        disabled={isAssigning || orders.length === 0}
        onClick={autoAssign}
      >
        {isAssigning ? "Đang phân công..." : "Phân công tự động"}
      </Button>
      {assignError && <p role="alert" className="mb-2 text-sm text-red-600">{assignError}</p>}
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
