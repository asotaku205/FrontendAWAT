import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/Button";
import Modal from "../../../components/Modal";
import { API_ENDPOINTS, apiPost } from "../../../services/api";
import type { ConfirmPrintOrderRequest, PrintRequest } from "../../../services/types";

const PrintOrderModal = ({
  setPrintOrderModalOpen,
  printRequest,
  onConfirmed,
}: {
  setPrintOrderModalOpen: (isOpen: boolean) => void;
  printRequest: PrintRequest;
  onConfirmed: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmPrint = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await apiPost<ConfirmPrintOrderRequest, ConfirmPrintOrderRequest>(
        API_ENDPOINTS.orderDistribution.confirmPrint,
        printRequest,
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
            : "Không thể xác nhận in block."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Xác nhận in thêm đợt mới"
      open
      onClose={() => setPrintOrderModalOpen(false)}
    >
      <p className="mb-3 text-sm">
        In thêm block {printRequest.nextBlockCount} phiếu cho 1 nhân viên đủ điều kiện.
      </p>
      <div className="border-b border-gray-200 py-2 text-sm">
        {printRequest.employeeName} ({printRequest.employeeId}):{" "}
        <span className="font-bold text-green-700">
          +{printRequest.nextBlockCount} phiếu
        </span>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => setPrintOrderModalOpen(false)}
        >
          Hủy
        </Button>
        <Button type="button" disabled={isSubmitting} onClick={confirmPrint}>
          {isSubmitting ? "Đang in..." : "Xác nhận"}
        </Button>
      </div>
    </Modal>
  );
};

export default PrintOrderModal;
