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
