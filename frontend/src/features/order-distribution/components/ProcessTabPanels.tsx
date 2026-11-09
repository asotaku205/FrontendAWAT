import type { ReactNode } from "react";
import { Button } from "../../../components/Button";
import useApiData from "../../../hooks/use-api-data";
import { API_ENDPOINTS } from "../../../services/api";
import type { ExceptionOrder, ReadyOrdersSummary } from "../../../services/types";

export const Panel = ({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section>
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold">
      <span>{title}</span>
      {action}
    </div>
    <div className="mt-2 space-y-3">{children}</div>
  </section>
);

export const ExceptionOrders = ({
  refreshKey,
  onReassign,
}: {
  refreshKey: number;
  onReassign: (exception: ExceptionOrder) => void;
}) => {
  const { data: exceptions, error, isLoading } = useApiData<ExceptionOrder[]>(
    `${API_ENDPOINTS.orderDistribution.exceptions}?refresh=${refreshKey}`,
  );
  const exceptionCount =
    exceptions?.reduce((total, exception) => total + exception.quantity, 0) ?? 0;

  return (
    <Panel title={`Chờ phân công (${exceptionCount} ngoại lệ)`}>
      {isLoading && <p role="status">Đang tải đơn ngoại lệ...</p>}
      {error && <p role="alert">Không tải được đơn ngoại lệ: {error}</p>}
      {exceptions?.map((exception) => (
        <div key={exception.code} className="rounded-lg border border-border bg-white p-3 text-xs">
          <p className="font-medium">
            {exception.code} × {exception.quantity}
          </p>
          <p className="mt-2">Vị trí: {exception.position}</p>
          <p className="mt-1 text-gray-600">Lý do: {exception.reason}</p>
          <Button
            type="button"
            className="mt-3 w-full bg-red-700 text-white hover:bg-red-800"
            onClick={() => onReassign(exception)}
          >
            Phân công lại
          </Button>
        </div>
      ))}
    </Panel>
  );
};

export const ReadyOrders = ({ onViewAll }: { onViewAll: () => void }) => {
  const { data: summary, error, isLoading } = useApiData<ReadyOrdersSummary>(
    API_ENDPOINTS.orderDistribution.readyOrders,
  );

  return (
    <Panel title={`Sẵn sàng giao (${summary?.count ?? 0} đơn)`}>
      {isLoading && <p role="status">Đang tải số đơn sẵn sàng giao...</p>}
      {error && <p role="alert">Không tải được số đơn sẵn sàng giao: {error}</p>}
      {summary && (
        <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-border bg-white p-5 text-center text-xs">
          <p className="font-semibold">
            {summary.count} đơn đã hoàn thành đóng gói
          </p>
          <p className="mt-2">Đang chờ bàn giao vận chuyển</p>
          <p className="mt-3">Đợt xuất hàng tiếp theo: {summary.nextDispatch}</p>
          <Button
            type="button"
            className="mt-5 bg-white text-black shadow-xs border-border hover:bg-gray-50"
            onClick={onViewAll}
          >
            Xem chi tiết {summary.count} đơn sẵn sàng giao
          </Button>
        </div>
      )}
    </Panel>
  );
};
