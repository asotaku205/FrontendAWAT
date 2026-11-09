export type AddressParseDataType = {
  orderCode: string;
  customerName: string;
  phoneNumber: string;
  originalAddress: string;
  city: string;
  cityReliable: number;
  district: string;
  districtReliable: number;
  region: string;
  regionReliable: number;
  detailedAddress: string;
  dateCreated: string;
  reliability: number;
  status: "Chưa xác nhận" | "Đã xác nhận" | "Lỗi phân tách";
};

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

export type PendingAddressDataType = {
  orderCode: string;
  customerName: string;
  phoneNumber: string;
  originalAddress: string;
  dateCreated: string;
  status: "Chờ phân tách";
};

export type AddressParseOrdersRequest = {
  orderCodes: string[];
};

export type AddressParseOptions = {
  city: string[];
  district: string[];
  region: string[];
  reliability: { label: string; value: string }[];
};

export type OrderDistributionFilterOptions = {
  locations: string[];
  statuses: string[];
  employeeStatuses: string[];
  employees: string[];
  batches: string[];
};

export type DistributionOrder = {
  orderCode: string;
  sku: string;
  location: string;
  employees: string;
  status: string;
  block?: number;
};

export type AuditLogRecord = {
  batch: string;
  approveTime: string;
  orderCount: number;
  employeesCount: number;
  exceptionOrder: number;
  manager: string;
  note: "Hoàn thành 100%" | "Đang thực hiện";
};

export type ExceptionOrder = {
  code: string;
  quantity: number;
  position: string;
  reason: string;
  ordersToReassign: number;
  assignments: {
    employeeName: string;
    employeeId: string;
    orderCount: number;
  }[];
};

export type WorkerProgress = {
  name: string;
  id: string;
  block?: number;
  completed: number;
  progress: number;
  note?: string;
  action?: string;
  canReportAbsence: boolean;
};

export type ReadyOrdersSummary = {
  count: number;
  nextDispatch: string;
};

export type DistributionRecommendation = {
  batch: string;
  orderCount: number;
  employeesCount: number;
  manualOrderCount: number;
  employeeAssignments: {
    name: string;
    currentOrders: number;
    additionalOrders: number;
  }[];
};

export type PrintRequest = {
  employeeName: string;
  employeeId: string;
  nextBlockCount: number;
};

export type ReassignExceptionRequest = {
  code: string;
};

export type ReportEmployeeAbsenceRequest = {
  employeeName: string;
  reason: string;
};

export type ConfirmPrintOrderRequest = PrintRequest;

export type ApproveDistributionRequest = {
  batch: string;
};

export type AutoAssignOrdersResponse = {
  assignedOrders: DistributionOrder[];
};

export type WarehouseEmployee = {
  employees: string;
  currentBlock: number;
  completedOrder: number;
  remainingOrder: number;
  performance: number;
  eta: number;
  status: "Đang thực hiện" | "Nghỉ đột xuất" | "In thêm";
};

export type DeliveryOrder = {
  orderCode: string;
  customerName: string;
  product: string;
  carrier: string;
  station: string;
  status: "Đang vận chuyển" | "Trễ hạn" | "Sắp đến nơi";
  eta: string;
  timeCall: string;
  callStatus: "Đã gọi xong" | "Chưa gọi" | "Cần gọi ngay";
  routeStops: DeliveryRouteStop[];
};

export type DeliveryRouteStop = {
  location: string;
  description: string;
  status: "completed" | "current" | "upcoming";
};

export type DashboardSummary = {
  ordersToday: number;
  processingOrders: number;
  ordersNeedingAttention: number;
  completionRate: number;
};

export type TelesaleRecord = {
  phoneNumber: number;
  orderCode: string;
  product: string;
  problem: string;
  customerName: string;
  address: string;
  dateCreated: string;
  status: "Chưa gọi" | "Thành công" | "Thất bại";
  staffName: string;
};

export type TelesaleCallRecord = {
  employeeName: string;
  orderCode: string;
  waybill: string;
  assignedAt?: string;
  customerName?: string;
  phoneNumber?: string;
  expectedDelivery?: string;
  resultNote?: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  afterCallSeconds: number;
  nextOrderReceivedAt: string | null;
  result: "Thành công" | "Thất bại";
  timeline?: { time: string; title: string; detail: string }[];
};

