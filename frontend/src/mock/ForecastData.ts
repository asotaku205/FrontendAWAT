
import type {
  BusinessForecastData,
  ForecastActivityLog,
  ForecastAlert,
  ForecastAlertDetail,
  ForecastBusinessSignal,
  ForecastChannelEfficiency,
  ForecastChannelOptimization,
  ForecastChannelRevenue,
  ForecastCustomerAction,
  ForecastCustomerToWatch,
  ForecastFeaturedProduct,
  ForecastKpi,
  ForecastOrderResult,
  ForecastProductToPrepare,
  ForecastRecentActivity,
  ForecastRecentOrder,
  ForecastReturnReason,
  ForecastScenario,
  ForecastStockItem,
  ForecastTodoItem,
  ForecastUpcomingTask,
  ForecastUrgentStock,
} from "../services/types";

export const overviewKpis: ForecastKpi[] = [
  { label: "Doanh thu hôm nay", value: "128,4 triệu", sub: "+12,5% so với hôm qua", red: true },
  { label: "Đơn hàng hôm nay", value: "318", sub: "+8,4% so với hôm qua" },
  { label: "Đơn thành công", value: "247", sub: "77,7% số đơn" },
  { label: "Tỷ lệ hoàn", value: "8,2%", sub: "+1,1 điểm %" },
  { label: "Lợi nhuận ước tính", value: "32,1 triệu", sub: "+10,4%", red: true },
];

export const overviewTodos: ForecastTodoItem[] = [
  { rank: 1, text: "6 sản phẩm sắp thiếu", action: "Chuẩn bị nhập / sản xuất" },
  { rank: 2, text: "Tỷ lệ hoàn TikTok tăng", action: "Xem đơn hoàn" },
  { rank: 3, text: "Facebook hiệu quả giảm", action: "Giảm ngân sách" },
  { rank: 4, text: "LNV-03 tăng trưởng tốt", action: "Tăng tồn kho" },
];

export const overviewChannelRevenue: ForecastChannelRevenue[] = [
  { name: "TikTok Shop", percent: 42.8 },
  { name: "Shopee", percent: 28.6 },
  { name: "Lazada", percent: 15.2 },
  { name: "Website", percent: 8.9 },
  { name: "Khác", percent: 4.5 },
];

export const overviewOrderResults: ForecastOrderResult[] = [
  { label: "Thành công", value: 247, color: "#16a34a" },
  { label: "Đang xử lý", value: 32, color: "#2563eb" },
  { label: "Đơn hoàn", value: 26, color: "#dc2626" },
  { label: "Đã hủy", value: 13, color: "#ca8a04" },
];

export const overviewFeaturedProducts: ForecastFeaturedProduct[] = [
  { code: "LNV-03", name: "Luneva Collagen", revenue: "48,2 triệu", growth: 62 },
  { code: "COL-01", name: "Collagen Powder", revenue: "35,4 triệu", growth: 28 },
  { code: "SER-04", name: "Serum Vitamin C", revenue: "28,3 triệu", growth: 18 },
  { code: "BMS-02", name: "Body Milk", revenue: "26,8 triệu", growth: 12 },
  { code: "OIL-08", name: "Orchid Oil", revenue: "24,7 triệu", growth: 35 },
];

export const realKpis: ForecastKpi[] = [
  { label: "Đơn phát sinh", value: "318", sub: "+12,6%" },
  { label: "Đơn thành công", value: "247", sub: "+18,4%" },
  { label: "Đơn hoàn", value: "26", sub: "+8,3%" },
  { label: "Doanh thu thuần", value: "128,4 triệu", sub: "+15,2%" },
  { label: "COD chờ thu", value: "18,6 triệu", sub: "42 đơn" },
];

export const businessSignals: ForecastBusinessSignal[] = [
  { text: "TikTok tăng 28%", badge: "Tích cực", badgeClass: "bg-green-100 text-green-700" },
  { text: "Đơn hoàn tăng 8,3%", badge: "Cần chú ý", badgeClass: "bg-yellow-100 text-yellow-700" },
  { text: "LNV-03 bán nhanh", badge: "Cơ hội", badgeClass: "bg-blue-100 text-blue-700" },
  { text: "23 đơn chậm cập nhật", badge: "Cảnh báo", badgeClass: "bg-red-100 text-red-700" },
];

export const realRecentOrders: ForecastRecentOrder[] = [
  { id: "DH-001", channel: "TikTok", product: "LNV-03", region: "Hà Nội", cod: "450.000", status: "Thành công", updated: "09:02" },
  { id: "DH-002", channel: "Shopee", product: "SER-04", region: "TP.HCM", cod: "280.000", status: "Đang xử lý", updated: "08:58" },
  { id: "DH-003", channel: "Lazada", product: "COL-01", region: "Đà Nẵng", cod: "0", status: "Thành công", updated: "08:54" },
  { id: "DH-004", channel: "TikTok", product: "BMS-02", region: "Hải Phòng", cod: "620.000", status: "Đang giao", updated: "08:48" },
  { id: "DH-005", channel: "Website", product: "OIL-08", region: "Hà Nội", cod: "350.000", status: "Đơn hoàn", updated: "08:41" },
];

