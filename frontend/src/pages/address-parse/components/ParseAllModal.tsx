import { Button } from "../../../components/ui/button";
import DateInput from "../../../components/ui/DateInput";
import Modal from "../../../components/ui/Modal";

const ParseAllModal = ({
  setIsParseAllModalOpen,
}: {
  setIsParseAllModalOpen: (isOpen: boolean) => void;
}) => (
  <Modal
    title="Tách địa chỉ hàng loạt"
    open
    onClose={() => setIsParseAllModalOpen(false)}
    contentClassName="p-0"
  >
    <div className="m-4 flex items-center gap-2 rounded-lg border border-gray-300 p-4">
      <input type="radio" name="parseMode" value="all" />
      <p>Xác nhận tách tất cả đơn hiện có </p>
    </div>
    <div className="m-4 flex flex-col gap-2 rounded-lg border border-gray-300 p-4">
      <label className="flex items-center gap-2">
        <input type="radio" name="parseMode" value="date" />
        <span>Lọc theo ngày tạo đơn</span>
      </label>
      <div className="flex flex-wrap gap-3">
        <DateInput title="Từ ngày" />
        <DateInput title="Đến ngày" />
      </div>
    </div>
    <div className="flex items-center justify-end rounded-b-lg border-t border-gray-300 bg-gray-100">
      <Button
        variant="outline"
        className="m-4"
        onClick={() => setIsParseAllModalOpen(false)}
      >
        Hủy
      </Button>
      <Button className="m-4">Xác nhận</Button>
    </div>
  </Modal>
);

export default ParseAllModal;
