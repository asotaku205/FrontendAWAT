import { useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import Filter from "../components/ui/Filter";
import SearchInput from "../components/ui/SearchInput";
import SelectOption from "../components/ui/SelectOption";
import Table, { type TableColumn } from "../components/ui/Table";
import useApiData from "../hooks/useApiData";
import usePagination from "../hooks/usePagination";
import { API_ENDPOINTS } from "../services/api";
import type { DeliveryOrder } from "../services/types";
import DeliveryOderModal from "./delivery-date/components/DeliveryOderModal";

const pageSize = 5;
const emptyOrders: DeliveryOrder[] = [];

const columns: TableColumn<DeliveryOrder>[] = [
  { key: "orderCode", title: "Mã đơn" },
  { key: "customerName", title: "Khách hàng" },
  { key: "product", title: "Sản phẩm", className: "min-w-48" },
  { key: "carrier", title: "Đơn vị vận chuyển" },
  { key: "station", title: "Trạm" },
  {
    key: "status",
    title: "Trạng thái",
    render: ({ status }) => (
      <span
        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
          status === "Trễ hạn"
            ? "bg-red-50 text-red-700"
            : status === "Sắp đến nơi"
              ? "bg-amber-50 text-amber-700"
              : "bg-blue-50 text-blue-700"
        }`}
      >
        {status}
      </span>
    ),
  },
  { key: "eta", title: "ETA" },
  { key: "timeCall", title: "Khung gọi tối ưu" },
  { key: "callStatus", title: "Trạng thái gọi" },
];

const DeliveryDate = () => {
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [stationFilter, setStationFilter] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeStation, setActiveStation] = useState("");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const { data, error, isLoading } = useApiData<DeliveryOrder[]>(
    API_ENDPOINTS.deliveryOrders,
  );
  const deliveryOrders = data ?? emptyOrders;

  const stations = useMemo(
    () => [...new Set(deliveryOrders.map(({ station }) => station))],
    [deliveryOrders],
  );
  const carriers = useMemo(
    () => [...new Set(deliveryOrders.map(({ carrier }) => carrier))],
    [deliveryOrders],
  );
  const orderStatuses = useMemo(
    () => [...new Set(deliveryOrders.map(({ status }) => status))],
    [deliveryOrders],
  );
  const callStatuses = useMemo(
    () => [...new Set(deliveryOrders.map(({ callStatus }) => callStatus))],
    [deliveryOrders],
  );
  const stationStats = useMemo(
    () =>
      stations.map((station) => {
        const orders = deliveryOrders.filter((order) => order.station === station);
        return {
          station,
          orderCount: orders.length,
          overdueCount: orders.filter((order) => order.status === "Trễ hạn").length,
        };
      }),
    [deliveryOrders, stations],
  );
  const selectedStation =
    stationStats.find(({ station }) => station === activeStation)?.station ??
    stationStats[0]?.station ??
    "";
  const ordersAtStation = useMemo(
    () => deliveryOrders.filter((order) => order.station === selectedStation),
    [deliveryOrders, selectedStation],
  );
  const overdueCount = useMemo(
    () => deliveryOrders.filter((order) => order.status === "Trễ hạn").length,
    [deliveryOrders],
  );
  const notCalledCount = useMemo(
    () => deliveryOrders.filter((order) => order.callStatus === "Chưa gọi").length,
    [deliveryOrders],
  );
  const filteredOrders = useMemo(() => {
    const query = searchText.trim().toLocaleLowerCase();
    return deliveryOrders.filter((order) => {
      const matchesSearch =
        !query ||
        [
          order.orderCode,
          order.customerName,
          order.product,
          order.station,
          order.carrier,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query);
      const needsAttention =
        order.status === "Trễ hạn" || order.callStatus === "Cần gọi ngay";

      return (
        matchesSearch &&
        (!stationFilter || order.station === stationFilter) &&
        (!carrierFilter || order.carrier === carrierFilter) &&
        (!statusFilter || order.status === statusFilter) &&
        (!urgentOnly || needsAttention)
      );
    });
  }, [
    carrierFilter,
    deliveryOrders,
    searchText,
    stationFilter,
    statusFilter,
    urgentOnly,
  ]);
  const { currentData, totalPages, currentPage, setCurrentPage } = usePagination({
    data: filteredOrders,
    pageSize,
  });

  const resetFilters = () => {
    setSearchText("");
    setStationFilter("");
    setCarrierFilter("");
    setStatusFilter("");
    setIsAdvanceSearchOpen(false);
    setUrgentOnly(false);
    setCurrentPage(1);
  };

  if (isLoading) return <p role="status">Đang tải danh sách đơn giao hàng...</p>;
  if (error) {
    return <p role="alert">Không tải được danh sách đơn giao hàng: {error}</p>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-bold text-gray-900">
        Dự đoán thời gian giao hàng
      </h1>

      <section
        role="status"
        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 border-l-4 border-l-red-700 bg-white px-4 py-3"
      >
        <p className="text-sm font-semibold text-red-800">
          CẢNH BÁO VẬN HÀNH: {overdueCount} đơn trễ hạn - {notCalledCount} đơn
          chưa gọi
          <span className="font-normal text-gray-500">
            {" "}
            - Cần kiểm tra &amp; chuyển Telesale
          </span>
        </p>
        <Button
          type="button"
          size="sm"
          variant={urgentOnly ? "secondary" : "default"}
          aria-pressed={urgentOnly}
          onClick={() => {
            setUrgentOnly((showUrgent) => !showUrgent);
            setCurrentPage(1);
          }}
        >
          {urgentOnly ? "Hiển thị tất cả đơn" : "Xem đơn cần xử lý gấp"}
        </Button>
      </section>

      <Filter className="items-start" onReset={resetFilters}>
        <div className="flex w-full flex-wrap items-end gap-3">
          <SearchInput
            aria-label="Tìm kiếm đơn giao hàng"
            placeholder="Tìm mã đơn, khách hàng, sản phẩm..."
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              setCurrentPage(1);
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAdvanceSearchOpen((isOpen) => !isOpen)}
            aria-expanded={isAdvanceSearchOpen}
          >
            {isAdvanceSearchOpen ? "Ẩn bộ lọc" : "Lọc nâng cao"}
          </Button>
        </div>
        {isAdvanceSearchOpen && (
          <div className="flex w-full flex-wrap gap-3">
            <SelectOption
              title="Trạm"
              placeholder="Tất cả trạm"
              option={stations}
              isFilter
              value={stationFilter}
              onChange={(event) => {
                setStationFilter(event.target.value);
                setCurrentPage(1);
              }}
            />
            <SelectOption
              title="Đơn vị vận chuyển"
              placeholder="Tất cả đơn vị"
              option={carriers}
              isFilter
              value={carrierFilter}
              onChange={(event) => {
                setCarrierFilter(event.target.value);
                setCurrentPage(1);
              }}
            />
            <SelectOption
              title="Trạng thái"
              placeholder="Tất cả trạng thái"
              option={orderStatuses}
              isFilter
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </Filter>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
            Bản đồ các trạm trung gian (HUB) - Mô hình dự đoán
          </h2>
          <div className="flex min-h-64 min-w-max items-center justify-around gap-2 overflow-x-auto p-4">
            {stationStats.map(({ station, orderCount, overdueCount: lateCount }) => (
              <Button
                key={station}
                type="button"
                variant={station === selectedStation ? "secondary" : "outline"}
                aria-pressed={station === selectedStation}
                className="h-auto min-h-20 min-w-28 flex-col whitespace-normal px-3 py-3 text-center text-xs"
                onClick={() => setActiveStation(station)}
              >
                <span className="font-semibold">{station}</span>
                <span className="font-normal">
                  {orderCount} đơn{lateCount > 0 ? ` - ${lateCount} trễ` : ""}
                </span>
              </Button>
            ))}
            {stationStats.length === 0 && (
              <p className="text-sm text-gray-500">Chưa có dữ liệu trạm.</p>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
            Chi tiết: {selectedStation || "Chưa có trạm"} ({ordersAtStation.length}{" "}
            đơn)
          </h2>
          <div className="space-y-3 p-3">
            {ordersAtStation.map((order) => (
              <Button
                key={order.orderCode}
                type="button"
                variant="outline"
                className="h-auto w-full flex-col items-start whitespace-normal bg-gray-50 px-3 py-4 text-left text-xs font-normal hover:bg-gray-100"
                onClick={() => setSelectedOrder(order)}
              >
                <span className="font-medium">
                  {order.orderCode} - {order.product}
                </span>
                <span>
                  {order.customerName} | ETA: {order.eta} | Khung gọi:{" "}
                  {order.timeCall}
                </span>
                <span className="font-semibold">{order.callStatus}</span>
              </Button>
            ))}
            {ordersAtStation.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                Không có đơn tại trạm này.
              </p>
            )}
          </div>
        </section>
      </div>

      <Table
        title="Danh sách đơn đang giao"
        columns={columns}
        records={currentData}
        rowKey="orderCode"
        emptyMessage="Không tìm thấy đơn giao hàng phù hợp"
        tableClassName="min-w-max"
        pagination={{
          page: currentPage,
          pageSize,
          totalPages,
          totalRecords: filteredOrders.length,
          onPageChange: setCurrentPage,
        }}
      />

      {selectedOrder && (
        <DeliveryOderModal
          order={selectedOrder}
          callStatusOptions={callStatuses}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </section>
  );
};

export default DeliveryDate;