export const forecastKpis: ForecastKpi[] = [
  { label: "Doanh thu dự báo", value: "1,456 tỷ", sub: "+14,2%" },
  { label: "Đơn hàng dự báo", value: "2.846", sub: "+16,8%" },
  { label: "Độ tin cậy", value: "92%", sub: "Cao" },
  { label: "Nguy cơ thiếu hàng", value: "8 sản phẩm", sub: "Cần chuẩn bị" },
  { label: "Kênh tăng trưởng", value: "TikTok", sub: "+24%" },
];

export const forecastScenarioData: ForecastScenario[] = [
  { name: "Cơ sở", value: "1,456 tỷ", change: "+14,2%", changeClass: "text-green-600" },
  { name: "Tích cực", value: "1,726 tỷ", change: "+35,4%", changeClass: "text-green-600" },
  { name: "Thận trọng", value: "1,182 tỷ", change: "-12,6%", changeClass: "text-red-600" },
];

export const forecastProductsToPrepare: ForecastProductToPrepare[] = [
  { code: "LNV-03", name: "Luneva Collagen", demand: "1.240", stock: "320", daysLeft: "3 ngày", action: "Tạo kế hoạch nhập" },
  { code: "SER-04", name: "Serum Vitamin C", demand: "760", stock: "90", daysLeft: "2 ngày", action: "Nhập thêm" },
  { code: "COL-01", name: "Collagen Powder", demand: "980", stock: "650", daysLeft: "10 ngày", action: "Theo dõi" },
  { code: "BMS-02", name: "Body Milk", demand: "640", stock: "210", daysLeft: "5 ngày", action: "Chuẩn bị thêm" },
];

export const weeklyRisks = [
  "Nhu cầu tăng từ chiến dịch",
  "Nguồn cung có thể chậm",
  "Tỷ lệ hoàn có thể tăng",
];

export const channelKpis: ForecastKpi[] = [
  { label: "Chi phí quảng cáo", value: "48,2 triệu", sub: "-12,5%" },
  { label: "Hiệu quả quảng cáo", value: "3,8 lần", sub: "+18,4%" },
  { label: "Doanh thu theo kênh", value: "183,4 triệu", sub: "+14,2%" },
  { label: "Tỷ lệ hoàn", value: "3,1%", sub: "Ổn định" },
  { label: "Đơn từ quảng cáo", value: "412", sub: "+11%" },
];

export const channelsToOptimize: ForecastChannelOptimization[] = [
  { name: "Shopee", note: "Hiệu quả thấp", action: "Giảm ngân sách" },
  { name: "Facebook", note: "Chi phí tăng", action: "Tối ưu nhóm khách" },
  { name: "TikTok", note: "Hiệu quả tốt", action: "Tăng ngân sách" },
  { name: "Website", note: "Tăng trưởng tốt", action: "Tăng thử nghiệm" },
];

export const channelEfficiencyData: ForecastChannelEfficiency[] = [
  { channel: "Facebook", cost: "28,4 tr", revenue: "96,2 tr", efficiency: "3,4 lần", returnRate: "2,8%", growth: "+15%", suggestion: "Tối ưu nhóm khách" },
  { channel: "TikTok", cost: "12,3 tr", revenue: "54,1 tr", efficiency: "4,5 lần", returnRate: "1,9%", growth: "+28%", suggestion: "Tăng ngân sách" },
  { channel: "Shopee", cost: "17,8 tr", revenue: "45,6 tr", efficiency: "2,6 lần", returnRate: "4,5%", growth: "-12%", suggestion: "Giảm ngân sách" },
  { channel: "Lazada", cost: "8,1 tr", revenue: "28,3 tr", efficiency: "3,5 lần", returnRate: "3,1%", growth: "+8%", suggestion: "Tối ưu nội dung" },
  { channel: "Website", cost: "5,4 tr", revenue: "22,1 tr", efficiency: "3,7 lần", returnRate: "2,2%", growth: "+24%", suggestion: "Tăng thử nghiệm" },
];

export const warehouseKpis: ForecastKpi[] = [
  { label: "Tồn có thể dùng", value: "12.580", sub: "+6,2%" },
  { label: "Sản phẩm sắp hết", value: "24", sub: "+33%" },
  { label: "Đủ hàng trung bình", value: "18 ngày", sub: "Mức an toàn 14" },
  { label: "Cần nhập thêm", value: "32 sản phẩm", sub: "Theo dự báo" },
  { label: "Hàng đang về", value: "4.600", sub: "8 lô" },
];

