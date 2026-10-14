import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";
import type { PrintRequest } from "../../../services/types";

const PrintOrderModal = ({
  setPrintOrderModalOpen,
  printRequest,
}: {
  setPrintOrderModalOpen: (isOpen: boolean) => void;
  printRequest: PrintRequest;
}) => (
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
    <div className="mt-5 flex justify-end gap-2">
      <Button
        title="Hủy"
        type="button"
        color="#ffffff"
        className="border border-gray-300 text-gray-700 hover:bg-gray-100"
        onClick={() => setPrintOrderModalOpen(false)}
      />
      <Button title="Xác nhận" type="button" />
    </div>
  </Modal>
);

export default PrintOrderModal;
