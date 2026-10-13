import { useState } from "react";
import SearchInput from "../components/SearchInput";
import Pagination from "@mui/material/Pagination";
import usePagination from "../hooks/usePagination";
import { DeliveryOrderData } from "../mock/DeliveryOrderData";
import DeliveryOderModal from "../components/DeliveryDate/DeliveryOderModal";

const DeliveryDate = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...DeliveryOrderData],
    pageSize: 5,
  });

  const startItem = (currentPage - 1) * 5 + 1;

  const endItem = Math.min(currentPage * 5, DeliveryOrderData.length);

  const [isDeliveryOrderModalOpen, setDeliveryOrderModalOpen] = useState(false);

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
        <button className="rounded-md px-3 py-2 border border-gray-100 justify-center gap-1.5 font-bold bg-red-700 text-white hover:bg-red-800 ">
          Xem đơn cần xử lý gấp
        </button>
      </div>
      <div className=" border-b mb-2 border-gray-300 p-4 text-xs bg-white rounded ">
        <div className="flex gap-4">
          <SearchInput placeholder="Tìm kiếm mã đơn, địa chỉ..." />
          <button
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100"
            onClick={() => setIsAdvanceSearchOpen(!isAdvanceSearchOpen)}
          >
            Lọc nâng cao
          </button>
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
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Mã đơn
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Khách hàng
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Sản phẩm
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Đơn vị vận chuyển
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Trạm
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Trạng thái
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                ETA
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Khung gọi tối ưu
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Trạng thái gọi
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => (
              <tr>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.orderCode}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.customerName}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.product}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.carrier}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.station}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.status}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.eta}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.timeCall}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.callStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Hiển thị{" "}
            <span className="font-medium text-gray-600">
              {startItem}-{endItem}
            </span>{" "}
            /
            <span className="font-medium text-gray-600">
              {DeliveryOrderData.length}
            </span>{" "}
            bản ghi
          </span>
          <div className="flex items-center gap-1">
            <Pagination
              count={totalPages}
              page={currentPage}
              shape="rounded"
              onChange={onChangePage}
            />
          </div>
        </div>
      </div>
      {isDeliveryOrderModalOpen && <DeliveryOderModal setDeliveryOrderModalOpen={setDeliveryOrderModalOpen}/>}
    </>
  );
};

export default DeliveryDate;
