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

export type MonitorCustomer = {
  customerName: string;
  phoneNumber: number;
  address: string;
  recentActivity: string;
  refundCount: number;
  totalAmount: number;
};
