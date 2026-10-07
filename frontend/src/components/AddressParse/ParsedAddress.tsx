import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../components/ui/combobox";
import { Dot } from "lucide-react";
import {
  AddressParseData,
  city,
  district,
  region,
} from "../../mock/AddressParseData";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import usePagination from "../../hooks/usePagination";
import ApproveModal from "./ApproveModal";
import type { AddressParseDataType } from "../../mock/AddressParseData";

import DetailAddressModal from "./DetailAddressModal";
const ParsedAddress = () => {

  const [activeTab, setActiveTab] = useState<
    "all" | "Chưa xác nhận" | "Đã xác nhận" | "Lỗi phân tách"
  >("all");

  const tabData =
    activeTab === "all"
      ? AddressParseData
      : AddressParseData.filter((data) => data.status === activeTab);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [detailData, setDetailData] = useState<AddressParseDataType | null>(
    null,
  );

  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...tabData.sort((a, b) => a.reliability - b.reliability)],
    pageSize: 5,
  });

  const startItem = (currentPage - 1) * 5 + 1;

  const endItem = Math.min(currentPage * 5, AddressParseData.length);

  const handleSelectedCheckBox = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectedAll = () => {
    if (selectedIds.length === AddressParseData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(AddressParseData.map((item) => item.orderCode));
    }
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };
  
  return (
    <>
      {/* Tab các trang theo trạng thái */}

      <div className="mb-4 flex rounded-lg border border-gray-300 bg-gray-100 px-2 py-1   ">
        <button
          className={
            activeTab === "all"
              ? "rounded-md flex-1 bg-white text-red-700 font-bold px-5 py-3"
              : "rounded-md flex-1 text-gray-600 hover:bg-white hover:text-black px-5 py-3"
          }
          onClick={() => setActiveTab("all")}
        >
          Tất cả ({AddressParseData.length})
        </button>
        <button
          className={
            activeTab === "Chưa xác nhận"
              ? "rounded-md flex-1 bg-white text-red-700 font-bold"
              : "rounded-md flex-1 text-gray-600 hover:bg-white hover:text-black"
          }
          onClick={() => setActiveTab("Chưa xác nhận")}
        >
          Chờ xác nhận (
          {
            AddressParseData.filter((data) => data.status === "Chưa xác nhận")
              .length
          }
          )
        </button>
        <button
          className={
            activeTab === "Đã xác nhận"
              ? "rounded-md flex-1 bg-white text-red-700 font-bold"
              : "rounded-md flex-1 text-gray-600 hover:bg-white hover:text-black"
          }
          onClick={() => setActiveTab("Đã xác nhận")}
        >
          Đã xác nhận (
          {
            AddressParseData.filter((data) => data.status === "Đã xác nhận")
              .length
          }
          )
        </button>
        <button
          className={
            activeTab === "Lỗi phân tách"
              ? "rounded-md flex-1 bg-white text-red-700 font-bold"
              : "rounded-md flex-1 text-gray-600 hover:bg-white hover:text-black"
          }
          onClick={() => setActiveTab("Lỗi phân tách")}
        >
          Lỗi phân tách (
          {
            AddressParseData.filter((data) => data.status === "Lỗi phân tách")
              .length
          }
          )
        </button>
      </div>
      {/* Bảng dữ liệu */}
      <section className="bg-white  rounded-lg border-gray-300 border  shadow-md text-xs">
        <div className="overflow-x-auto">
          {selectedIds.length > 0 && (
            <div className="bg-white text-gray-600 text-sm font-semibold flex">
              <div className=" px-5 py-2 my-4">
                {selectedIds.length} dòng đã được chọn
              </div>
              <button
                className="bg-red-800 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg my-4 mx-2"
                onClick={() => setIsApproveModalOpen(true)}
              >
                Xác nhận hàng loạt
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg my-4 mx-2"
                onClick={handleDeselectAll}
              >
                Bỏ chọn
              </button>
            </div>
          )}
          <table className="w-full min-w-max border-collapse">
            {/* đề mục */}
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-600">
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === AddressParseData.length}
                    onChange={handleSelectedAll}
                  />
                </th>
                <th className="p-2 text-left">Đơn/Khách</th>
                <th className="p-2 text-left">SĐT</th>
                <th className="p-2 text-left">Địa chỉ gốc</th>
                <th className="p-2 text-left ">
                  <div className="flex flex-col">
                    <span>Tỉnh/TP</span>
                    <Combobox items={city}>
                      <ComboboxInput placeholder="Chọn Tỉnh/TP" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </div>
                </th>
                <th className="p-2 text-left ">
                  <div className="flex flex-col">
                    <span>Quận/Huyện</span>
                    <Combobox items={district}>
                      <ComboboxInput placeholder="Chọn Quận/Huyện" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </div>
                </th>
                <th className="p-2 text-left w-40 ">
                  <div className="flex flex-col">
                    <span>Xã/Phường</span>
                    <Combobox items={region}>
                      <ComboboxInput placeholder="Chọn Xã/Phường" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </div>
                </th>
                <th className="p-2 text-left">Địa chỉ chi tiết</th>
                <th className="p-2 text-left">Độ tin cậy</th>
                <th className="p-2 text-left">Trạng thái</th>
                <th className="p-2 text-left">Hành động</th>
              </tr>
            </thead>
            {/* nội dung */}
            <tbody>
              {currentData.map((data) => (
                <tr
                  className="text-xs text-gray-700 border-b border-gray-300 hover:bg-gray-50"
                  key={data.orderCode}
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(data.orderCode)}
                      onChange={() => handleSelectedCheckBox(data.orderCode)}
                    />
                  </td>

                  <td className="p-2">
                    <span>{data.orderCode}</span>
                    <span className="block text-sm text-gray-500">
                      {data.customerName}
                    </span>
                  </td>
                  <td className="p-2">{data.phoneNumber}</td>
                  <td className="p-2 w-40">{data.originalAddress}</td>

                  <td className="p-2 w-40">
                    <Combobox items={city} value={data.city}>
                      <ComboboxInput placeholder="Chọn Tỉnh/TP" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </td>

                  <td className="p-2 w-40">
                    <Combobox items={district} value={data.district}>
                      <ComboboxInput placeholder="Chọn Quận/Huyện" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </td>
                  <td className="p-2 w-40">
                    <Combobox items={region} value={data.region}>
                      <ComboboxInput placeholder="Chọn Xã/Phường" showClear />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </td>
                  <td className="p-2">{data.detailedAddress}</td>
                  <td className="p-2">
                    <span
                      className={`flex items-center font-bold ${data.reliability < 75 ? "text-red-700" : data.reliability < 95 ? "text-yellow-600" : "text-green-600"} `}
                    >
                      <Dot
                        size={52}
                        color={
                          data.reliability < 75
                            ? "#c10007"
                            : data.reliability < 95
                              ? "#d08700"
                              : "#00a63e"
                        }
                        strokeWidth={2.75}
                      />
                      {data.reliability}%
                    </span>
                  </td>
                  <td className="p-2">{data.status}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-700 hover:bg-red-800 text-white font-bold px-2 py-1 rounded"
                      onClick={() => {
                        setDetailData(data);
                        setIsDetailModalOpen(true);
                      }}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Phân trang */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Hiển thị{" "}
              <span className="font-medium text-gray-600">
                {startItem}-{endItem}
              </span>{" "}
              /
              <span className="font-medium text-gray-600">
                {AddressParseData.length}
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
      </section>
      {isApproveModalOpen && (
        <ApproveModal
          selectedIds={selectedIds}
          setIsApproveModalOpen={setIsApproveModalOpen}
        />
      )}
      {isDetailModalOpen && detailData && (
        <DetailAddressModal
          setIsDetailModalOpen={setIsDetailModalOpen}
          DetailData={detailData}
        />
      )}
    </>
  );
};

export default ParsedAddress;
