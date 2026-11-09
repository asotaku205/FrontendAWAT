import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  ForecastChannelCostRevenue,
  ForecastChannelRevenue,
  ForecastCustomerTrend,
  ForecastDailyRevenue,
  ForecastHourlyRevenue,
  ForecastOrderResult,
  ForecastRevenueForecastPoint,
  ForecastReturnReason,
  ForecastStockCoverage,
} from "../../../services/types";

const chartColors = {
  red: "#991b1b",
  lightRed: "#fca5a5",
  gray: "#9ca3af",
  grid: "#e5e7eb",
  text: "#6b7280",
};

const tooltipStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "12px",
};

const axisTick = { fill: chartColors.text, fontSize: 11 };

const formatMillion = (value: number) =>
  `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(value)} triệu ₫`;

const formatMillionTick = (value: number) =>
  new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value);

const ChartViewport = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="h-72 min-w-0 w-full" role="img" aria-label={label}>
    {children}
  </div>
);

const EmptyChart = () => (
  <div className="flex h-full items-center justify-center text-sm text-gray-400">
    Chưa có dữ liệu biểu đồ
  </div>
);

export const RevenueTrendChart = ({
  data,
}: {
  data: ForecastDailyRevenue[];
}) => (
  <ChartViewport label="Biểu đồ doanh thu 14 ngày gần nhất">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatMillionTick}
            width={42}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [formatMillion(Number(value)), "Doanh thu"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Doanh thu"
            stroke={chartColors.red}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const HourlyRevenueChart = ({
  data,
}: {
  data: ForecastHourlyRevenue[];
}) => (
  <ChartViewport label="Biểu đồ doanh thu theo giờ hôm nay">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="hour" tick={axisTick} tickLine={false} axisLine={false} minTickGap={12} />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatMillionTick}
            width={42}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [formatMillion(Number(value)), "Doanh thu"]}
          />
          <Bar dataKey="revenue" name="Doanh thu" fill={chartColors.red} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const ForecastComparisonChart = ({
  data,
}: {
  data: ForecastRevenueForecastPoint[];
}) => (
  <ChartViewport label="Biểu đồ so sánh doanh thu thực tế và dự báo">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatMillionTick}
            width={42}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [
              formatMillion(Number(value)),
              name === "actual" ? "Thực tế" : "Dự báo",
            ]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="actual"
            name="Thực tế"
            stroke={chartColors.red}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            name="Dự báo"
            stroke={chartColors.lightRed}
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const ChannelCostRevenueChart = ({
  data,
}: {
  data: ForecastChannelCostRevenue[];
}) => (
  <ChartViewport label="Biểu đồ doanh thu và chi phí theo kênh">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="channel" tick={axisTick} tickLine={false} axisLine={false} />
          <YAxis
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatMillionTick}
            width={42}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [
              formatMillion(Number(value)),
              name === "revenue" ? "Doanh thu" : "Chi phí",
            ]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="revenue" name="Doanh thu" fill={chartColors.red} radius={[4, 4, 0, 0]} />
          <Bar dataKey="cost" name="Chi phí" fill={chartColors.gray} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const StockCoverageChart = ({
  data,
}: {
  data: ForecastStockCoverage[];
}) => (
  <ChartViewport label="Biểu đồ số ngày đủ hàng theo sản phẩm">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 28, bottom: 0, left: 4 }}
        >
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            unit=" ngày"
          />
          <YAxis
            type="category"
            dataKey="product"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [`${value} ngày`, "Đủ hàng"]}
          />
          <ReferenceLine
            x={14}
            stroke={chartColors.red}
            strokeDasharray="5 4"
            label={{ value: "An toàn", position: "insideTopRight", fill: chartColors.red, fontSize: 11 }}
          />
          <Bar dataKey="days" name="Số ngày đủ hàng" fill={chartColors.red} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const CustomerTrendChart = ({
  data,
}: {
  data: ForecastCustomerTrend[];
}) => (
  <ChartViewport label="Biểu đồ khách mới và khách quay lại trong 14 ngày">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis tick={axisTick} tickLine={false} axisLine={false} width={36} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="newCustomers"
            name="Khách mới"
            stroke={chartColors.red}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="returningCustomers"
            name="Quay lại"
            stroke={chartColors.lightRed}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const ChannelRevenueChart = ({
  data,
}: {
  data: ForecastChannelRevenue[];
}) => (
  <ChartViewport label="Biểu đồ tỷ trọng doanh thu theo kênh">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 18, bottom: 0, left: 4 }}
        >
          <XAxis
            type="number"
            domain={[0, 50]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={88}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [`${value}%`, "Tỷ trọng"]}
          />
          <Bar dataKey="percent" name="Tỷ trọng" fill={chartColors.red} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const OrderResultsChart = ({
  data,
}: {
  data: ForecastOrderResult[];
}) => (
  <ChartViewport label="Biểu đồ kết quả đơn hàng">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="48%"
            outerRadius="72%"
            paddingAngle={2}
          >
            {data.map((result) => (
              <Cell key={result.label} fill={result.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);

export const ReturnReasonsChart = ({
  data,
}: {
  data: ForecastReturnReason[];
}) => (
  <ChartViewport label="Biểu đồ các lý do hoàn phổ biến">
    {data.length === 0 ? (
      <EmptyChart />
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 18, bottom: 0, left: 4 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value}%`}
          />
          <YAxis
            type="category"
            dataKey="reason"
            tick={axisTick}
            tickLine={false}
            axisLine={false}
            width={104}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [`${value}%`, "Tỷ lệ"]}
          />
          <Bar dataKey="percent" name="Tỷ lệ" fill={chartColors.lightRed} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </ChartViewport>
);