export type TelesaleEmployee = {
  employeeName: string;
  receivingStatus: "Đang nhận" | "Tạm dừng";
  callStatus: "Thành công" | "Tạm dừng";
  successfulCalls: number;
  failedCalls: number;
  successRate: number;
  totalCalls: number;
  averageCallTime: string;
  totalCallTime: string;
  pausedSeconds?: number;
  progress: number;
  workingStatus: boolean;
};

export type TelesaleSummary = {
  averageCallTimeSeconds: number;
  totalCallsToday: number;
  successfulCalls: number;
  failedCalls: number;
  successRate: number;
  activeEmployees: number;
  pausedEmployees: number;
};

export type TelesaleOverviewResponse = {
  totalOrdersToday: number;
  priorityOrders: number;
  completedPriorityCalls: number;
  notNeedCall: number;
  priorityOrdersList: {
    code: string;
    customer: string;
    phone: string;
    eta: string;
    suggestion: string;
    reason: string;
    status: string;
  }[];
};

export type TelesaleEmployeeCallSummary = {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageCallTime: string;
};

export type TelesaleEmployeeFilterOptions = {
  employees: string[];
  receivingStatuses: TelesaleEmployee["receivingStatus"][];
  callStatuses: TelesaleEmployee["callStatus"][];
  workingStatuses: { label: string; value: "true" | "false" }[];
};

export type TelesalePriorityOrder = {
  orderCode: string;
  waybill: string;
  customerName: string;
  phoneNumber: string;
  expectedDelivery: string;
  product: string;
  eta: string;
  callSuggestion: string;
  status: "Chưa chia" | "Đã chia" | "Đang gọi";
  assignedEmployee: string | null;
};

export type TelesaleAssignmentAgent = {
  employeeId: string;
  employeeName: string;
  status: "Đang làm" | "Nghỉ";
  activeCalls: number;
  autoAccept: boolean;
  priority: "Theo ETA" | "Theo số đơn" | "Thủ công";
};

export type TelesaleAssignmentSummary = {
  totalOrders: number;
  priorityOrders: number;
  assignedToday: number;
  activeEmployees: number;
  notNeedCall: number;
};

export type TelesaleWorkSummary = {
  employeeName: string;
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageCallSpeed: number;
  date: string;
  completedCalls: number;
  targetCalls: number;
  currentCallStartedAt: string;
  currentCallDurationSeconds: number;
};

export type TelesaleWorkOrder = {
  orderCode: string;
  employeeName: string;
  customerName: string;
  phoneNumber: string;
  waybill: string;
  expectedDelivery: string;
  duration: string;
  result: "Đang gọi" | "Thành công" | "Thất bại";
  address: string;
  shippingEvents: { time: string; status: string }[];
  product: string;
};

export type ForecastProduct = {
  product: string;
  orderCode: string;
  ecommerce: string[];
  stock: number;
  processing: number;
  fillRate: number;
  aiRecommend: string;
  reason: string;
  status: "Đã xác nhận" | "Chưa xác nhận";
};

export type BlacklistOrderStatus =
  | "Đã kiểm tra"
  | "Hoàn nhiều lần"
  | "Blacklist"
  | "Đã hủy";

export type BlacklistOrder = {
  orderCode: string;
  orderDate: string;
  customerName: string;
  phoneNumber: string;
  productName: string;
  refundRateSummary: string;
  refundRateLastMonth: number;
  refundRateLast3Months: number;
  quantity: number;
  orderValue: number;
  orderSource: string;
  adsStaffName: string;
  status: BlacklistOrderStatus;
  isBlacklisted: boolean;
  orderCountLast3Months: number;
};

export type BlacklistDecisionRequest = {
  orderCodes: string[];
  status: Extract<BlacklistOrderStatus, "Đã kiểm tra" | "Đã hủy">;
};

export type ForecastKpi = {
  label: string;
  value: string;
  sub: string;
  red?: boolean;
};

