import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import usePagination from "../../../hooks/use-pagination";
import { API_ENDPOINTS, apiPost } from "../../../services/api";
import type {
  AddressParseDataType,
  AddressParseOrdersRequest,
  AddressParseOptions,
} from "../../../services/types";
import AddressTable from "./AddressTable";
import ParseAllModal from "./ParseAllModal";
import ParseModal from "./ParseModal";
import SelectionToolbar from "./SelectionToolbar";
import type { PendingAddress as PendingAddressRecord } from "../../../services/generated/models";
import { getPendingAddresses, parseSelectedAddresses } from "../api";
const PendingAddress = ({
  addressOptions,
}: {
  addressOptions: AddressParseOptions;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showParseModal, setShowParseModal] = useState(false);
  const [showParseAllModal, setShowParseAllModal] = useState(false);
  const [processedIds, setProcessedIds] = useState<string[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [pendingAddresses, setPendingAddresses] = useState<
    PendingAddressRecord[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPendingAddresses() {
      try {
        const addresses = await getPendingAddresses(controller.signal);
        setPendingAddresses(addresses);
      } catch (requestError: unknown) {
        if (controller.signal.aborted) return;

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Đã xảy ra lỗi khi tải dữ liệu.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPendingAddresses();

    return () => controller.abort();
  }, []);

  const records = (pendingAddresses ?? []).filter(
    ({ orderCode }) => !processedIds.includes(orderCode),
  );
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

  const parseOrders = async (orderCodes: string[]) => {
    if (isParsing || orderCodes.length === 0) return;
    setParseError(null);
    setIsParsing(true);
    try {
      await parseSelectedAddresses(orderCodes);
      setProcessedIds((current) => [...new Set([...current, ...orderCodes])]);
      setSelectedIds([]);
      setShowParseModal(false);
      setShowParseAllModal(false);
    } catch (requestError: unknown) {
      const responseMessage = axios.isAxiosError<{ message?: string }>(
        requestError,
      )
        ? requestError.response?.data?.message
        : undefined;
      setParseError(
        responseMessage ??
          (requestError instanceof Error
            ? requestError.message
            : "Không thể tách địa chỉ."),
      );
    } finally {
      setIsParsing(false);
    }
  };

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
          onConfirm={() => void parseOrders(selectedIds)}
          isSubmitting={isParsing}
          error={parseError}
        />
      )}
      {showParseAllModal && (
        <ParseAllModal
          setIsParseAllModalOpen={setShowParseAllModal}
          onConfirm={(orderCodes) => void parseOrders(orderCodes)}
          isSubmitting={isParsing}
          error={parseError}
          records={records}
        />
      )}
    </>
  );
};

export default PendingAddress;
