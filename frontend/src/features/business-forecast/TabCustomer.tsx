import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import type { TableColumn } from "../../components/Table";
import Table from "../../components/Table";
import usePagination from "../../hooks/use-pagination";
import type { BusinessForecastData } from "../../services/types";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
import { CustomerTrendChart, ReturnReasonsChart } from "./components/ForecastCharts";

const TabCustomer = ({
  data,
}: {
  data: BusinessForecastData["customer"];
}) => {
  const navigate = useNavigate();
  const [customerStatuses, setCustomerStatuses] = useState<Record<string, string>>({});

  const sendToTelesale = (customer: (typeof data.watchList)[number]) => {
    const [customerName, phoneNumber = ""] = customer.name.split(" - ");

    navigate("/telesale/dashboard", {
      state: {
        priorityCustomer: {
          code: `KH-${phoneNumber.replace(/\D/g, "") || customer.name}`,
          customer: customerName,
          phone: phoneNumber,
          eta: "—",
          suggestion: customer.suggestion,
          reason: `Khách hàng rủi ro, tỷ lệ hoàn ${customer.returnRate}`,
          status: "Ưu tiên từ Dự đoán kinh doanh",
        },
      },
    });
  };

  const customerColumns: TableColumn<(typeof data.watchList)[number]>[] = [
    { key: "name", title: "Khách hàng / SĐT" },
    { key: "group", title: "Nhóm" },
    { key: "orders", title: "Số đơn" },
    { key: "avgValue", title: "Giá trị TB" },
    { key: "returnRate", title: "Tỷ lệ hoàn" },
    { key: "suggestion", title: "Gợi ý xử lý" },
    {
      key: "action",
      title: "Trạng thái",
      render: (customer) => (
        <select
          value={customerStatuses[customer.name] ?? "Chưa theo dõi"}
          onChange={(event) =>
            setCustomerStatuses((current) => ({
              ...current,
              [customer.name]: event.target.value,
            }))
          }
          className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700"
          aria-label={`Trạng thái theo dõi ${customer.name}`}
        >
          <option>Chưa theo dõi</option>
          <option>Đang theo dõi</option>
          <option>Đã xử lý</option>
        </select>
      ),
    },
    {
      key: "name",
      id: "priorityAction",
      title: "Ưu tiên Telesale",
      render: (customer) => customer.group === "Rủi ro" ? (
        <Button size="xs" onClick={() => sendToTelesale(customer)}>
          Đẩy Telesale ưu tiên
        </Button>
      ) : <span className="text-xs text-gray-400">—</span>,
    },
  ];
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: data.watchList,
      pageSize: 4,
    });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {data.kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Xu hướng khách hàng 14 ngày" className="col-span-2 ">
          <CustomerTrendChart data={data.trendData} />
        </Panel>

        <Panel title="Nhóm khách cần theo dõi">
          <div className="space-y-3">
            {data.actions.map((c) => (
              <div
                key={c.text}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <div className="text-gray-700">{c.text}</div>
                  <div className="text-xs text-gray-500">{c.count} khách</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Khách hàng cần chú ý" className="col-span-2">
          <Table
            columns={customerColumns}
            records={currentData}
            rowKey="name"
            pagination={{
              page: currentPage,
              pageSize: 4,
              totalPages,
              totalRecords: data.watchList.length,
              onPageChange: setCurrentPage,
            }}
          />
        </Panel>

        <Panel title="Lý do hoàn phổ biến">
          <ReturnReasonsChart data={data.returnReasons} />
        </Panel>
      </div>

    </div>
  );
};

export default TabCustomer;
