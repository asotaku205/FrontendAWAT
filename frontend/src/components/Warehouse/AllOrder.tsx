import { useState } from "react";
import SearchInput from "../SearchInput";
import Assigned from "./Assigned";
import Unassign from "./Unassign";

const AllOrder = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [tabOpen, setTabOpen] = useState("assigned");

  return (
    <>
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-gray-300  p-1 mb-3 max-w-lg">
        <button
          className={
            tabOpen === "assigned"
              ? "min-h-9 flex-1 whitespace-nowrap font-bold text-red-700 rounded-md border px-4 bg-white"
              : "min-h-9 flex-1 whitespace-nowrap text-gray-500 rounded-md border px-4  hover:bg-white hover:text-black"
          }
          onClick={() => setTabOpen("assigned")}
        >
          Đã chia
        </button>
        <button
          className={
            tabOpen === "unassign"
              ? "min-h-9 flex-1 whitespace-nowrap font-bold text-red-700 rounded-md border px-4 bg-white"
              : "min-h-9 flex-1 whitespace-nowrap text-gray-500 rounded-md border px-4  hover:bg-white hover:text-black"
          }
          onClick={() => setTabOpen("unassign")}
        >
          Chưa chia
        </button>
      </div>
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
                  <option value="">Đang đóng gói</option>
                  <option value="">Hoàn thành</option>
                  <option value="">Chưa chia</option>
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
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Đợt phân phối</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả đợt</option>
                  <option value="">10:00</option>
                  <option value="">12:00</option>
                  <option value="">14:00</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Ngày tạo đơn</span>
                <input
                  type="date"
                  className="rounded-lg border border-gray-300 p-2"
                />
              </div>
            </>
          )}
        </div>
      </div>
      {tabOpen === "assigned" ? <Assigned /> : <Unassign />}
      
    </>
  );
};

export default AllOrder;
