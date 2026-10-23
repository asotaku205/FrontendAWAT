import { Button } from "../../components/ui/button";
import {
  channelRevenue,
  featuredProducts,
  kpis,
  orderResults,
  todayTodos,
} from "../../mock/ForecastData";
import KpiCard from "./components/KpiCard";
import Panel from "./components/Panel";

const TabOverview = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-3">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} sub={k.sub} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Doanh thu đơn hàng 14 ngày gần nhất" className="col-span-2">
          <div className="mb-3 text-sm font-semibold text-gray-900"></div>
          <div className="flex items-center h-80 justify-center rounded-lg border-2 border-gray-300 bg-gray-50 px-4 text-center text-sm text-gray-400">
            Biểu đồ
          </div>
        </Panel>
          <Panel title="Những việc cần làm" >
            <div className="space-y-3">
              {todayTodos.map((t) => (
                <div key={t.rank} className="flex items-center gap-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
                    {t.rank}
                  </span>
                  <span className="flex-1 text-gray-700">{t.text}</span>

                  <Button
                    key={t.rank}
                    className="min-w-40"
                    size="xs"
                  >
                    {t.action}
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
        
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Panel title="Doanh thu theo kênh" >
          
          <div className="space-y-3">
            {channelRevenue.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-700">{c.name}</span>
                  <span className="font-semibold text-gray-900">
                    {c.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

         <Panel title="Hiệu quả đơn hàng" >
          <div className="space-y-3">
            {orderResults.map((o) => (
              <div key={o.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-700">{o.label}</span>
                  <span className="font-semibold text-gray-900">{o.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Sản phẩm nổi bật">
         
          <div className="space-y-2.5">
            {featuredProducts.map((p) => (
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
