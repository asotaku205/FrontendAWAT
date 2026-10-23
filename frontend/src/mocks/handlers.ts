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
import type {
  TelesaleAssignmentSummary as TelesaleAssignmentSummaryType,
  TelesaleCallRecord,
  TelesaleEmployeeCallSummary,
  TelesaleEmployeeFilterOptions,
  TelesaleOverviewResponse,
  TelesaleSummary,
  TelesaleWorkSummary,
} from "../services/types";
import { MonitorCustomerData } from "../mock/BlacklistData";
import { AssignedOrderData } from "../mock/AssignedOrderData";
import { AuditLogData } from "../mock/AuditLog";
import { UnassignOrderData } from "../mock/UnassignOrderData";
import { DeliveryOrderData } from "../mock/DeliveryOrderData";
import { TelesaleData } from "../mock/TelesaleData";
import { TelesaleCallData } from "../mock/TelesaleCallData";
import { TelesaleEmployeeData } from "../mock/TelesaleEmployeeData";
import { ProductData } from "../mock/ProductData";
import { DashboardSummaryData } from "../mock/DashboardData";
import {
  TelesaleAssignmentAgents,
  TelesaleAssignmentSummaryData,
  TelesaleOverviewData,
  TelesalePriorityOrders,
  TelesaleWorkSummaryData,
  TelesaleWorkOrders,
} from "../mock/TelesaleAssignmentData";
import {
  exceptionOrders,
  distributionRecommendation,
  orderDistributionFilterOptions,
  printRequest,
  readyOrdersSummary,
  workerProgress,
  warehouseEmployees,
} from "../mock/OrderDistributionData";
import type { AuthLoginRequest } from "../services/types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const addAssignedWorkOrder = (
  order: (typeof TelesalePriorityOrders)[number],
  employeeName: string,
) => {
  if (TelesaleWorkOrders.some(({ orderCode }) => orderCode === order.orderCode)) {
    return;
  }
  TelesaleWorkOrders.push({
    orderCode: order.orderCode,
    employeeName,
    customerName: order.customerName,
    phoneNumber: order.phoneNumber,
    waybill: order.waybill,
    expectedDelivery: `${order.expectedDelivery} ${order.callSuggestion}`,
    duration: "00:00",
    result: "Đang gọi",
    address: "Địa chỉ giao hàng đang được đồng bộ từ OMS.",
    product: order.product,
    shippingEvents: [],
  });
};

