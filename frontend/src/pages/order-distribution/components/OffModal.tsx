import axios from "axios";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";
import { API_ENDPOINTS, apiPost } from "../../../services/api";
import type {
  ReportEmployeeAbsenceRequest,
  WorkerProgress,
} from "../../../services/types";

const OffModal = ({
  employeeName,
  onClose,
  onConfirmed,
}: {
  employeeName: string;
  onClose: () => void;
  onConfirmed: () => void;
}) => {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmAbsence = async () => {
    if (isSubmitting || !reason.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await apiPost<WorkerProgress, ReportEmployeeAbsenceRequest>(
        API_ENDPOINTS.orderDistribution.reportAbsence,
        { employeeName, reason },
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
            : "Không thể cập nhật trạng thái nhân viên."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={`Báo nghỉ - Nhân viên: ${employeeName}`}
      open
      onClose={onClose}
    >
      <label className="mb-3 flex flex-col gap-1.5 text-xs">
        <span>
          Lý do nghỉ<span className="ml-1 text-red-800">*</span>
        </span>
        <textarea
          name="reason"
          required
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="rounded-md border border-border bg-gray-100 p-3"
        />
      </label>
      <p className="text-xs">
        Các đơn còn lại sẽ được đưa về hàng chờ phân công lại. Nhân viên sẽ
        không nhận block mới.
      </p>
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="outline" disabled={isSubmitting} onClick={onClose}>
          Hủy
        </Button>
        <Button
          type="button"
          disabled={!reason.trim() || isSubmitting}
          onClick={confirmAbsence}
        >
          {isSubmitting ? "Đang cập nhật..." : "Xác nhận báo nghỉ"}
        </Button>
      </div>
    </Modal>
  );
};

export default OffModal;
