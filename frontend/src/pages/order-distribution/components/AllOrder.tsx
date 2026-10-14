import { useState } from "react";
import SearchInput from "../../../components/ui/SearchInput";
import Assigned from "./Assigned";
import Unassign from "./Unassign";
import { Button } from "../../../components/ui/button";
import DateInput from "../../../components/ui/DateInput";
import Filter from "../../../components/ui/Filter";
import SelectOption from "../../../components/ui/SelectOption";
import useApiData from "../../../hooks/useApiData";
import { API_ENDPOINTS } from "../../../services/api";
import type { OrderDistributionFilterOptions } from "../../../services/types";

const AllOrder = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [tabOpen, setTabOpen] = useState("assigned");
  const { data: filterOptions, error, isLoading } =
    useApiData<OrderDistributionFilterOptions>(
      API_ENDPOINTS.orderDistribution.options,
    );

  return (
    <>
      <div className="mb-3 flex max-w-lg gap-1 overflow-x-auto rounded-lg border border-gray-300 p-1">
        <Button
          variant={tabOpen === "assigned" ? "outline" : "ghost"}
          className={
            tabOpen === "assigned"
              ? "min-h-9 flex-1 whitespace-nowrap border px-4 font-bold text-red-700"
              : "min-h-9 flex-1 whitespace-nowrap border px-4 text-gray-500 hover:bg-white hover:text-black"
          }
          onClick={() => setTabOpen("assigned")}
        >
          Đã chia
        </Button>
        <Button
          variant={tabOpen === "unassign" ? "outline" : "ghost"}
          className={
            tabOpen === "unassign"
              ? "min-h-9 flex-1 whitespace-nowrap border px-4 font-bold text-red-700"
              : "min-h-9 flex-1 whitespace-nowrap border px-4 text-gray-500 hover:bg-white hover:text-black"
          }
          onClick={() => setTabOpen("unassign")}
        >
          Chưa chia
        </Button>
      </div>
      {/* filter */}
      <Filter className="mb-2 rounded border-gray-300 p-4 text-xs">
        <div className="flex flex-wrap gap-4">
          <SearchInput placeholder="Tìm kiếm mã đơn, địa chỉ..." />
          <Button
            variant="outline"
            onClick={() => setIsAdvanceSearchOpen(!isAdvanceSearchOpen)}
          >
            {isAdvanceSearchOpen ? "Ẩn bộ lọc" : "Lọc nâng cao"}
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-4">
          {isAdvanceSearchOpen && (
            filterOptions && (
              <>
                <SelectOption title="Khu vực kho" placeholder="Tất cả Kho" option={filterOptions.locations} isFilter />
                <SelectOption title="Trạng thái" placeholder="Tất cả trạng thái" option={filterOptions.statuses} isFilter />
                <SelectOption title="Nhân viên" placeholder="Tất cả nhân viên" option={filterOptions.employees} isFilter />
                <SelectOption title="Đợt phân phối" placeholder="Tất cả đợt" option={filterOptions.batches} isFilter />
                <DateInput title="Ngày tạo đơn" />
              </>
            )
          )}
        </div>
        {isAdvanceSearchOpen && isLoading && (
          <p role="status" className="text-gray-500">Đang tải tùy chọn bộ lọc...</p>
        )}
        {isAdvanceSearchOpen && error && (
          <p role="alert" className="text-red-700">Không tải được tùy chọn bộ lọc: {error}</p>
        )}
      </Filter>
      {tabOpen === "assigned" ? <Assigned /> : <Unassign />}
      
    </>
  );
};

export default AllOrder;
