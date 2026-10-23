import { Button } from "../../../components/ui/button";

const DeliveryOderModal = ({
  setDeliveryOrderModalOpen,
}: {
  setDeliveryOrderModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <>
      <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
        <div className="h-auto w-full max-w-3xl overflow-auto max-h-160 z-10 bg-white rounded-xl">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-lg font-semibold">
              Bản đồ di chuyển đơn VC-014
            </h2>
            <p className="mt-2 text-xs text-gray-600">
              Nguyễn Văn Hùng - Lọc gió DENSO DAF - GHTK
            </p>
          </div>
          <div className="px-5 py-4">
            <div className="mb-4 flex justify-between border border-input bg-gray-50 p-3 text-xs">
              <span>Đang vận chuyển</span>
              <span>
                ETA Giao: <strong>16:00</strong>
              </span>
            </div>
            <p className="mb-3 text-xs font-semibold">HÀNH TRÌNH VẬN CHUYỂN</p>
            <div className="mb-5 overflow-x-auto border border-border bg-gray-50 p-5">
              <div className="flex min-w-130 items-center justify-between">
                <div className="flex items-center">
                  <div className="w-28 rounded-lg bg-white border px-2 py-4 text-center text-xs ">
                    <p>Kho Denso</p>
                    <p className="mt-2 ">06:30 - Xuất kho</p>
                  </div>
                  <span className="mx-3 ">{"-->"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-28 rounded-lg border bg-white px-2 py-4 text-center text-xs">
                    <p>Cầu Giấy</p>
                    <p className="mt-2 ">07:45 - Đã qua</p>
                  </div>
                  <span className="mx-3 ">{"-->"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-28 rounded-lg border px-2 py-4 text-center text-xs bg-white font-semibold">
                    <p>Đống Đa</p>
                    <p className="mt-2 ">Đang tại trạm</p>
                  </div>
                  <span className="mx-3 t">{"-->"}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-28 rounded-lg border px-2 bg-white py-4 text-center text-xs border-input">
                    <p>Địa chỉ khách hàng</p>
                    <p className="mt-2 ">Dự kiến 16:00</p>
                  </div>
                </div>
              </div>
            </div>
            <label className="mb-3 flex flex-col gap-1.5 text-xs">
              <span>Trạng thái gọi</span>
              <select className="h-9 min-w-0 rounded-md border border-input bg-white px-3 ">
                <option>Chưa gọi</option>
                <option>CẦN GỌI NGAY</option>
                <option>Đã gọi xong</option>
              </select>
            </label>
            <label className="mb-3 flex flex-col gap-1.5 text-xs">
              <span>Ghi chú vận hành</span>
              <textarea className="rounded-md border  bg-white p-3 "></textarea>
            </label>
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-border bg-gray-50 px-5 py-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setDeliveryOrderModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant={"default"}
            >
              Lưu cập nhật
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeliveryOderModal;
