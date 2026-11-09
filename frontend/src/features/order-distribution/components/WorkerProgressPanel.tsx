import { Button } from "../../../components/Button";
import useApiData from "../../../hooks/use-api-data";
import { API_ENDPOINTS } from "../../../services/api";
import type { WorkerProgress } from "../../../services/types";
import { Panel } from "./ProcessTabPanels";

const WorkerProgressPanel = ({
  refreshKey,
  onReportAbsence,
  onPrintOrder,
  onViewAll,
}: {
  refreshKey: number;
  onReportAbsence: (employeeName: string) => void;
  onPrintOrder: () => void;
  onViewAll: () => void;
}) => {
  const { data: workers, error, isLoading } = useApiData<WorkerProgress[]>(
    `${API_ENDPOINTS.orderDistribution.workers}?refresh=${refreshKey}`,
  );

  return (
    <Panel
      title="Đang đóng gói"
      action={
        <Button variant="outline" type="button" onClick={onViewAll}>
          Xem tất cả
        </Button>
      }
    >
      {isLoading && <p role="status">Đang tải tiến độ nhân viên...</p>}
      {error && <p role="alert">Không tải được tiến độ nhân viên: {error}</p>}
      {workers?.map((worker) => (
        <div key={worker.id} className="rounded-lg border border-border bg-white p-4 text-xs">
          <div className="flex justify-between gap-2">
            <p className="font-medium">
              {worker.name} ({worker.id})
            </p>
            {worker.canReportAbsence && (
              <Button
                size="sm"
                className="rounded-xl px-2"
                onClick={() => onReportAbsence(worker.name)}
              >
                Báo nghỉ
              </Button>
            )}
          </div>
          <p className="mt-2">
            {worker.block
              ? `Block: ${worker.block} phiếu | Đã xong: ${worker.completed}`
              : `Đã hoàn thành ${worker.completed} đơn trong ca`}
          </p>
          <p className="mt-1">Tiến độ: {worker.progress}%</p>
          {worker.action ? (
            <Button
              type="button"
              className="mt-2 bg-red-700 text-white hover:bg-red-800"
              onClick={onPrintOrder}
            >
              {worker.action}
            </Button>
          ) : (
            <p className="mt-2 text-gray-500">{worker.note}</p>
          )}
        </div>
      ))}
    </Panel>
  );
};

export default WorkerProgressPanel;
