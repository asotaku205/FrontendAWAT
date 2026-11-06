import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";
import { API_ENDPOINTS, apiPost } from "../../../services/api";
import type {
  ExceptionOrder,
  ReassignExceptionRequest,
} from "../../../services/types";

const ReAssignModal = ({
  order,
  onClose,
  onConfirmed,
}: {
  order: ExceptionOrder;
  onClose: () => void;
  onConfirmed: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmReassignment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await apiPost<{ code: string; reassignedOrders: number }, ReassignExceptionRequest>(
        API_ENDPOINTS.orderDistribution.reassignException,
        { code: order.code },
      );
      onConfirmed();
    } catch (requestError: unknown) {
      const responseMessage = axios.isAxiosError<{ message?: string }>(
        requestError,
      )
        ? requestError.response?.data?.message
        : undefined;
      setError(
        responseMessage ??
          (requestError instanceof Error
            ? requestError.message
            : "Không thể duyệt phân công lại."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={`Phân công lại đơn ${order.code.split(" - ")[0]}`}
      description={`SKU: ${order.code.split(" - ")[1]} × ${order.quantity} - ${order.reason}`}
      open
      onClose={onClose}
    >
      <div className="mb-4 border bg-gray-100 p-3 text-xs">
        <strong>QUY TẮC PHÂN BỔ ĐƠN LẺ / CHẴN ĐÃ CHỐT:</strong>
        <p className="p-1">- Còn lại {order.ordersToReassign} đơn của nhân viên nghỉ.</p>
        <p className="p-1">- Ưu tiên đơn cho nhân viên có hiệu suất cao nhất ca.</p>
        <p className="p-1">- Đơn còn lại phân bổ cho nhân viên kế tiếp.</p>
      </div>
      <p className="mb-3 text-xs font-semibold">BẢNG PHÂN BỔ DỰ KIẾN:</p>
      {order.assignments.map(({ employeeName, employeeId, orderCount }) => (
        <div
          key={employeeId}
          className="mb-2 border border-border bg-white p-2 text-xs"
        >
          {employeeName} ({employeeId}) - Nhận thêm:{" "}
          <span className="text-green-700">+{orderCount} đơn</span>
        </div>
      ))}
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="outline" disabled={isSubmitting} onClick={onClose}>
          Hủy
        </Button>
        <Button type="button" disabled={isSubmitting} onClick={confirmReassignment}>
          {isSubmitting ? "Đang phân công..." : "Duyệt phân công"}
        </Button>
      </div>
    </Modal>
  );
};

export default ReAssignModal;
