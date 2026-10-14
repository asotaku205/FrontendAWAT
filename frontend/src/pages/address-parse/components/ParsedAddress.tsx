import { useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import usePagination from "../../../hooks/usePagination";
import useApiData from "../../../hooks/useApiData";
import { API_ENDPOINTS } from "../../../services/api";
import type {
  AddressParseDataType,
  AddressParseOptions,
} from "../../../services/types";
import AddressTable from "./AddressTable";
import ApproveModal from "./ApproveModal";
import DetailAddressModal from "./DetailAddressModal";
import SelectionToolbar from "./SelectionToolbar";

const tabs = [
  { value: "all", label: "Tất cả" },
  { value: "Chưa xác nhận", label: "Chờ xác nhận" },
  { value: "Đã xác nhận", label: "Đã xác nhận" },
  { value: "Lỗi phân tách", label: "Lỗi phân tách" },
] as const;

type AddressStatus = (typeof tabs)[number]["value"];

const ParsedAddress = ({
  addressOptions,
}: {
  addressOptions: AddressParseOptions;
}) => {
  const [activeTab, setActiveTab] = useState<AddressStatus>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [detailData, setDetailData] = useState<AddressParseDataType | null>(null);
  const { data: parsedAddresses, error, isLoading } =
    useApiData<AddressParseDataType[]>(API_ENDPOINTS.addressParse.parsed);
  const records = useMemo(() => parsedAddresses ?? [], [parsedAddresses]);

  const tabData = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? records
        : records.filter(({ status }) => status === activeTab);
    return [...filtered].sort((a, b) => a.reliability - b.reliability);
  }, [activeTab, records]);
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: tabData,
    pageSize: 5,
  });

  const toggleSelection = (orderCode: string) => {
    setSelectedIds((selected) =>
      selected.includes(orderCode)
        ? selected.filter((id) => id !== orderCode)
        : [...selected, orderCode],
    );
  };
  const toggleAll = () =>
    setSelectedIds((selected) =>
      selected.length === records.length
        ? []
        : records.map(({ orderCode }) => orderCode),
    );
  const openDetails = (orderCode: string) => {
    setDetailData(
      records.find((record) => record.orderCode === orderCode) ?? null,
    );
  };

  if (isLoading) return <p role="status">Đang tải địa chỉ đã tách...</p>;
  if (error) return <p role="alert">Không tải được địa chỉ đã tách: {error}</p>;

  return (
    <>
      <div className="mb-4 flex rounded-lg border border-gray-300 bg-gray-100 px-2 py-1">
        {tabs.map(({ value, label }) => {
          const count =
            value === "all"
              ? records.length
              : records.filter(({ status }) => status === value).length;

          return (
            <Button
              key={value}
              variant="ghost"
              className={`flex-1 whitespace-nowrap px-5 py-3 ${
                activeTab === value
                  ? "bg-white font-bold text-red-700"
                  : "text-gray-600 hover:bg-white hover:text-black"
              }`}
              onClick={() => setActiveTab(value)}
            >
              {label} ({count})
            </Button>
          );
        })}
      </div>
      <AddressTable
        records={currentData}
        selectedIds={selectedIds}
        totalRecords={records.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onToggleAll={toggleAll}
        onToggleRow={toggleSelection}
        onOpenDetails={openDetails}
        mode="parsed"
        addressOptions={addressOptions}
        toolbar={
          selectedIds.length > 0 && (
            <SelectionToolbar
              count={selectedIds.length}
              actionLabel="Xác nhận hàng loạt"
              onAction={() => setShowApproveModal(true)}
              onClear={() => setSelectedIds([])}
            />
          )
        }
      />
      {showApproveModal && (
        <ApproveModal
          selectedIds={selectedIds}
          setIsApproveModalOpen={setShowApproveModal}
        />
      )}
      {detailData && (
        <DetailAddressModal
          setIsDetailModalOpen={(open) => {
            if (!open) setDetailData(null);
          }}
          DetailData={detailData}
          addressOptions={addressOptions}
        />
      )}
    </>
  );
};

export default ParsedAddress;