export const handlers = [
  http.post(`${API_BASE_URL}${API_ENDPOINTS.auth.login}`, async ({ request }) => {
    const body: unknown = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      !("password" in body) ||
      typeof body.email !== "string" ||
      typeof body.password !== "string"
    ) {
      return HttpResponse.json(
        { message: "Vui lòng nhập email và mật khẩu." },
        { status: 400 },
      );
    }

    const credentials: AuthLoginRequest = {
      email: body.email.trim().toLowerCase(),
      password: body.password,
    };
    if (
      credentials.email !== "admin@awat.vn" ||
      credentials.password !== "awat123"
    ) {
      return HttpResponse.json(
        { message: "Email hoặc mật khẩu không chính xác." },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      accessToken: "mock-access-token",
      user: {
        id: "user-001",
        email: credentials.email,
        name: "Quản trị viên",
        role: "Quản trị hệ thống",
      },
    });
  }),
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
  http.get(`${API_BASE_URL}${API_ENDPOINTS.dashboardSummary}`, () =>
    HttpResponse.json(DashboardSummaryData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.deliveryOrders}`, () =>
    HttpResponse.json(DeliveryOrderData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleRecords}`, () =>
    HttpResponse.json(TelesaleData),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.orders}`, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const status = params.get("status");
    const deliveryDate = params.get("deliveryDate");
    const search = params.get("search")?.trim().toLocaleLowerCase("vi-VN") ?? "";
    const orders = TelesalePriorityOrders.filter((order) => {
      const matchesStatus = !status || order.status === status;
      const matchesDate =
        !deliveryDate || order.expectedDelivery === deliveryDate;
      const normalizedText =
        `${order.orderCode} ${order.waybill} ${order.customerName} ${order.phoneNumber}`
          .toLocaleLowerCase("vi-VN");
      const matchesSearch = !search || normalizedText.includes(search);
      return matchesStatus && matchesDate && matchesSearch;
    });
    return HttpResponse.json(orders);
  }),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.agents}`, () =>
    HttpResponse.json(TelesaleAssignmentAgents),
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.summary}`, () => {
    const summary: TelesaleAssignmentSummaryType = {
      ...TelesaleAssignmentSummaryData,
      priorityOrders:
        118 +
        TelesalePriorityOrders.filter(({ status }) => status === "Chưa chia")
          .length,
      assignedToday:
        TelesaleAssignmentSummaryData.assignedToday +
        TelesalePriorityOrders.filter(({ status }) => status !== "Chưa chia")
          .length,
      activeEmployees: TelesaleAssignmentAgents.filter(
        ({ status }) => status === "Đang làm",
      ).length,
    };
    return HttpResponse.json(summary);
  }),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.workSummary}`, ({ request }) => {
    const employeeName =
      new URL(request.url).searchParams.get("employeeName")?.trim() ||
      TelesaleWorkSummaryData.employeeName;
    if (!TelesaleAssignmentAgents.some(({ employeeName: name }) => name === employeeName)) {
      return HttpResponse.json(
        { message: "Telesale employee was not found." },
        { status: 404 },
      );
    }
    const summary: TelesaleWorkSummary = {
      ...TelesaleWorkSummaryData,
      employeeName,
    };
    return HttpResponse.json(summary);
  }),
  http.post(
    `${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.autoAssign}`,
    async ({ request }) => {
      const body: unknown = await request.json();
      if (!isRecord(body)) {
        return HttpResponse.json(
          { message: "Danh sách nhân viên và đơn hàng không hợp lệ." },
          { status: 400 },
        );
      }
      const { employeeIds, orderCodes } = body;
      if (
        !isStringArray(employeeIds) ||
        !isStringArray(orderCodes)
      ) {
        return HttpResponse.json(
          { message: "Danh sách nhân viên và đơn hàng không hợp lệ." },
          { status: 400 },
        );
      }

      const selectedAgents = TelesaleAssignmentAgents.filter(
        (agent) =>
          employeeIds.includes(agent.employeeId) &&
          agent.status === "Đang làm",
      );
      if (selectedAgents.length === 0) {
        return HttpResponse.json(
          { message: "Chọn ít nhất một nhân viên đang làm việc." },
          { status: 400 },
        );
      }

      const selectedOrders = TelesalePriorityOrders.filter(
        (order) =>
          order.status === "Chưa chia" &&
          (orderCodes.length === 0 || orderCodes.includes(order.orderCode)),
      );
      selectedOrders.forEach((order, index) => {
        const agent = selectedAgents[index % selectedAgents.length];
        order.status = "Đã chia";
        order.assignedEmployee = agent.employeeName;
        agent.activeCalls += 1;
        addAssignedWorkOrder(order, agent.employeeName);
      });
      return HttpResponse.json({
        assignedOrders: selectedOrders.length,
        selectedEmployees: selectedAgents.length,
      });
    },
  ),
  http.post(
    `${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.manualAssign}`,
    async ({ request }) => {
      const body: unknown = await request.json();
      if (!isRecord(body)) {
        return HttpResponse.json(
          { message: "Thông tin phân công đơn không hợp lệ." },
          { status: 400 },
        );
      }
      const { employeeId, orderCodes } = body;
      if (
        !isStringArray(orderCodes) ||
        typeof employeeId !== "string"
      ) {
        return HttpResponse.json(
          { message: "Thông tin phân công đơn không hợp lệ." },
          { status: 400 },
        );
      }

      const agent = TelesaleAssignmentAgents.find(
        ({ employeeId: id, status }) =>
          id === employeeId && status === "Đang làm",
      );
      if (!agent) {
        return HttpResponse.json(
          { message: "Không tìm thấy nhân viên đang làm việc." },
          { status: 404 },
        );
      }
      const selectedOrders = TelesalePriorityOrders.filter(
        (order) =>
          orderCodes.includes(order.orderCode) && order.status === "Chưa chia",
      );
      selectedOrders.forEach((order) => {
        order.status = "Đã chia";
        order.assignedEmployee = agent.employeeName;
        addAssignedWorkOrder(order, agent.employeeName);
      });
      agent.activeCalls += selectedOrders.length;
      return HttpResponse.json({ assignedOrders: selectedOrders.length });
    },
  ),
  http.get(
    `${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.workOrders}`,
    ({ request }) => {
      const employeeName =
        new URL(request.url).searchParams.get("employeeName")?.trim() ?? "";
      return HttpResponse.json(
        TelesaleWorkOrders.filter(
          (order) =>
            !employeeName || order.employeeName === employeeName,
        ),
      );
    },
  ),
  http.patch(
    `${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.callResult}`,
    async ({ request }) => {
      const body: unknown = await request.json();
      if (
        !isRecord(body) ||
        typeof body.orderCode !== "string" ||
        (body.result !== "Thành công" && body.result !== "Thất bại")
      ) {
        return HttpResponse.json(
          { message: "Thông tin kết quả cuộc gọi không hợp lệ." },
          { status: 400 },
        );
      }
      const order = TelesaleWorkOrders.find(
        ({ orderCode }) => orderCode === body.orderCode,
      );
      if (!order) {
        return HttpResponse.json(
          { message: "Không tìm thấy đơn hàng." },
          { status: 404 },
        );
      }
      if (order.result !== "Đang gọi") {
        return HttpResponse.json(
          { message: "Cuộc gọi này đã được cập nhật kết quả." },
          { status: 409 },
        );
      }
      order.result = body.result;
      const agent = TelesaleAssignmentAgents.find(
        ({ employeeName }) => employeeName === order.employeeName,
      );
      if (agent && agent.activeCalls > 0) agent.activeCalls -= 1;
      return HttpResponse.json(order);
    },
  ),
  http.patch(
    `${API_BASE_URL}${API_ENDPOINTS.telesaleAssignment.receiving}`,
    async ({ request }) => {
      const body: unknown = await request.json();
      if (
        !isRecord(body) ||
        typeof body.employeeId !== "string" ||
        (typeof body.autoAccept !== "boolean" &&
          body.status !== "Đang làm" &&
          body.status !== "Nghỉ" &&
          (body.priority !== "Theo ETA" &&
            body.priority !== "Theo số đơn" &&
            body.priority !== "Thủ công"))
      ) {
        return HttpResponse.json(
          { message: "Thông tin trạng thái nhận đơn không hợp lệ." },
          { status: 400 },
        );
      }
      const agent = TelesaleAssignmentAgents.find(
        ({ employeeId }) => employeeId === body.employeeId,
      );
      if (!agent) {
        return HttpResponse.json(
          { message: "Không tìm thấy nhân viên." },
          { status: 404 },
        );
      }
      if (typeof body.autoAccept === "boolean") {
        agent.autoAccept = body.autoAccept;
      }
      if (body.status === "Đang làm" || body.status === "Nghỉ") {
        agent.status = body.status;
      }
      if (
        body.priority === "Theo ETA" ||
        body.priority === "Theo số đơn" ||
        body.priority === "Thủ công"
      ) {
        agent.priority = body.priority;
      }
      return HttpResponse.json(agent);
    },
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleCalls}`, ({ request }) => {
    const employeeName = new URL(request.url).searchParams
      .get("employeeName")
      ?.trim();
    const selectedCalls = employeeName
      ? TelesaleCallData.filter((call) => call.employeeName === employeeName)
      : TelesaleCallData;
    const calls: TelesaleCallRecord[] = selectedCalls.map((call) => {
      const timeOf = (value?: string | null) =>
        value?.split(" ")[1] ?? "—";
      const duration = `${Math.floor(call.durationSeconds / 60)}p${String(
        call.durationSeconds % 60,
      ).padStart(2, "0")}`;
      return {
        ...call,
        timeline: [
          {
            time: timeOf(call.assignedAt),
            title: "Đơn được hệ thống phân tự động",
            detail: "Ưu tiên theo ETA · Gợi ý gọi trong khung giờ phù hợp",
          },
          {
            time: timeOf(call.startedAt),
            title: "Nhân viên bắt đầu gọi",
            detail: call.employeeName,
          },
          {
            time: timeOf(call.endedAt),
            title: "Kết thúc cuộc gọi",
            detail: `Thời lượng ${duration}`,
          },
          {
            time: timeOf(call.endedAt),
            title: `Lưu kết quả: ${call.result}`,
            detail: call.resultNote ?? "—",
          },
          {
            time: timeOf(call.nextOrderReceivedAt),
            title: "Hệ thống tự động cấp cuộc gọi tiếp theo",
            detail: "Tự động tiếp nhận",
          },
        ],
      };
    });
    return HttpResponse.json(calls);
  }),
  http.get(
    `${API_BASE_URL}${API_ENDPOINTS.telesaleEmployeeSummary}`,
    ({ request }) => {
      const employeeName = new URL(request.url).searchParams
        .get("employeeName")
        ?.trim();
      if (!employeeName) {
        return HttpResponse.json(
          { message: "employeeName is required." },
          { status: 400 },
        );
      }

      const employee = TelesaleEmployeeData.find(
        ({ employeeName: name }) => name === employeeName,
      );
      if (!employee) {
        return HttpResponse.json(
          { message: "Telesale employee was not found." },
          { status: 404 },
        );
      }

      const summary: TelesaleEmployeeCallSummary = {
        totalCalls: employee.totalCalls,
        successfulCalls: employee.successfulCalls,
        failedCalls: employee.failedCalls,
        averageCallTime: employee.averageCallTime,
      };
      return HttpResponse.json(summary);
    },
  ),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleEmployeeOptions}`, () => {
    const options: TelesaleEmployeeFilterOptions = {
      employees: [...new Set(TelesaleEmployeeData.map(({ employeeName }) => employeeName))],
      receivingStatuses: [
        ...new Set(TelesaleEmployeeData.map(({ receivingStatus }) => receivingStatus)),
      ],
      callStatuses: [
        ...new Set(TelesaleEmployeeData.map(({ callStatus }) => callStatus)),
      ],
      workingStatuses: [
        ...new Set(TelesaleEmployeeData.map(({ workingStatus }) => workingStatus)),
      ].map((workingStatus) => ({
        label: workingStatus ? "Đang đi làm" : "Đã nghỉ",
        value: workingStatus ? "true" : "false",
      })),
    };
    return HttpResponse.json(options);
  }),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleEmployees}`, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const search = params.get("search")?.trim().toLocaleLowerCase("vi-VN") ?? "";
    const employeeName = params.get("employeeName");
    const receivingStatus = params.get("receivingStatus");
    const callStatus = params.get("callStatus");
    const workingStatus = params.get("workingStatus");
    const normalize = (value: string) =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLocaleLowerCase("vi-VN");
    const normalizedSearch = normalize(search);
    const normalizedEmployeeName = employeeName ? normalize(employeeName) : "";
    const employees = TelesaleEmployeeData.map((employee) => ({
      ...employee,
      pausedSeconds: employee.workingStatus ? 34 * 60 : 0,
    })).filter((employee) => {
      const matchesSearch =
        !normalizedSearch || normalize(employee.employeeName).includes(normalizedSearch);
      const matchesEmployee =
        !normalizedEmployeeName ||
        normalize(employee.employeeName) === normalizedEmployeeName;
      const matchesReceivingStatus =
        !receivingStatus || employee.receivingStatus === receivingStatus;
      const matchesCallStatus = !callStatus || employee.callStatus === callStatus;
      const matchesWorkingStatus =
        (workingStatus !== "true" && workingStatus !== "false") ||
        employee.workingStatus === (workingStatus === "true");
      return (
        matchesSearch &&
        matchesEmployee &&
        matchesReceivingStatus &&
        matchesCallStatus &&
        matchesWorkingStatus
      );
    });
    return HttpResponse.json(employees);
  }),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleSummary}`, () => {
    const totals = TelesaleEmployeeData.filter(
      (employee) => employee.workingStatus,
    ).reduce(
      (summary, employee) => {
        const [, hours = "0", minutes = "0"] =
          employee.totalCallTime.match(/(\d+)\s*giờ\s*(\d+)\s*phút/) ?? [];
        summary.totalCallTimeSeconds +=
          (Number(hours) * 60 + Number(minutes)) * 60;
        summary.totalCallsToday += employee.totalCalls;
        summary.successfulCalls += employee.successfulCalls;
        summary.activeEmployees += employee.receivingStatus === "Đang nhận" ? 1 : 0;
        summary.pausedEmployees += employee.receivingStatus === "Tạm dừng" ? 1 : 0;
        return summary;
      },
      {
        totalCallTimeSeconds: 0,
        totalCallsToday: 0,
        successfulCalls: 0,
        activeEmployees: 0,
        pausedEmployees: 0,
      },
    );
    const result: TelesaleSummary = {
      averageCallTimeSeconds:
        totals.totalCallsToday === 0
          ? 0
          : Math.round(totals.totalCallTimeSeconds / totals.totalCallsToday),
      totalCallsToday: totals.totalCallsToday,
      successfulCalls: totals.successfulCalls,
      failedCalls:
        totals.totalCallsToday -
        totals.successfulCalls,
      successRate:
        totals.totalCallsToday === 0
          ? 0
          : Math.round((totals.successfulCalls / totals.totalCallsToday) * 1000) / 10,
      activeEmployees: totals.activeEmployees,
      pausedEmployees: totals.pausedEmployees,
    };
    return HttpResponse.json(result);
  }),
  http.get(`${API_BASE_URL}${API_ENDPOINTS.telesaleOverview}`, () => {
    const overview: TelesaleOverviewResponse = {
      ...TelesaleOverviewData,
      priorityOrdersList: TelesaleOverviewData.priorityOrdersList.map(
        (order) => ({ ...order }),
      ),
    };
    return HttpResponse.json(overview);
  }),
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