export const urgentStock: ForecastUrgentStock[] = [
  { code: "LNV-03", note: "Còn ~2 ngày", action: "Nhập ngay" },
  { code: "SER-04", note: "Còn ~3 ngày", action: "Nhập ngay" },
  { code: "OIL-08", note: "Nhu cầu +85%", action: "Xem chi tiết" },
  { code: "RM-12", note: "Nguồn cung chậm", action: "Liên hệ NCC" },
];

export const stockInventoryData: ForecastStockItem[] = [
  { code: "LNV-03", name: "Luneva Collagen", stock: "120", sold7d: "56", forecast14d: "112", daysLeft: "15 ngày", status: "Bình thường", action: "Xem" },
  { code: "SER-04", name: "Serum Vitamin C", stock: "56", sold7d: "42", forecast14d: "98", daysLeft: "8 ngày", status: "Sắp hết", action: "Nhập" },
  { code: "OIL-08", name: "Orchid Oil", stock: "34", sold7d: "28", forecast14d: "88", daysLeft: "5 ngày", status: "Sắp hết", action: "Nhập" },
  { code: "COL-01", name: "Collagen Powder", stock: "230", sold7d: "86", forecast14d: "120", daysLeft: "27 ngày", status: "Bình thường", action: "Xem" },
  { code: "BMS-02", name: "Body Milk", stock: "210", sold7d: "68", forecast14d: "96", daysLeft: "31 ngày", status: "Bình thường", action: "Xem" },
];

export const customerKpis: ForecastKpi[] = [
  { label: "Khách mới", value: "1.248", sub: "+18,6%" },
  { label: "Khách quay lại", value: "892", sub: "+12,3%" },
  { label: "Tỷ lệ xác nhận", value: "96,4%", sub: "+1,8%" },
  { label: "Tỷ lệ hoàn / hủy", value: "2,8%", sub: "-0,6%" },
  { label: "Khách rủi ro cao", value: "23", sub: "Cần theo dõi" },
];

export const customerActions: ForecastCustomerAction[] = [
  { text: "Khách chưa xác nhận", count: "42", action: "Gọi ngay" },
  { text: "Khách có tỷ lệ hoàn cao", count: "23", action: "Xem danh sách" },
  { text: "Khách VIP chưa mua lại", count: "15", action: "Chăm sóc" },
  { text: "Khách cần theo dõi", count: "8", action: "Theo dõi" },
];

export const returnReasons: ForecastReturnReason[] = [
  { reason: "Không nghe máy", percent: 32.5 },
  { reason: "Khách đổi ý", percent: 24.8 },
  { reason: "Không còn nhu cầu", percent: 18.1 },
  { reason: "Sai địa chỉ", percent: 12.6 },
  { reason: "Khác", percent: 12.0 },
];

export const customerWatchList: ForecastCustomerToWatch[] = [
  { name: "Trần Thị Mai - 0987 654 321", group: "Rủi ro", orders: "12", avgValue: "245.000", returnRate: "33%", suggestion: "Gọi xác nhận kỹ", action: "Gọi" },
  { name: "Lê Văn Hùng - 0903 111 222", group: "Mới", orders: "1", avgValue: "320.000", returnRate: "0%", suggestion: "Gửi ưu đãi lần 2", action: "Gửi" },
  { name: "Nguyễn Thị Lan - 0912 333 444", group: "Quay lại", orders: "8", avgValue: "410.000", returnRate: "5%", suggestion: "Gợi ý sản phẩm mới", action: "Xem" },
  { name: "Hoàng Thu Trang - 0399 888 666", group: "Rủi ro", orders: "15", avgValue: "180.000", returnRate: "27%", suggestion: "Đưa vào theo dõi", action: "Theo dõi" },
];

export const warningKpis: ForecastKpi[] = [
  { label: "Cảnh báo mới", value: "18", sub: "Hôm nay" },
  { label: "Mức ưu tiên cao", value: "5", sub: "Cần xử lý" },
  { label: "Chờ xác nhận", value: "7", sub: "Của quản lý" },
  { label: "Đã xử lý", value: "23", sub: "Hôm nay" },
  { label: "Quá hạn", value: "2", sub: "Cần nhắc" },
];

