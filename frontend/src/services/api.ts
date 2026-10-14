export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(
  /\/+$/,
  "",
);

export const API_ENDPOINTS = {
  addressParse: {
    options: "/address-parse/options",
    pending: "/address-parse/pending",
    parsed: "/address-parse/parsed",
  },
  blacklistMonitor: "/blacklist/monitor",
  deliveryOrders: "/delivery-date/orders",
  telesaleRecords: "/telesale/records",
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
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(
      `GET ${endpoint} failed: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as T;
};
