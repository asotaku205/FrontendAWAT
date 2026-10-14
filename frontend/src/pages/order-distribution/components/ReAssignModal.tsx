import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";
import type { ExceptionOrder } from "../../../services/types";

const ReAssignModal = ({
  order,
  onClose,
}: {
  order: ExceptionOrder;
  onClose: () => void;
}) => (
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
    <div className="mt-5 flex justify-end gap-2">
      <Button type="button" variant="outline" onClick={onClose}>
        Hủy
      </Button>
      <Button type="button" onClick={onClose}>
        Duyệt phân công
      </Button>
    </div>
  </Modal>
);

export default ReAssignModal;
