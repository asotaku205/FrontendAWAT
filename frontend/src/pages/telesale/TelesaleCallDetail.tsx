import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import Card from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import useApiData from "../../hooks/useApiData";
import { API_ENDPOINTS } from "../../services/api";
import type { TelesaleCallRecord } from "../../services/types";

const timeOf = (value?: string | null) => value?.split(" ")[1] ?? "—";

const TelesaleCallDetail = () => {
  const { orderCode = "" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedEmployeeName = searchParams.get("employeeName") ?? "";
  const endpoint = requestedEmployeeName
    ? `${API_ENDPOINTS.telesaleCalls}?${new URLSearchParams({ employeeName: requestedEmployeeName })}`
    : API_ENDPOINTS.telesaleCalls;
  const { data: calls, error, isLoading } = useApiData<TelesaleCallRecord[]>(endpoint);
  const call = useMemo(
    () => calls?.find((item) => item.orderCode === orderCode),
    [calls, orderCode],
  );

  if (isLoading) return <p role="status">Đang tải chi tiết cuộc gọi...</p>;
  if (error) return <p role="alert">Không tải được chi tiết cuộc gọi: {error}</p>;
  if (!call) return <p role="alert">Không tìm thấy cuộc gọi {orderCode}.</p>;

  const employeeName = call.employeeName;

  return (
    <section className="flex min-w-0 flex-col gap-4">
      <div className="grid gap-2 lg:grid-cols-[minmax(0,4fr)_minmax(150px,1fr)]">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Được phân lúc", timeOf(call.assignedAt)],
            ["Bắt đầu gọi", timeOf(call.startedAt)],
            ["Kết thúc gọi", timeOf(call.endedAt)],
            ["Thời lượng gọi", `${Math.floor(call.durationSeconds / 60)}p${String(call.durationSeconds % 60).padStart(2, "0")}`],
          ].map(([label, value]) => (
            <Card key={label} title={label} description={value} />
          ))}
        </div>
        <div className={`self-center rounded-md border px-3 py-2 text-center text-sm font-medium ${call.result === "Thành công" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          Kết quả: {call.result}
        </div>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.8fr)]">
        <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h1 className="mb-3 border-b border-gray-200 pb-2 text-base font-semibold text-gray-900">
            Thông tin cuộc gọi
          </h1>
          <dl className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
            <dt className="text-gray-500">Mã đơn</dt><dd className="font-semibold text-gray-900">{call.orderCode}</dd>
            <dt className="text-gray-500">Waybill</dt><dd>{call.waybill}</dd>
            <dt className="text-gray-500">Khách hàng</dt><dd>{call.customerName ?? "—"}</dd>
            <dt className="text-gray-500">SĐT</dt><dd>{call.phoneNumber ?? "—"}</dd>
            <dt className="text-gray-500">Dự kiến giao</dt><dd>{call.expectedDelivery ?? "—"}</dd>
            <dt className="text-gray-500">Nhân viên CSKH</dt><dd>{employeeName}</dd>
          </dl>
          <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
            <p className="font-semibold text-gray-900">Kết quả cuộc gọi</p>
            <p className={`mt-2 ${call.result === "Thành công" ? "text-green-700" : "text-red-700"}`}>
              {call.result} · {call.resultNote ?? "—"}
            </p>
            <p className="mt-2 text-gray-500">
              Ghi chú: {call.resultNote ?? "—"}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/telesale/work")}
            >Mở công việc</Button>
            {call.phoneNumber && (
              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={`tel:${call.phoneNumber.replace(/\s/g, "")}`} />}
              >
                Gọi khách hàng
              </Button>
            )}
          </div>
        </section>

        <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 border-b border-gray-200 pb-2 text-base font-semibold text-gray-900">
            Timeline xử lý
          </h2>
          <ol className="space-y-4">
            {(call.timeline ?? []).map((item, index) => (
              <li key={`${item.time}-${item.title}`} className="grid grid-cols-[20px_56px_1fr] gap-2 text-xs">
                <span className="flex size-5 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-700">✓</span>
                <time className="text-gray-600">{item.time}</time>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-gray-500">{item.detail}</p>
                </div>
                {index < (call.timeline?.length ?? 0) - 1 && <span className="col-start-1 ml-[9px] h-4 border-l border-gray-200" />}
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            Tổng thời gian xử lý cuộc gọi: {Math.floor((call.durationSeconds + call.afterCallSeconds) / 60)}p{String((call.durationSeconds + call.afterCallSeconds) % 60).padStart(2, "0")} · TG gọi: {Math.floor(call.durationSeconds / 60)}p{String(call.durationSeconds % 60).padStart(2, "0")} · Sau gọi: {call.afterCallSeconds}s
          </div>
        </section>
      </div>
    </section>
  );
};

export default TelesaleCallDetail;
