import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../components/ui/combobox";
import {
  PendingAddressData,
  city,
  district,
  region,
} from "../../mock/AddressParseData";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import usePagination from "../../hooks/usePagination";
import ParseModal from "./ParseModal";
import ParseAllModal from "./ParseAllModal";
const PendingAddress = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isParseModalOpen, setIsParseModalOpen] = useState(false);
  const [isParseAllModalOpen, setIsParseAllModalOpen] = useState(false);

  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...PendingAddressData],
    pageSize: 5,
  });
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, PendingAddressData.length);
  const handleSelectedCheckBox = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const handleSelectedAll = () => {
    if (selectedIds.length === PendingAddressData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(PendingAddressData.map((item) => item.orderCode));
    }
  };
  const handleDeselectAll = () => {
    setSelectedIds([]);
  };
  return (
    <>
      <button
        className="bg-red-700 hover:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg my-4"
        onClick={() => setIsParseAllModalOpen(true)}
      >
        Tách tất cả
      </button>

      {/* Bảng dữ liệu */}
      <section className="bg-white  rounded-lg border-gray-300 border  shadow-md text-xs">
        {selectedIds.length > 0 && (
          <div className="bg-white text-gray-600 text-sm font-semibold flex">
            <div className=" px-5 py-2 my-4">
              {selectedIds.length} dòng đã được chọn
            </div>
            <button
              className="bg-red-800 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg my-4 mx-2"
              onClick={() => setIsParseModalOpen(true)}
            >
              Tách địa chỉ
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg my-4 mx-2"
              onClick={handleDeselectAll}
            >
              Bỏ chọn
            </button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            {/* đề mục */}
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-600">
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === PendingAddressData.length}
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
                  </td>

                  <td className="p-2 w-40">
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
                  </td>
                  <td className="p-2 w-40">
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
                  </td>
                  <td className="p-2"></td>

                  <td className="p-2">{data.status}</td>
                  <td className="p-2">
                    <button className="bg-red-700 hover:bg-red-800 text-white font-bold px-2 py-1 rounded">
                      Tách
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
                {PendingAddressData.length}
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
      {isParseModalOpen && (
        <ParseModal
          selectedIds={selectedIds}
          setIsParseModalOpen={setIsParseModalOpen}
        />
      )}
      {isParseAllModalOpen && <ParseAllModal setIsParseAllModalOpen={setIsParseAllModalOpen}/>}
    </>
  );
};

export default PendingAddress;
