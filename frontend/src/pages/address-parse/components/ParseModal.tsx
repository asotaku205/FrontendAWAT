import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";

const ParseModal = ({
  selectedIds,
  setIsParseModalOpen,
}: {
  selectedIds: string[];
  setIsParseModalOpen: (isOpen: boolean) => void;
}) => (
  <Modal
    title="Tách địa chỉ hàng loạt"
    open
    onClose={() => setIsParseModalOpen(false)}
    contentClassName="p-0"
  >
    <div className="m-4 items-center justify-center rounded-lg border border-gray-300 p-4">
      <p>Xác nhận tách các đơn đã chọn ({selectedIds.length})</p>
    </div>
    <div className="flex items-center justify-end rounded-b-lg border-t border-gray-300 bg-gray-100">
      <Button
        variant="outline"
        className="m-4"
        onClick={() => setIsParseModalOpen(false)}
      >
        Hủy
      </Button>
      <Button className="m-4">Xác nhận</Button>
    </div>
  </Modal>
);

export default ParseModal;
