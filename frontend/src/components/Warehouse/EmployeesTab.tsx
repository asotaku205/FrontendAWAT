import { useState } from "react";
import SearchInput from "../SearchInput";
import usePagination from "../../hooks/usePagination";
import { EmployeesData } from "../../mock/Employees";
import Pagination from "@mui/material/Pagination";
import PrintOrderModal from "./PrintOrderModal";

const EmployeesTab = () => {
  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...EmployeesData],
    pageSize: 5,
  });

  const startItem = (currentPage - 1) * 5 + 1;

  const endItem = Math.min(currentPage * 5, EmployeesData.length);
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [isPrintOrderModalOpen, setPrintOrderModalOpen] = useState(false);

  return (
    <>
      {/* filter */}
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
                <span className="text-gray-600">Khu vực kho</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="all">Tất cả Kho</option>
                  <option value="a1-101">A1-101</option>
                  <option value="a2-201">A2-201</option>
                  <option value="a3-301">A3-301</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Trạng thái</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả trạng thái</option>
                  <option value="">Đang thực hiện</option>
                  <option value="">Nghỉ đột xuất</option>
                  <option value="">In thêm</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Nhân viên</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả nhân viên</option>
                  <option value="">Nguyễn Bá Thiện</option>
                  <option value="">Đỗ Trần Anh Sơn</option>
                  <option value="">Nguyễn Tuấn Anh</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      <button className="rounded-md px-2 py-2 text-sm mb-2 border border-gray-100 justify-center gap-1.5 font-bold bg-red-700 text-white hover:bg-red-800 " onClick={()=>setPrintOrderModalOpen(true)} >
        In thêm cho NV sắp xong
      </button>
      <div className="overflow-x-auto rounded-lg border border-border bg-white text-xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Nhân Viên
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Đợt hiện tại
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Đơn hoàn thành
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Đơn còn lại
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Tốc độ làm (1 giờ)
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                ETA
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => (
              <tr>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.employees}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.currentBlock}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.completedOrder}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.remainingOrder}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.performance} đơn/giờ
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.eta} phút
                </td>
                {data.status === "In thêm" ? (
                  <td className="border-b border-r px-3 py-3  items-center  ">
                    <button className="rounded-md px-3 py-2 font-bold bg-red-700 text-white hover:bg-red-800" onClick={()=>setPrintOrderModalOpen(true)}>
                      {data.status}
                    </button>
                  </td>
                ) : (
                  <td className=" border-b border-r px-3 py-3 items-center">
                    {data.status}
                  </td>
                )}
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
              {EmployeesData.length}
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
      {isPrintOrderModalOpen && (
        <PrintOrderModal setPrintOrderModalOpen={setPrintOrderModalOpen} />
      )}
    </>
  );
};

export default EmployeesTab;
