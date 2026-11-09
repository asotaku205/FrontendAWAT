import { useState } from "react";
import { Button } from "../../components/Button";
import type { TableColumn } from "../../components/Table";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import usePagination from "../../hooks/use-pagination";
import type { BusinessForecastData } from "../../services/types";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
import { ForecastComparisonChart } from "./components/ForecastCharts";

type Decision = "Đã duyệt" | "Đã từ chối";
type DecisionInfo = { decision: Decision; note: string };

const TabForecast = ({
  data,
}: {
  data: BusinessForecastData["forecast"];
}) => {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof data.productsToPrepare)[number] | null
  >(null);
  const [isRisksModalOpen, setIsRisksModalOpen] = useState(false);
  const [riskNotes, setRiskNotes] = useState<Record<string, string>>({});
  const [riskDecisions, setRiskDecisions] = useState<Record<string, DecisionInfo>>({});
  const [productNotes, setProductNotes] = useState<Record<string, string>>({});
  const [productDecisions, setProductDecisions] = useState<Record<string, DecisionInfo>>({});
  const [riskToConfirm, setRiskToConfirm] = useState<{ risk: string; decision: Decision } | null>(null);
  const [productDecisionToConfirm, setProductDecisionToConfirm] = useState<Decision | null>(null);

  const confirmProductDecision = () => {
    if (!selectedProduct || !productDecisionToConfirm) return;
    setProductDecisions((current) => ({
      ...current,
      [selectedProduct.code]: {
        decision: productDecisionToConfirm,
        note: productNotes[selectedProduct.code].trim(),
      },
    }));
    setProductDecisionToConfirm(null);
  };

  const confirmRiskDecision = () => {
    if (!riskToConfirm) return;
    setRiskDecisions((current) => ({
      ...current,
      [riskToConfirm.risk]: {
        decision: riskToConfirm.decision,
        note: riskNotes[riskToConfirm.risk].trim(),
      },
    }));
    setRiskToConfirm(null);
  };

  const forecastColumns: TableColumn<
    (typeof data.productsToPrepare)[number]
  >[] = [
    { key: "code", title: "Mã SP" },
    { key: "name", title: "Sản phẩm" },
    { key: "demand", title: "Nhu cầu 14 ngày" },
    { key: "stock", title: "Tồn hiện tại" },
    { key: "daysLeft", title: "Đủ bán" },
    {
      key: "action",
      title: "Hành động",
      render: (product) => (
        <Button
          className={"min-w-40"}
          size="xs"
          variant={"outline"}
          onClick={() => setSelectedProduct(product)}
        >
          {product.action}
        </Button>
      ),
    },
  ];
  const { currentData, totalPages, currentPage, setCurrentPage } =
    usePagination({
      data: data.productsToPrepare,
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
        <Panel title="Doanh thu: thực tế so với dự báo" className="col-span-2">
          <div className="mb-2 text-xs text-gray-500">Đơn vị: triệu đồng</div>
          <ForecastComparisonChart data={data.revenueTrend} />
        </Panel>

        {/* Kịch bản dự báo */}
        <Panel title="Kịch bản dự báo">
          <div className="space-y-3">
            {data.scenarioData.map((s) => (
              <div
                key={s.name}
                className="rounded-lg border border-gray-200 p-3"
              >
                <div className="text-xs text-gray-500">{s.name}</div>
                <div className="mt-0.5 flex items-baseline justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {s.value}
                  </span>
                  <span className={`text-sm font-semibold ${s.changeClass}`}>
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Sản phẩm cần chuẩn bị */}
        <Panel title="Sản phẩm cần chuẩn bị" className="col-span-2 ">
          <Table
            columns={forecastColumns}
            records={currentData}
            rowKey="code"
            pagination={{
              page: currentPage,
              pageSize: 4,
              totalPages,
              totalRecords: currentData.length,
              onPageChange: setCurrentPage,
            }}
          />
        </Panel>

        {/* Rủi ro tuần tới */}
        <Panel title="Rủi ro tuần tới">
          <div className="space-y-2.5">
            {data.weeklyRisks.map((r) => (
              <div key={r} className="flex items-start gap-2 text-sm p-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">
                  !
                </span>
                <span className="text-gray-700">{r}</span>
              </div>
            ))}
          </div>
          <Button
            className="my-6 mx-2"
            onClick={() => setIsRisksModalOpen(true)}
          >
            Xem hành động đề xuất
          </Button>
        </Panel>
      </div>

      <Modal
        title={
          selectedProduct
            ? `Đề xuất cho ${selectedProduct.name}`
            : "Đề xuất sản phẩm"
        }
        description={selectedProduct?.code}
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Nhu cầu 14 ngày</div>
                <div className="mt-1 font-semibold text-gray-900">
                  {selectedProduct.demand}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Tồn hiện tại</div>
                <div className="mt-1 font-semibold text-gray-900">
                  {selectedProduct.stock}
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="text-xs text-gray-500">Số ngày đủ bán</div>
                <div className="mt-1 font-semibold text-gray-900">
                  {selectedProduct.daysLeft}
                </div>
              </div>
              <div className="rounded-lg bg-red-50 p-3">
                <div className="text-xs text-red-600">Hành động đề xuất</div>
                <div className="mt-1 font-semibold text-red-700">
                  {selectedProduct.action}
                </div>
              </div>
            </div>
            {productDecisions[selectedProduct.code] && (
              <div className="rounded-lg bg-gray-50 p-3 text-sm">
                <div className="font-semibold text-gray-800">
                  Trạng thái:{" "}
                  {productDecisions[selectedProduct.code].decision}
                </div>
                <div className="mt-1 text-gray-600">
                  Lý do đã lưu:{" "}
                  {productDecisions[selectedProduct.code].note}
                </div>
              </div>
            )}
            <label className="block text-xs text-gray-600">
              Ghi chú lý do duyệt hoặc từ chối
              <textarea
                value={productNotes[selectedProduct.code] ?? ""}
                onChange={(event) =>
                  setProductNotes((current) => ({
                    ...current,
                    [selectedProduct.code]: event.target.value,
                  }))
                }
                placeholder="Nhập lý do và thông tin cần theo dõi..."
                rows={2}
                className="mt-1 w-full resize-y rounded border border-gray-300 px-3 py-2 text-sm text-gray-700"
              />
            </label>
            <p className="text-sm text-gray-600">
              Đây là đề xuất dựa trên dữ liệu dự báo hiện có. Chưa có thao tác
              nhập hàng nào được thực hiện.
            </p>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedProduct(null)}
              >
                Đóng
              </Button>
              <Button
                disabled={!productNotes[selectedProduct.code]?.trim()}
                onClick={() => setProductDecisionToConfirm("Đã duyệt")}
              >
                Duyệt
              </Button>
              <Button
                variant="destructive"
                disabled={!productNotes[selectedProduct.code]?.trim()}
                onClick={() => setProductDecisionToConfirm("Đã từ chối")}
              >
                Từ chối
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Hành động đề xuất cho tuần tới"
        description="Các rủi ro cần theo dõi theo dự báo hiện tại."
        open={isRisksModalOpen}
        onClose={() => setIsRisksModalOpen(false)}
        className="max-w-3xl max-h-[90vh] flex flex-col"
        contentClassName="min-h-0 overflow-y-auto p-5"
      >
        <div className="space-y-3">
          {data.weeklyRisks.map((risk) => (
            <div
              key={risk}
              className="flex items-start gap-2 rounded-lg border border-gray-200 p-3 text-sm"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">
                !
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="min-w-0 break-words font-medium text-gray-800">
                    {risk}
                  </div>
                  {riskDecisions[risk] && (
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-semibold ${
                        riskDecisions[risk].decision === "Đã duyệt"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {riskDecisions[risk].decision}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Theo dõi nhu cầu, nguồn cung và tỷ lệ hoàn để chuẩn bị phương
                  án phù hợp.
                </div>
                {riskDecisions[risk] && (
                  <p className="mt-2 text-xs text-gray-600">
                    Lý do đã lưu: {riskDecisions[risk].note}
                  </p>
                )}
                <label className="mt-3 block text-xs text-gray-600">
                  Ghi chú lý do duyệt hoặc từ chối
                  <textarea
                    value={riskNotes[risk] ?? ""}
                    onChange={(event) =>
                      setRiskNotes((current) => ({
                        ...current,
                        [risk]: event.target.value,
                      }))
                    }
                    placeholder="Nhập lý do và thông tin cần theo dõi..."
                    rows={2}
                    className="mt-1 w-full resize-y rounded border border-gray-300 px-3 py-2 text-sm text-gray-700"
                  />
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    size="xs"
                    disabled={!riskNotes[risk]?.trim()}
                    onClick={() => setRiskToConfirm({ risk, decision: "Đã duyệt" })}
                  >
                    Duyệt
                  </Button>
                  <Button
                    size="xs"
                    variant="destructive"
                    disabled={!riskNotes[risk]?.trim()}
                    onClick={() => setRiskToConfirm({ risk, decision: "Đã từ chối" })}
                  >
                    Từ chối
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-1">
            <Button
              variant="outline"
              onClick={() => setIsRisksModalOpen(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title={productDecisionToConfirm === "Đã duyệt" ? "Xác nhận duyệt sản phẩm" : "Xác nhận từ chối sản phẩm"}
        open={productDecisionToConfirm !== null}
        onClose={() => setProductDecisionToConfirm(null)}
      >
        {selectedProduct && productDecisionToConfirm && (
          <div>
            <p className="text-sm text-gray-700">
              Xác nhận {productDecisionToConfirm.toLowerCase()} đề xuất cho sản phẩm <strong>{selectedProduct.name}</strong>?
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <div className="mb-1 text-xs font-semibold text-gray-500">Lý do / ghi chú</div>
              {productNotes[selectedProduct.code]?.trim()}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setProductDecisionToConfirm(null)}>Quay lại</Button>
              <Button
                variant={productDecisionToConfirm === "Đã từ chối" ? "destructive" : "default"}
                onClick={confirmProductDecision}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title={riskToConfirm?.decision === "Đã duyệt" ? "Xác nhận duyệt rủi ro" : "Xác nhận từ chối rủi ro"}
        open={riskToConfirm !== null}
        onClose={() => setRiskToConfirm(null)}
      >
        {riskToConfirm && (
          <div>
            <p className="text-sm text-gray-700">
              Xác nhận {riskToConfirm.decision.toLowerCase()} đề xuất xử lý rủi ro <strong>{riskToConfirm.risk}</strong>?
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <div className="mb-1 text-xs font-semibold text-gray-500">Lý do / ghi chú</div>
              {riskNotes[riskToConfirm.risk]?.trim()}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setRiskToConfirm(null)}>Quay lại</Button>
              <Button
                variant={riskToConfirm.decision === "Đã từ chối" ? "destructive" : "default"}
                onClick={confirmRiskDecision}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TabForecast;
