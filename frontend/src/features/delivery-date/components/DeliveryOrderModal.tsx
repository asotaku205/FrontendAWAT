import { Button } from "../../../components/Button";
import Modal from "../../../components/Modal";
import SelectOption from "../../../components/SelectOption";
import { Textarea } from "../../../components/TextArea";
import type { DeliveryOrder } from "../../../services/types";

type DeliveryOrderModalProps = {
  order: DeliveryOrder;
  callStatusOptions: DeliveryOrder["callStatus"][];
  onClose: () => void;
};

const DeliveryOrderModal = ({
  order,
  callStatusOptions,
  onClose,
}: DeliveryOrderModalProps) => (
  <Modal
    title={`Bản đồ di chuyển đơn ${order.orderCode}`}
    description={`${order.customerName} - ${order.product} - ${order.carrier}`}
    open
    onClose={onClose}
    className="max-h-[90vh] max-w-3xl overflow-y-auto"
    contentClassName="space-y-4 px-5 py-4"
  >
    <div className="flex flex-wrap justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
      <span>{order.status}</span>
      <span>
        ETA giao: <strong>{order.eta}</strong>
      </span>
    </div>

    <section>
      <h3 className="mb-3 text-sm font-semibold text-gray-900">
        Hành trình vận chuyển
      </h3>
      <div className="overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-4">
        <div className="flex min-w-max items-center justify-between gap-3">
          {order.routeStops.map((stop, index) => (
            <div key={`${stop.location}-${index}`} className="flex items-center gap-3">
              <div
                className={`w-28 rounded-md border px-2 py-3 text-center text-xs ${
                  stop.status === "current"
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <p className="font-medium">{stop.location}</p>
                <p className="mt-2 text-gray-600">{stop.description}</p>
              </div>
              {index < order.routeStops.length - 1 && (
                <span aria-hidden="true" className="text-gray-500">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    <SelectOption
      title="Trạng thái gọi"
      placeholder="Chọn trạng thái"
      option={callStatusOptions}
      defaultValue={order.callStatus}
    />

    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-gray-700">Ghi chú vận hành</span>
      <Textarea rows={3} className="resize-y bg-white" />
    </label>

    <div className="-mx-5 -mb-4 flex flex-wrap justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4">
      <Button type="button" variant="outline" onClick={onClose}>
        Đóng
      </Button>
    </div>
  </Modal>
);

export default DeliveryOrderModal;
