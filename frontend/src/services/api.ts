import axios from "axios";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(
  /\/+$/,
  "",
);

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
  },
  addressParse: {
    options: "/address-parse/options",
    pending: "/address-parse/pending",
    parsed: "/address-parse/parsed",
  },
  blacklistMonitor: "/blacklist/monitor",
  blacklistOrders: "/blacklist/orders",
  dashboardSummary: "/dashboard/summary",
  deliveryOrders: "/delivery-date/orders",
  telesaleRecords: "/telesale/records",
  telesaleEmployees: "/telesale/employees",
  telesaleEmployeeOptions: "/telesale/employees/options",
  telesaleEmployeeSummary: "/telesale/employees/summary",
  telesaleCalls: "/telesale/calls",
  telesaleSummary: "/telesale/summary",
  telesaleOverview: "/telesale/overview",
  telesaleAssignment: {
    orders: "/telesale/assignment/orders",
    agents: "/telesale/assignment/agents",
    summary: "/telesale/assignment/summary",
    workSummary: "/telesale/assignment/work-summary",
    autoAssign: "/telesale/assignment/auto",
    manualAssign: "/telesale/assignment/manual",
    workOrders: "/telesale/assignment/work-orders",
    callResult: "/telesale/assignment/call-result",
    receiving: "/telesale/assignment/receiving",
  },
  forecastProducts: "/business-forecast/products",
  orderDistribution: {
    options: "/order-distribution/options",
    assigned: "/order-distribution/orders/assigned",
    unassigned: "/order-distribution/orders/unassigned",
    auditLog: "/order-distribution/audit-log",
    exceptions: "/order-distribution/exceptions",
    workers: "/order-distribution/workers",
    readyOrders: "/order-distribution/ready-orders",
    recommendation: "/order-distribution/recommendation",
    printRequest: "/order-distribution/print-request",
    employees: "/order-distribution/employees",
  },
} as const;

export const apiGet = async <T>(
  endpoint: string,
  signal?: AbortSignal,
): Promise<T> => {
  const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`, { signal });
  return response.data;
};

export const apiPost = async <T, D>(
  endpoint: string,
  data: D,
): Promise<T> => {
  const response = await axios.post<T>(`${API_BASE_URL}${endpoint}`, data);
  return response.data;
};

export const apiPatch = async <T, D>(
  endpoint: string,
  data: D,
): Promise<T> => {
  const response = await axios.patch<T>(`${API_BASE_URL}${endpoint}`, data);
  return response.data;
};
