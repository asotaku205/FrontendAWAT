import { Button } from "../../../components/Button";
import Modal from "../../../components/Modal";

const ParseModal = ({
  selectedIds,
  setIsParseModalOpen,
  onConfirm,
  isSubmitting,
  error,
}: {
  selectedIds: string[];
  setIsParseModalOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  error: string | null;
}) => (
  <Modal
    title="Tách địa chỉ hàng loạt"
    open
    onClose={() => setIsParseModalOpen(false)}
    contentClassName="p-0"
  >
    <div className="m-4 items-center justify-center rounded-lg border border-gray-300 p-4">
      <p>Xác nhận tách các đơn đã chọn ({selectedIds.length})</p>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
    <div className="flex items-center justify-end rounded-b-lg border-t border-gray-300 bg-gray-100">
      <Button
        variant="outline"
        className="m-4"
        onClick={() => setIsParseModalOpen(false)}
      >
        Hủy
      </Button>
      <Button
        className="m-4"
        disabled={isSubmitting || selectedIds.length === 0}
        onClick={onConfirm}
      >
        {isSubmitting ? "Đang tách..." : "Xác nhận"}
      </Button>
    </div>
  </Modal>
);

export default ParseModal;
