import { useState } from "react";
import { Button } from "../../components/Button";
import type { TableColumn } from "../../components/Table";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import usePagination from "../../hooks/use-pagination";
import type { BusinessForecastData } from "../../services/types";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
import { ChannelCostRevenueChart } from "./components/ForecastCharts";
const channelColumns: TableColumn<BusinessForecastData["channel"]["efficiencyData"][number]>[] = [
  { key: "channel", title: "Kênh" },
  { key: "cost", title: "Chi phí" },
  { key: "revenue", title: "Doanh thu" },
  {
    key: "efficiency",
    title: "Hiệu quả",
  },
  {
    key: "returnRate",
    title: "Tỷ lệ hoàn",
  },
  {
    key: "growth",
    title: "Tăng trưởng",
  },
  { key: "suggestion", title: "Đề xuất" },
];
const TabChannel = ({
  data,
}: {
  data: BusinessForecastData["channel"];
}) => {
  type Decision = "Đã duyệt" | "Đã từ chối";

  const [selectedChannel, setSelectedChannel] = useState<
    (typeof data.channelsToOptimize)[number] | null
  >(null);
  const [note, setNote] = useState("");
  const [savedDecisions, setSavedDecisions] = useState<Record<string, { decision: Decision; note: string }>>({});
  const [confirmAction, setConfirmAction] = useState<Decision | null>(null);

  const confirmDecision = () => {
    if (!selectedChannel || !confirmAction) return;
    setSavedDecisions((current) => ({
      ...current,
      [selectedChannel.name]: {
        decision: confirmAction,
        note: note.trim(),
      },
    }));
    setConfirmAction(null);
  };

   const { currentData, totalPages, currentPage, setCurrentPage } =
      usePagination({
        data: data.efficiencyData,
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
        <Panel title="Chi phí doanh thu theo kênh" className="col-span-2 ">
          <div className="mb-2 text-xs text-gray-500">Đơn vị: triệu đồng</div>
          <ChannelCostRevenueChart data={data.chartData} />
        </Panel>

        <Panel title="Kênh cần tối ưu">
          <div className="space-y-3">
            {data.channelsToOptimize.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <div>
                  <div className="font-medium text-gray-800">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.note}</div>
                </div>
                <Button
                  className="min-w-40"
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    setSelectedChannel(c);
                    setNote(savedDecisions[c.name]?.note ?? "");
                  }}
                >
                  {savedDecisions[c.name]?.decision ?? c.action}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Hiệu quả theo kênh">
       <Table
          columns={channelColumns}
          records={currentData}
          rowKey="channel"
          pagination={{
            page: currentPage,
            pageSize: 4,
            totalPages,
            totalRecords: currentData.length,
            onPageChange: setCurrentPage,
          }}
        />
      </Panel>

      <Modal
        title={selectedChannel ? `Đề xuất cho kênh ${selectedChannel.name}` : "Đề xuất tối ưu kênh"}
        open={selectedChannel !== null}
        onClose={() => setSelectedChannel(null)}
      >
        {selectedChannel && (
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xs text-gray-500">Vấn đề / tín hiệu</div>
              <div className="mt-1 text-sm font-medium text-gray-900">{selectedChannel.note}</div>
              <div className="mt-3 text-xs text-gray-500">Đề xuất</div>
              <div className="mt-1 text-sm font-semibold text-red-700">{selectedChannel.action}</div>
            </div>

            {savedDecisions[selectedChannel.name] && (
              <div className="rounded-lg border border-gray-200 p-3 text-sm">
                <div className="font-semibold text-gray-800">
                  Trạng thái: {savedDecisions[selectedChannel.name]?.decision}
                </div>
                <div className="mt-1 text-gray-600">
                  Lý do đã lưu: {savedDecisions[selectedChannel.name]?.note}
                </div>
              </div>
            )}

            <label className="block text-xs text-gray-600">
              Ghi chú lý do duyệt hoặc từ chối
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Nhập lý do và thông tin cần theo dõi..."
                rows={3}
                className="mt-1 w-full resize-y rounded border border-gray-300 px-3 py-2 text-sm text-gray-700"
              />
            </label>

            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedChannel(null)}>Đóng</Button>
              <Button
                disabled={!note.trim()}
                onClick={() => setConfirmAction("Đã duyệt")}
              >
                Duyệt
              </Button>
              <Button
                variant="destructive"
                disabled={!note.trim()}
                onClick={() => setConfirmAction("Đã từ chối")}
              >
                Từ chối
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title={confirmAction === "Đã duyệt" ? "Xác nhận duyệt đề xuất" : "Xác nhận từ chối đề xuất"}
        open={confirmAction !== null}
        onClose={() => setConfirmAction(null)}
      >
        {confirmAction && selectedChannel && (
          <div>
            <p className="text-sm text-gray-700">
              Xác nhận {confirmAction.toLowerCase()} đề xuất cho kênh <strong>{selectedChannel.name}</strong>?
            </p>
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <div className="mb-1 text-xs font-semibold text-gray-500">Lý do / ghi chú</div>
              {note.trim()}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmAction(null)}>Quay lại</Button>
              <Button
                variant={confirmAction === "Đã từ chối" ? "destructive" : "default"}
                onClick={confirmDecision}
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

export default TabChannel;
