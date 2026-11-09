import { useState } from "react";
import { Button } from "../../../components/Button";
import type { TableColumn } from "../../../components/Table";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import usePagination from "../../../hooks/use-pagination";
import type { BusinessForecastData } from "../../../services/types";
import KpiCard from "./KpiCard";
import Panel from "./Panel";
import { StockCoverageChart } from "./ForecastCharts";

const TabStock = ({
  data,
}: {
  data: BusinessForecastData["stock"];
}) => {
  const [selectedStockCode, setSelectedStockCode] = useState<string | null>(null);
  const [urgentNote, setUrgentNote] = useState("");
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isProposalConfirmOpen, setIsProposalConfirmOpen] = useState(false);
  const [isIncomingOpen, setIsIncomingOpen] = useState(false);
  const [proposalProductCode, setProposalProductCode] = useState("");
  const [proposalQuantity, setProposalQuantity] = useState("");
  const [proposalNote, setProposalNote] = useState("");
  const [proposalCreated, setProposalCreated] = useState(false);

  const selectedStock = data.inventoryData.find(
    (product) => product.code === selectedStockCode,
  );

  const openProposal = (productCode = "") => {
    setProposalProductCode(productCode || data.inventoryData[0]?.code || "");
    setProposalQuantity("");
    setProposalNote("");
    setProposalCreated(false);
    setIsProposalOpen(true);
  };

  const confirmProposal = () => {
    setProposalCreated(true);
    setIsProposalConfirmOpen(false);
    setIsProposalOpen(false);
  };

  const stockColumns: TableColumn<(typeof data.inventoryData)[number]>[] = [
    { key: "code", title: "Mã SP" },
    { key: "name", title: "Sản phẩm" },
    { key: "stock", title: "Tồn" },
    { key: "sold7d", title: "Đơn bán được/tuần" },
    { key: "forecast14d", title: "Dự báo trong 14 ngày" },
    { key: "daysLeft", title: "Đủ hàng" },
    { key: "status", title: "Trạng thái" },
    {
      key: "action",
      title: "Hành động",
      render: (o) => (
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            setSelectedStockCode(o.code);
            setUrgentNote("");
          }}
        >
          {o.action}
        </Button>
      ),
    },
  ];
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: data.inventoryData,
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
        <Panel title="Số ngày đủ hàng theo nhóm" className="col-span-2 ">
          <div className="mb-3 text-xs text-gray-500">Mức an toàn: 14 ngày</div>
          <StockCoverageChart data={data.coverageData} />
        </Panel>

        {/* Cần xử lý ngay */}
        <Panel title="Cần xử lý ngay">
          <div className="space-y-3">
            {data.urgentStock.map((u) => (
              <div
                key={u.code}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <div className="font-medium text-gray-800">{u.code}</div>
                  <div className="text-xs text-gray-500">{u.note}</div>
                </div>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    setSelectedStockCode(u.code);
                    setUrgentNote(u.note);
                  }}
                >
                  {u.action}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Danh sách tồn kho */}
      <Panel title="Danh sách tồn kho">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900"></div>
          <div className="flex gap-2">
            <Button onClick={() => openProposal()}>Tạo đề xuất nhập hàng</Button>
            <Button variant="outline" onClick={() => setIsIncomingOpen(true)}>
              Xem hàng đang về
            </Button>
          </div>
        </div>
         <Table
          columns={stockColumns}
          records={currentData}
          rowKey="code"
          pagination={{
            page: currentPage,
            pageSize: 4,
            totalPages,
            totalRecords: data.inventoryData.length,
            onPageChange: setCurrentPage,
          }}
        />
      </Panel>

      <Modal
        title={selectedStock ? `Chi tiết tồn kho: ${selectedStock.name}` : `Chi tiết tồn kho: ${selectedStockCode ?? ""}`}
        open={selectedStockCode !== null}
        onClose={() => setSelectedStockCode(null)}
      >
        <div className="space-y-4">
          {urgentNote && (
            <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
              Cần chú ý: {urgentNote}
            </div>
          )}
          {selectedStock ? (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Tồn hiện tại</div>
                <div className="mt-1 font-semibold">{selectedStock.stock}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Dự báo 14 ngày</div>
                <div className="mt-1 font-semibold">{selectedStock.forecast14d}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Số ngày đủ hàng</div>
                <div className="mt-1 font-semibold">{selectedStock.daysLeft}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Trạng thái</div>
                <div className="mt-1 font-semibold">{selectedStock.status}</div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Chưa có số liệu tồn kho chi tiết cho mã sản phẩm này.
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedStockCode(null)}>Đóng</Button>
            <Button
              onClick={() => {
                setSelectedStockCode(null);
                openProposal(selectedStockCode ?? "");
              }}
            >
              Tạo đề xuất nhập
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Tạo đề xuất nhập hàng"
        open={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
      >
        <div className="space-y-4">
          <label className="block text-sm text-gray-700">
            Sản phẩm
            <select
              value={proposalProductCode}
              onChange={(event) => setProposalProductCode(event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2"
            >
              {!data.inventoryData.some((product) => product.code === proposalProductCode) && proposalProductCode && (
                <option value={proposalProductCode}>{proposalProductCode}</option>
              )}
              {data.inventoryData.map((product) => (
                <option key={product.code} value={product.code}>{product.code} - {product.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-gray-700">
            Số lượng đề xuất
            <input
              type="number"
              min="1"
              value={proposalQuantity}
              onChange={(event) => setProposalQuantity(event.target.value)}
              placeholder="Nhập số lượng"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm text-gray-700">
            Ghi chú
            <textarea
              value={proposalNote}
              onChange={(event) => setProposalNote(event.target.value)}
              rows={2}
              placeholder="Lý do hoặc thông tin cần lưu ý"
              className="mt-1 w-full resize-y rounded border border-gray-300 px-3 py-2"
            />
          </label>
          {proposalCreated && (
            <p className="text-sm text-green-700">Đề xuất trước đó đã được ghi nhận trên giao diện.</p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsProposalOpen(false)}>Hủy</Button>
            <Button
              disabled={!proposalProductCode || Number(proposalQuantity) < 1}
              onClick={() => setIsProposalConfirmOpen(true)}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Xác nhận đề xuất nhập hàng"
        open={isProposalConfirmOpen}
        onClose={() => setIsProposalConfirmOpen(false)}
      >
        <div>
          <p className="text-sm text-gray-700">
            Xác nhận đề xuất nhập <strong>{proposalQuantity}</strong> sản phẩm <strong>{proposalProductCode}</strong>?
          </p>
          {proposalNote.trim() && (
            <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              Ghi chú: {proposalNote.trim()}
            </p>
          )}
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsProposalConfirmOpen(false)}>Quay lại</Button>
            <Button onClick={confirmProposal}>Xác nhận</Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Hàng đang về"
        description="Tóm tắt theo dữ liệu tồn kho mẫu."
        open={isIncomingOpen}
        onClose={() => setIsIncomingOpen(false)}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Tổng sản phẩm đang về</div>
              <div className="mt-1 text-lg font-bold text-gray-900">{data.incomingSummary.productCount}</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Số lô hàng</div>
              <div className="mt-1 text-lg font-bold text-gray-900">{data.incomingSummary.lotCount}</div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Dữ liệu mẫu hiện chưa có thông tin chi tiết từng lô hàng.
          </p>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsIncomingOpen(false)}>Đóng</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TabStock;
