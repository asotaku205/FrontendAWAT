import { Button } from "../../components/Button";
import type { BusinessForecastData } from "../../services/types";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";
import {
  ChannelRevenueChart,
  OrderResultsChart,
  RevenueTrendChart,
} from "./components/ForecastCharts";

type TabOverviewProps = {
  data: BusinessForecastData["overview"];
  onTodoAction: (action: string) => void;
};

const TabOverview = ({ data, onTodoAction }: TabOverviewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {data.kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Doanh thu đơn hàng 14 ngày gần nhất" className="col-span-2">
          <RevenueTrendChart data={data.revenueTrend} />
        </Panel>
        <Panel title="Những việc cần làm">
          <div className="space-y-3">
            {data.todos.map((t) => (
              <div key={t.rank} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
                  {t.rank}
                </span>
                <span className="flex-1 text-gray-700">{t.text}</span>

                <Button
                  className="min-w-40"
                  size="xs"
                  onClick={() => onTodoAction(t.action)}
                >
                  {t.action}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Doanh thu theo kênh">
          <ChannelRevenueChart data={data.channelRevenue} />
        </Panel>

        <Panel title="Hiệu quả đơn hàng">
          <OrderResultsChart data={data.orderResults} />
        </Panel>

        <Panel title="Sản phẩm nổi bật">
          <div className="space-y-2.5">
            {data.featuredProducts.map((p) => (
              <div
                key={p.code}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    <span className="mr-1 text-xs text-gray-400">{p.code}</span>
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">{p.revenue}</div>
                </div>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  +{p.growth}%
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default TabOverview;
