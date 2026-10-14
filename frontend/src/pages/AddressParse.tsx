import ParsedAddress from "./address-parse/components/ParsedAddress";
import PendingAddress from "./address-parse/components/PendingAddress";
import SearchInput from "../components/ui/SearchInput";
import { useState } from "react";
import { Button } from "../components/ui/button";
import DateInput from "../components/ui/DateInput";
import Filter from "../components/ui/Filter";
import SelectOption from "../components/ui/SelectOption";
import useApiData from "../hooks/useApiData";
import { API_ENDPOINTS } from "../services/api";
import type { AddressParseOptions } from "../services/types";

const AddressParse = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [tabOpen, setTabOpen] = useState("pending");
  const { data: addressOptions, error, isLoading } =
    useApiData<AddressParseOptions>(API_ENDPOINTS.addressParse.options);

  if (isLoading) return <p role="status">Đang tải tùy chọn địa chỉ...</p>;
  if (error || !addressOptions) {
    return (
      <p role="alert">
        Không tải được tùy chọn địa chỉ: {error ?? "Phản hồi API không hợp lệ."}
      </p>
    );
  }

  return (
    <>
      {/* Tab đã tách và chưa tách */}
      <div className="text-lg font-bold pb-5">
        Phân tách địa chỉ
      </div>
      <div className="gap-1 rounded-lg p-1 mb-3 border-b border-gray-300">
        <Button
          variant="ghost"
          className={
            tabOpen === "pending"
              ? "rounded-md  px-5 py-2 bg-white text-red-800 font-bold "
              : "rounded-md  px-5 py-2 hover:bg-white"
          }
          onClick={() => setTabOpen("pending")}
        >
          Chờ tách địa chỉ
        </Button>
        <Button
          variant="ghost"
          className={
            tabOpen === "parsed"
              ? "rounded-md  px-5 py-2 bg-white text-red-800 font-bold "
              : "rounded-md  px-5 py-2 hover:bg-white"
          }
          onClick={() => setTabOpen("parsed")}
        >
          Xác nhận địa chỉ
        </Button>
      </div>
      {/* Tìm kiếm và lọc */}
      <Filter
        className="mb-2 text-xs"
        onReset={() => setIsAdvanceSearchOpen(false)}
      >
        <div className="flex flex-wrap items-center gap-4">
          <SearchInput placeholder="Tìm kiếm mã đơn, địa chỉ..." />
          <Button
            type="button"
            color="#ffffff"
            className="border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsAdvanceSearchOpen(!isAdvanceSearchOpen)}
            title={isAdvanceSearchOpen ? "Ẩn bộ lọc" : "Lọc nâng cao"}
          />
        </div>
        {isAdvanceSearchOpen && (
          <div className="flex flex-wrap gap-4">
            <>
              {tabOpen === "parsed" && (
                <>
                  <SelectOption
                    title="Độ tin cậy"
                    placeholder="Tất cả độ tin cậy"
                    option={addressOptions.reliability}
                    isFilter
                  />
                  <SelectOption
                    title="Tỉnh/Thành phố"
                    placeholder="Tất cả tỉnh/thành phố"
                    option={addressOptions.city}
                    isFilter
                  />
                </>
              )}
              <DateInput title="Ngày tạo đơn" />
            </>
          </div>
        )}
      </Filter>
      {/* Trang chờ tách và đẫ tách */}
      {tabOpen === "pending" ? (
        <PendingAddress addressOptions={addressOptions} />
      ) : (
        <ParsedAddress addressOptions={addressOptions} />
      )}
    </>
  );
};

export default AddressParse;
