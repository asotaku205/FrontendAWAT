import { useState } from "react";
import { Button } from "../../../components/ui/button";
import usePagination from "../../../hooks/usePagination";
import useApiData from "../../../hooks/useApiData";
import { API_ENDPOINTS } from "../../../services/api";
import type {
  AddressParseOptions,
  PendingAddressDataType,
} from "../../../services/types";
import AddressTable from "./AddressTable";
import ParseAllModal from "./ParseAllModal";
import ParseModal from "./ParseModal";
import SelectionToolbar from "./SelectionToolbar";

const PendingAddress = ({
  addressOptions,
}: {
  addressOptions: AddressParseOptions;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showParseModal, setShowParseModal] = useState(false);
  const [showParseAllModal, setShowParseAllModal] = useState(false);
  const { data: pendingAddresses, error, isLoading } =
    useApiData<PendingAddressDataType[]>(API_ENDPOINTS.addressParse.pending);
  const records = pendingAddresses ?? [];
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: records,
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

  if (isLoading) return <p role="status">Đang tải địa chỉ chờ tách...</p>;
  if (error) return <p role="alert">Không tải được địa chỉ chờ tách: {error}</p>;

  return (
    <>
      <Button
        className="my-4 rounded-lg px-5"
        onClick={() => setShowParseAllModal(true)}
      >
        Tách tất cả
      </Button>
      <AddressTable
        records={currentData}
        selectedIds={selectedIds}
        totalRecords={records.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onToggleAll={toggleAll}
        onToggleRow={toggleSelection}
        mode="pending"
        addressOptions={addressOptions}
        toolbar={
          selectedIds.length > 0 && (
            <SelectionToolbar
              count={selectedIds.length}
              actionLabel="Tách địa chỉ"
              onAction={() => setShowParseModal(true)}
              onClear={() => setSelectedIds([])}
            />
          )
        }
      />
      {showParseModal && (
        <ParseModal
          selectedIds={selectedIds}
          setIsParseModalOpen={setShowParseModal}
        />
      )}
      {showParseAllModal && (
        <ParseAllModal setIsParseAllModalOpen={setShowParseAllModal} />
      )}
    </>
  );
};

export default PendingAddress;
