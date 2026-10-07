import ParsedAddress from "../components/AddressParse/ParsedAddress";
import PendingAddress from "../components/AddressParse/PendingAddress";
import SearchInput from "../components/SearchInput";
import { useState } from "react";

const AddressParse = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [tabOpen, setTabOpen] = useState("pending");

  return (
    <>
      {/* Tab đã tách và chưa tách */}
      <div className="text-lg font-bold pb-5">
        Phân tách địa chỉ
      </div>
      <div className="gap-1 rounded-lg p-1 mb-3 border-b border-gray-300">
        <button
          className={
            tabOpen === "pending"
              ? "rounded-md  px-5 py-2 bg-white text-red-800 font-bold "
              : "rounded-md  px-5 py-2 hover:bg-white"
          }
          onClick={() => setTabOpen("pending")}
        >
          Chờ tách địa chỉ
        </button>
        <button
          className={
            tabOpen === "parsed"
              ? "rounded-md  px-5 py-2 bg-white text-red-800 font-bold "
              : "rounded-md  px-5 py-2 hover:bg-white"
          }
          onClick={() => setTabOpen("parsed")}
        >
          Xác nhận địa chỉ
        </button>
      </div>
      {/* Tìm kiếm và lọc */}
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
          {isAdvanceSearchOpen &&  (
            
            <>
            {tabOpen === "parsed" &&(
              <>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Độ tin cậy</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả độ tin cậy</option>
                  <option value="high">Cao {">"}= 95%</option>
                  <option value="medium">Trung bình 75% - 94%</option>
                  <option value="low">Thấp {"<"} 75%</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="text-gray-600">Tỉnh/Thành phố</span>
                <select className="rounded-lg border border-gray-300 p-2">
                  <option value="">Tất cả tỉnh/thành phố</option>
                </select>
              </div>
              </>
            )}
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
      {/* Trang chờ tách và đẫ tách */}
      {tabOpen === "pending" ? <PendingAddress /> : <ParsedAddress />}
    </>
  );
};

export default AddressParse;
