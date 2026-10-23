import { useState } from "react";
import SearchInput from "../components/ui/SearchInput";
import Pagination from "../components/ui/Pagination";
import useApiData from "../hooks/useApiData";
import usePagination from "../hooks/usePagination";
import { API_ENDPOINTS } from "../services/api";
import type { DeliveryOrder } from "../services/types";
import DeliveryOderModal from "./delivery-date/components/DeliveryOderModal";
import type { TableColumn } from "../components/ui/Table";
import Table from "../components/ui/Table";
import { Button } from "../components/ui/button";
const deliveryColumns: TableColumn<DeliveryOrder>[] = [
  { key: "orderCode", title: "Mã đơn" },
  { key: "customerName", title: "Khách hàng" },
  { key: "product", title: "Sản phẩm" },
  {
    key: "carrier",
    title: "Đơn vị vận chuyển",
  },
  {
    key: "station",
    title: "Trạm",
  },
  {
    key: "status",
    title: "Trạng thái",
  },
  { key: "eta", title: "ETA" },
  { key: "timeCall", title: "Khung gọi tối ưu" },
  { key: "callStatus", title: "Trạng thái gọi" },
];
const DeliveryDate = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const { data, error, isLoading } = useApiData<DeliveryOrder[]>(
    API_ENDPOINTS.deliveryOrders,
  );
  const deliveryOrders = data ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: deliveryOrders,
      pageSize: 5,
    });

  const [isDeliveryOrderModalOpen, setDeliveryOrderModalOpen] = useState(false);

  if (isLoading)
    return <p role="status">Đang tải danh sách đơn giao hàng...</p>;
  if (error) {
    return <p role="alert">Không tải được danh sách đơn giao hàng: {error}</p>;
  }

  return (
    <>
      <div className="text-lg font-bold pb-5">Dự đoán thời gian giao hàng</div>
      <div className="mb-4 flex items-center justify-between gap-3 bg-white rounded-lg border border-b-red-600  px-4 py-3">
        <p className="font-bold text-red-800">
          CẢNH BÁO VẬN HÀNH: 2 đơn trễ hạn - 3 đơn chưa gọi trong khung giờ tối
          ưu
          <span className="text-sm text-gray-500 font-normal">
            {" "}
            - Cần kiểm tra & chuyển Telesale
          </span>
        </p>
        <Button>
          Xem đơn cần xử lý gấp
        </Button>
      </div>
      <div className=" border-b mb-2 border-gray-300 p-4 text-xs bg-white rounded ">
        <div className="flex gap-4">
          <SearchInput placeholder="Tìm kiếm mã đơn, địa chỉ..." />
          <Button
          variant={"outline"}
            onClick={() => setIsAdvanceSearchOpen(!isAdvanceSearchOpen)}
          >
            Lọc nâng cao
          </Button>
        </div>
        <div className="flex gap-4 mt-2">
          {isAdvanceSearchOpen && (
            <>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Tỉnh/TP</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="all">Tất cả Tỉnh/TP</option>
                  <option value="">Hà Nội</option>
                  <option value="">Hải Phòng</option>
                  <option value="">TP Hồ Chí Minh</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Trạm</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả trạng thái</option>
                  <option value="">Cầu Giấy</option>
                  <option value="">Hà Đông</option>
                  <option value="">Thanh Xuân</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Trạng thái</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả Trạng thái</option>
                  <option value="">Trễ hạn</option>
                  <option value="">Đang vận chuyển</option>
                  <option value="">Sắp đến nơi</option>
                  <option value="">Cần xử lý gấp</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mb-5 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.025em]">
            <span>Bản đồ các trạm trung gian (HUB) - Mô hình dự đoán</span>
          </div>
          <div className="overflow-x-auto rounded-b-lg border border-border bg-white ">
            <div className=" flex h-85 min-w-170">
              <button className="  w-28 rounded-lg border px-2 py-3 text-center text-xs bg-gray-50  font-semibold ">
                <span className="">Cầu Giấy</span>
                <span className="mt-1 ">(212 đơn)</span>
              </button>
              <button className=" m-2 rounded-lg border px-2 py-3 text-center text-xs  bg-white hover:bg-gray-50 ">
                <span className="">Hoàn Kiếm</span>
                <span className="mt-1  ">(134 đơn)</span>
              </button>
              <button className="m-2 rounded-lg border px-2 py-3 text-center text-xs  bg-white hover:bg-gray-50">
                <span className="">Đống Đa</span>
                <span className="mt-1 ">(98 đơn)</span>
              </button>
              <button className="m-2 rounded-lg border px-2 py-3 text-center text-xs  bg-white hover:bg-gray-50">
                <span className="">Long Biên</span>
                <span className="mt-1 ">(84 đơn)</span>
              </button>
              <button className="m-2 rounded-lg border px-2 py-3 text-center text-xs  bg-white hover:bg-gray-50">
                <span className="">Gia Lâm</span>
                <span className="mt-1 ]">(45 đơn)</span>
              </button>
              <button className="m-2 rounded-lg border px-2 py-3 text-center text-xs  bg-white hover:bg-gray-50">
                <span className="">Hà Đông</span>
                <span className="mt-1 ">(67 đơn - Trễ)</span>
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold uppercase">
            <span>Chi tiết: Cầu Giấy (212 đơn đang qua)</span>
          </div>
          <div className="min-h-85 space-y-3 rounded-b-lg border border-border bg-white p-3">
            <button
              className="w-full rounded-md border border-border bg-gray-50 px-3 py-4 text-left text-xs hover:bg-gray-100"
              onClick={() => setDeliveryOrderModalOpen(true)}
            >
              <p className="font-medium">VC-003 - Cảm biến oxy DENSO</p>
              <p>ETA: 15:00 | Khung gọi: 13:00-14:00</p>
              <p className="font-semibold">Chờ gọi</p>
            </button>
            <button
              className="w-full rounded-md border border-border bg-gray-50 px-3 py-4 text-left text-xs hover:bg-gray-100"
              onClick={() => setDeliveryOrderModalOpen(true)}
            >
              <p className="font-medium">VC-0022 - Cảm biến oxy DENSO</p>
              <p>ETA: 15:00 | Khung gọi: 13:00-14:00</p>
              <p className="font-semibold">Đã gọi xong</p>
            </button>
            <button
              className="w-full rounded-md border border-border bg-gray-50 px-3 py-4 text-left text-xs hover:bg-gray-100"
              onClick={() => setDeliveryOrderModalOpen(true)}
            >
              <p className="font-medium">VC-0027 - Cảm biến oxy DENSO</p>
              <p>ETA: 15:00 | Khung gọi: 13:00-14:00</p>
              <p className="font-semibold">Đã gọi xong</p>
            </button>
          </div>
        </section>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold">
        Danh sách đơn đang giao
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-white text-xs">
        <Table
          columns={deliveryColumns}
          records={currentData}
          rowKey="orderCode"
          pagination={{
            page: currentPage,
            pageSize: 5,
            totalPages,
            totalRecords: currentData.length,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
      {isDeliveryOrderModalOpen && (
        <DeliveryOderModal
          setDeliveryOrderModalOpen={setDeliveryOrderModalOpen}
        />
      )}
    </>
  );
};

export default DeliveryDate;
