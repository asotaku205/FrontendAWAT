import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";

const ApproveModal = ({
  selectedIds,
  setIsApproveModalOpen,
  onConfirm,
  isSubmitting,
  error,
}: {
  selectedIds: string[];
  setIsApproveModalOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  error: string | null;
}) => (
  <Modal
    title="Xác nhận địa chỉ hàng loạt"
    open
    onClose={() => setIsApproveModalOpen(false)}
    contentClassName="p-0"
  >
    <div className="m-4 items-center justify-center rounded-lg border border-gray-300 p-4">
      <p>Xác nhận ({selectedIds.length}) địa chỉ đã chọn </p>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
    <div className="flex items-center justify-end rounded-b-lg border-t border-gray-300 bg-gray-100">
      <Button
        variant="outline"
        className="m-4"
        onClick={() => setIsApproveModalOpen(false)}
      >
        Hủy
      </Button>
      <Button
        className="m-4"
        disabled={isSubmitting || selectedIds.length === 0}
        onClick={onConfirm}
      >
        {isSubmitting ? "Đang xác nhận..." : "Xác nhận"}
      </Button>
    </div>
  </Modal>
);

export default ApproveModal;