export type ForecastTodoItem = { rank: number; text: string; action: string };
export type ForecastChannelRevenue = { name: string; percent: number };
export type ForecastOrderResult = { label: string; value: number; color: string };
export type ForecastDailyRevenue = { date: string; revenue: number };
export type ForecastHourlyRevenue = { hour: string; revenue: number };
export type ForecastRevenueForecastPoint = {
  date: string;
  actual: number | null;
  forecast: number | null;
};
export type ForecastChannelCostRevenue = {
  channel: string;
  cost: number;
  revenue: number;
};
export type ForecastStockCoverage = { product: string; days: number };
export type ForecastCustomerTrend = {
  date: string;
  newCustomers: number;
  returningCustomers: number;
};
export type ForecastFeaturedProduct = {
  code: string;
  name: string;
  revenue: string;
  growth: number;
};
export type ForecastBusinessSignal = {
  text: string;
  badge: string;
  badgeClass: string;
};
export type ForecastRecentOrder = {
  id: string;
  channel: string;
  product: string;
  region: string;
  cod: string;
  status: string;
  updated: string;
};
export type ForecastScenario = {
  name: string;
  value: string;
  change: string;
  changeClass: string;
};
export type ForecastProductToPrepare = {
  code: string;
  name: string;
  demand: string;
  stock: string;
  daysLeft: string;
  action: string;
};
export type ForecastChannelOptimization = {
  name: string;
  note: string;
  action: string;
};
export type ForecastChannelEfficiency = {
  channel: string;
  cost: string;
  revenue: string;
  efficiency: string;
  returnRate: string;
  growth: string;
  suggestion: string;
};
export type ForecastUrgentStock = { code: string; note: string; action: string };
export type ForecastStockItem = {
  code: string;
  name: string;
  stock: string;
  sold7d: string;
  forecast14d: string;
  daysLeft: string;
  status: string;
  action: string;
};
export type ForecastCustomerAction = { text: string; count: string; action: string };
export type ForecastReturnReason = { reason: string; percent: number };
export type ForecastCustomerToWatch = {
  name: string;
  group: string;
  orders: string;
  avgValue: string;
  returnRate: string;
  suggestion: string;
  action: string;
};
export type ForecastAlert = {
  level: string;
  group: string;
  issue: string;
  impact: string;
  deadline: string;
  owner: string;
  action: string;
};
export type ForecastAlertDetail = {
  level: string;
  title: string;
  stock: string;
  daysLeft: string;
  demand14d: string;
  suggestion: string;
};
export type ForecastRecentActivity = {
  time: string;
  activity: string;
  group: string;
  by: string;
  result: string;
  related: string;
};
export type ForecastUpcomingTask = { text: string; level: string; time: string };
export type ForecastActivityLog = { time: string; text: string };

export type BusinessForecastData = {
  overview: {
    kpis: ForecastKpi[];
    todos: ForecastTodoItem[];
    revenueTrend: ForecastDailyRevenue[];
    channelRevenue: ForecastChannelRevenue[];
    orderResults: ForecastOrderResult[];
    featuredProducts: ForecastFeaturedProduct[];
  };
  real: {
    kpis: ForecastKpi[];
    hourlyRevenue: ForecastHourlyRevenue[];
    businessSignals: ForecastBusinessSignal[];
    recentOrders: ForecastRecentOrder[];
  };
  forecast: {
    kpis: ForecastKpi[];
    revenueTrend: ForecastRevenueForecastPoint[];
    scenarioData: ForecastScenario[];
    productsToPrepare: ForecastProductToPrepare[];
    weeklyRisks: string[];
  };
  channel: {
    kpis: ForecastKpi[];
    chartData: ForecastChannelCostRevenue[];
    channelsToOptimize: ForecastChannelOptimization[];
    efficiencyData: ForecastChannelEfficiency[];
  };
  stock: {
    kpis: ForecastKpi[];
    coverageData: ForecastStockCoverage[];
    urgentStock: ForecastUrgentStock[];
    inventoryData: ForecastStockItem[];
    incomingSummary: {
      productCount: string;
      lotCount: string;
    };
  };
  customer: {
    kpis: ForecastKpi[];
    trendData: ForecastCustomerTrend[];
    actions: ForecastCustomerAction[];
    watchList: ForecastCustomerToWatch[];
    returnReasons: ForecastReturnReason[];
  };
  warning: {
    kpis: ForecastKpi[];
    alertData: ForecastAlert[];
    alertDetail: ForecastAlertDetail;
  };
  activity: {
    kpis: ForecastKpi[];
    recentData: ForecastRecentActivity[];
    upcomingTasks: ForecastUpcomingTask[];
    log: ForecastActivityLog[];
    processingSummary: {
      completedCount: number;
      pendingConfirmationCount: number;
      overdueCount: number;
      completionPercent: number;
      successfulTasks: number;
      runningTasks: number;
    };
  };
};
