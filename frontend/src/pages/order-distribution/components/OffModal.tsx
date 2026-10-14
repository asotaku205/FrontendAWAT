import { useState } from "react";
import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";

const OffModal = ({
  employeeName,
  onClose,
}: {
  employeeName: string;
  onClose: () => void;
}) => {
  const [reason, setReason] = useState("");

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
      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="button" disabled={!reason.trim()} onClick={onClose}>
          Xác nhận báo nghỉ
        </Button>
      </div>
    </Modal>
  );
};

export default OffModal;
