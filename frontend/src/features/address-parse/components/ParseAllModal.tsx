import { useState } from "react";
import { Button } from "../../../components/Button";
import DateInput from "../../../components/DateInput";
import Modal from "../../../components/Modal";
import type { PendingAddressDataType } from "../../../services/types";

const ParseAllModal = ({
  setIsParseAllModalOpen,
  onConfirm,
  isSubmitting,
  error,
  records,
}: {
  setIsParseAllModalOpen: (isOpen: boolean) => void;
  onConfirm: (orderCodes: string[]) => void;
  isSubmitting: boolean;
  error: string | null;
  records: PendingAddressDataType[];
}) => {
  const [mode, setMode] = useState<"all" | "date">("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleConfirm = () => {
    setValidationError(null);
    if (mode === "date" && (!fromDate || !toDate)) {
      setValidationError("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
      return;
    }
    if (mode === "date" && fromDate > toDate) {
      setValidationError("Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.");
      return;
    }
    const selectedRecords =
      mode === "all"
        ? records
        : records.filter(
            ({ dateCreated }) =>
              dateCreated >= fromDate && dateCreated <= toDate,
          );
    if (selectedRecords.length === 0) {
      setValidationError("Không có đơn nào trong khoảng ngày đã chọn.");
      return;
    }
    onConfirm(selectedRecords.map(({ orderCode }) => orderCode));
  };

  return (
    <Modal
      title="Tách địa chỉ hàng loạt"
      open
      onClose={() => setIsParseAllModalOpen(false)}
      contentClassName="p-0"
    >
      <label className="m-4 flex items-center gap-2 rounded-lg border border-gray-300 p-4">
        <input
          type="radio"
          name="parseMode"
          value="all"
          checked={mode === "all"}
          onChange={() => setMode("all")}
        />
        <span>Xác nhận tách tất cả đơn hiện có</span>
      </label>
      <div className="m-4 flex flex-col gap-2 rounded-lg border border-gray-300 p-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="parseMode"
            value="date"
            checked={mode === "date"}
            onChange={() => setMode("date")}
          />
          <span>Lọc theo ngày tạo đơn</span>
        </label>
        <div className="flex flex-wrap gap-3">
          <DateInput
            title="Từ ngày"
            value={fromDate}
            onChange={(event) => setFromDate(event.target.value)}
            disabled={mode !== "date"}
          />
          <DateInput
            title="Đến ngày"
            value={toDate}
            onChange={(event) => setToDate(event.target.value)}
            disabled={mode !== "date"}
          />
        </div>
      </div>
      {(validationError || error) && (
        <p role="alert" className="mx-4 text-sm text-red-600">
          {validationError ?? error}
        </p>
      )}
      <div className="flex items-center justify-end rounded-b-lg border-t border-gray-300 bg-gray-100">
        <Button
          variant="outline"
          className="m-4"
          disabled={isSubmitting}
          onClick={() => setIsParseAllModalOpen(false)}
        >
          Hủy
        </Button>
        <Button
          className="m-4"
          disabled={isSubmitting}
          onClick={handleConfirm}
        >
          {isSubmitting ? "Đang tách..." : "Xác nhận"}
        </Button>
      </div>
    </Modal>
  );
};

export default ParseAllModal;
