import { Button } from "../../components/ui/button";
import {
  statusBadgeClass,
  needsDecision,
  type CheckOrder,
} from "../../mock/BlacklistData";

type Props = {
  order: CheckOrder | null;
  onClose: () => void;
};

const OrderDetailModal = ({ order, onClose }: Props) => {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              {order.id}
            </span>
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${statusBadgeClass[order.status]}`}
            >
              {order.status}
            </span>
          </div>
          <Button variant={"ghost"} onClick={onClose}>
            ×
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-gray-500">Khách hàng</div>
          <div className="font-medium text-gray-900">{order.customer}</div>
          <div className="text-gray-500">SĐT</div>
          <div className="font-medium text-gray-900 flex flex-col">
            <span>{order.phone}</span>
            <span
              className={`rounded px-2 py-0.5 max-w-35 whitespace-nowrap text-xs font-semibold ${order.inBlacklist ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
            >
              {order.inBlacklist ? "Trong blacklist" : "Không trong blacklist"}
            </span>
          </div>
          <div className="text-gray-500">Ngày đặt hàng</div>
          <div className="text-gray-900">{order.orderDate}</div>
          <div className="text-gray-500">Sản phẩm</div>
          <div className="text-gray-900">
            {order.product} x {order.qty}
          </div>
          <div className="text-gray-500">Giá trị đơn</div>
          <div className="text-gray-900">{order.amount}</div>
          <div className="text-gray-500">Nguồn / NV ADS</div>
          <div className="text-gray-900">
            {order.source} {order.adsStaff !== "-" && `/ ${order.adsStaff}`}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <div className="mb-2 text-sm font-semibold text-gray-900">
            Căn cứ quyết định
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Số đơn trong 3 tháng</span>
              <span className="font-semibold text-gray-900">
                {order.orders3m} đơn
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tỷ lệ hoàn 1 tháng</span>
              <span
                className={`font-semibold ${order.refundRate1m > 60 ? "text-red-600" : "text-green-600"}`}
              >
                {order.refundRate1m}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tỷ lệ hoàn 3 tháng</span>
              <span
                className={`font-semibold ${order.refundRate3m > 60 ? "text-red-600" : "text-green-600"}`}
              >
                {order.refundRate3m}%
              </span>
            </div>
          </div>
        </div>

        {needsDecision(order.status) ? (
          <div className="mt-4 flex gap-2 justify-end">
            <Button variant={"outline"}>Huỷ đơn</Button>
            <Button>Duyệt đi đơn</Button>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-gray-200 p-3 text-center text-sm text-gray-500">
            Đơn này không cần kế toán ra quyết định.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;
