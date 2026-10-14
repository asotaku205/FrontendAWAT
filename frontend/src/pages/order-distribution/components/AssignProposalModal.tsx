import { Button } from "../../../components/ui/button";
import Modal from "../../../components/ui/Modal";
import type { DistributionRecommendation } from "../../../services/types";

const AssignProposalModal = ({
  setIsAgssignProposalModalOpen,
  recommendation,
}: {
  setIsAgssignProposalModalOpen: (isOpen: boolean) => void;
  recommendation: DistributionRecommendation;
}) => (
  <Modal
    title={`Đề xuất phân công Đợt ${recommendation.batch}`}
    description="Phương án theo khu vực kho/Công suất"
    open
    onClose={() => setIsAgssignProposalModalOpen(false)}
    contentClassName="p-0"
  >
    <div className="px-5 py-4">
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {[
          [recommendation.orderCount - recommendation.manualOrderCount, "Đơn hợp lệ"],
          [recommendation.manualOrderCount, "Đơn ngoại lệ"],
          [recommendation.employeesCount, "Nhân viên / ca"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-lg border border-t-2 border-t-red-600 bg-white px-5 py-4 text-center"
          >
            <p className="mb-1 text-2xl font-bold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
      <p className="mb-3 font-semibold">DỰ KIẾN CÔNG VIỆC NHÂN VIÊN</p>
      {recommendation.employeeAssignments.map(({ name, currentOrders, additionalOrders }) => (
        <div key={name} className="mb-2 rounded-md border bg-white p-2 text-xs">
          <p className="font-bold">{name}</p>
          <p className="mt-1 text-gray-600">
            Đơn hiện tại: {currentOrders} - Nhận thêm:{" "}
            <span className="font-bold text-green-800">+{additionalOrders}</span>
          </p>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-end rounded-b-lg border-t border-gray-300 bg-gray-100">
      <Button
        variant="outline"
        className="my-4"
        onClick={() => setIsAgssignProposalModalOpen(false)}
      >
        Hủy
      </Button>
      <Button className="m-4">Xác nhận</Button>
    </div>
  </Modal>
);

export default AssignProposalModal;
