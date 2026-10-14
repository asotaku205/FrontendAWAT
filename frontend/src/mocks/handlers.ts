import { http, HttpResponse } from "msw";
import { API_BASE_URL, API_ENDPOINTS } from "../services/api";
import {
  AddressParseData,
  city,
  district,
  PendingAddressData,
  reliabilityOptions,
  region,
} from "../mock/AddressParseData";
import { MonitorCustomerData } from "../mock/BlacklistData";
import { AssignedOrderData } from "../mock/AssignedOrderData";
import { AuditLogData } from "../mock/AuditLog";
import { UnassignOrderData } from "../mock/UnassignOrderData";
import { DeliveryOrderData } from "../mock/DeliveryOrderData";
import { TelesaleData } from "../mock/TelesaleData";
import { ProductData } from "../mock/ProductData";
import {
  exceptionOrders,
  distributionRecommendation,
  orderDistributionFilterOptions,
  printRequest,
  readyOrdersSummary,
  workerProgress,
  warehouseEmployees,
} from "../mock/OrderDistributionData";

export const handlers = [
  http.get(`${API_BASE_URL}${API_ENDPOINTS.addressParse.options}`, () =>
    HttpResponse.json({
      city,
      district,
      region,
      reliability: reliabilityOptions,
    }),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.addressParse.pending}`, () =>
    HttpResponse.json(PendingAddressData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.addressParse.parsed}`, () =>
    HttpResponse.json(AddressParseData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.blacklistMonitor}`, () =>
    HttpResponse.json(MonitorCustomerData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.deliveryOrders}`, () =>
    HttpResponse.json(DeliveryOrderData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleRecords}`, () =>
    HttpResponse.json(TelesaleData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.forecastProducts}`, () =>
    HttpResponse.json(ProductData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.options}`, () =>
    HttpResponse.json(orderDistributionFilterOptions),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.assigned}`, () =>
    HttpResponse.json(AssignedOrderData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.unassigned}`, () =>
    HttpResponse.json(UnassignOrderData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.auditLog}`, () =>
    HttpResponse.json(AuditLogData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.exceptions}`, () =>
    HttpResponse.json(exceptionOrders),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.workers}`, () =>
    HttpResponse.json(workerProgress),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.readyOrders}`, () =>
    HttpResponse.json(readyOrdersSummary),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.recommendation}`, () =>
    HttpResponse.json(distributionRecommendation),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.printRequest}`, () =>
    HttpResponse.json(printRequest),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.orderDistribution.employees}`, () =>
    HttpResponse.json(warehouseEmployees),
  ),
];