export const warningAlertData: ForecastAlert[] = [
  { level: "Gấp", group: "Tồn kho", issue: "LNV-03 sắp hết", impact: "Nguy cơ mất 42 đơn", deadline: "10:00", owner: "QL Kho", action: "Xử lý" },
  { level: "Gấp", group: "Đơn hàng", issue: "21 đơn có nguy cơ trễ", impact: "SLA giao hàng", deadline: "10:30", owner: "QL Vận hành", action: "Xử lý" },
  { level: "Gấp", group: "Marketing", issue: "Shopee hiệu quả giảm", impact: "Lãng phí ~3,2 triệu", deadline: "11:00", owner: "Marketing", action: "Xử lý" },
  { level: "Chú ý", group: "Khách hàng", issue: "23 khách hoàn cao", impact: "Tăng tỷ lệ hoàn", deadline: "Hôm nay", owner: "CSKH", action: "Xem" },
  { level: "Chú ý", group: "Nguồn cung", issue: "RM-12 về chậm", impact: "Ảnh hưởng 1 lệnh SX", deadline: "12:00", owner: "QL Kho", action: "Xem" },
];

export const warningAlertDetail: ForecastAlertDetail = {
  level: "Gấp",
  title: "LNV-03 sắp hết hàng",
  stock: "120",
  daysLeft: "~ 2,1 ngày",
  demand14d: "1.240",
  suggestion: "Tạo kế hoạch nhập thêm 300–500 sản phẩm.",
};

export const activityKpis: ForecastKpi[] = [
  { label: "Sự kiện hôm nay", value: "1.248", sub: "+18,6%" },
  { label: "Tác vụ tự động", value: "342", sub: "+22,1%" },
  { label: "Việc chờ xử lý", value: "28", sub: "+7,7%" },
  { label: "Đúng hạn", value: "96,3%", sub: "+2,4%" },
  { label: "Tác vụ lỗi", value: "12", sub: "3,5%" },
];

export const activityRecentData: ForecastRecentActivity[] = [
  { time: "09:04", activity: "Đồng bộ đơn Shopee", group: "Đơn hàng", by: "Hệ thống", result: "Thành công", related: "Shopee" },
  { time: "09:01", activity: "Cập nhật tồn kho LNV-03", group: "Tồn kho", by: "Hệ thống", result: "Thành công", related: "LNV-03" },
  { time: "08:58", activity: "Giao xử lý cảnh báo #CB-018", group: "Cảnh báo", by: "Nguyễn A", result: "Thành công", related: "CB-018" },
  { time: "08:54", activity: "Cập nhật ngân sách TikTok", group: "Kênh bán", by: "Marketing", result: "Thành công", related: "TikTok" },
  { time: "08:49", activity: "Tạo dự báo 14 ngày", group: "Dự báo", by: "Hệ thống", result: "Thành công", related: "DB-1001" },
  { time: "08:42", activity: "Đồng bộ trạng thái J&T", group: "Vận chuyển", by: "Hệ thống", result: "Có lỗi", related: "12 đơn" },
];

export const activityUpcomingTasks: ForecastUpcomingTask[] = [
  { text: "Xử lý tồn kho thấp", level: "Gấp", time: "10:00" },
  { text: "Kiểm tra 21 đơn trễ", level: "Gấp", time: "10:30" },
  { text: "Xác nhận ngân sách Shopee", level: "Chú ý", time: "11:00" },
  { text: "Kiểm tra 12 lỗi đồng bộ", level: "Chú ý", time: "11:30" },
];

export const activityLog: ForecastActivityLog[] = [
  { time: "08:58", text: "Xử lý cảnh báo tồn kho LNV-03" },
  { time: "08:42", text: "Kiểm tra lỗi đồng bộ J&T" },
  { time: "08:20", text: "Phê duyệt thay đổi ngân sách TikTok" },
];

export const businessForecastData: BusinessForecastData = {
  overview: {
    kpis: overviewKpis,
    todos: overviewTodos,
    channelRevenue: overviewChannelRevenue,
    orderResults: overviewOrderResults,
    featuredProducts: overviewFeaturedProducts,
  },
  real: {
    kpis: realKpis,
    businessSignals,
    recentOrders: realRecentOrders,
  },
  forecast: {
    kpis: forecastKpis,
    scenarioData: forecastScenarioData,
    productsToPrepare: forecastProductsToPrepare,
    weeklyRisks,
  },
  channel: {
    kpis: channelKpis,
    channelsToOptimize,
    efficiencyData: channelEfficiencyData,
  },
  stock: {
    kpis: warehouseKpis,
    urgentStock,
    inventoryData: stockInventoryData,
    incomingSummary: {
      productCount: "4.600",
      lotCount: "8 lô",
    },
  },
  customer: {
    kpis: customerKpis,
    actions: customerActions,
    watchList: customerWatchList,
    returnReasons,
  },
  warning: {
    kpis: warningKpis,
    alertData: warningAlertData,
    alertDetail: warningAlertDetail,
  },
  activity: {
    kpis: activityKpis,
    recentData: activityRecentData,
    upcomingTasks: activityUpcomingTasks,
    log: activityLog,
    processingSummary: {
      completedCount: 23,
      pendingConfirmationCount: 7,
      overdueCount: 2,
      completionPercent: 72,
      successfulTasks: 298,
      runningTasks: 32,
    },
  },
};
