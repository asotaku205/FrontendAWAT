import type {
  ExceptionOrder,
  DistributionRecommendation,
  OrderDistributionFilterOptions,
  PrintRequest,
  ReadyOrdersSummary,
  WarehouseEmployee,
  WorkerProgress,
} from "../services/types";
import { EmployeesData } from "./Employees";

export const warehouseEmployees: WarehouseEmployee[] = EmployeesData;

export const orderDistributionFilterOptions: OrderDistributionFilterOptions = {
  locations: ["A1-101", "A2-201", "A3-301"],
  statuses: ["Đang đóng gói", "Hoàn thành", "Chưa chia"],
  employeeStatuses: ["Đang thực hiện", "Nghỉ đột xuất", "In thêm"],
  employees: ["Nguyễn Bá Thiện", "Đỗ Trần Anh Sơn", "Nguyễn Tuấn Anh"],
  batches: ["10:00", "12:00", "14:00"],
};

export const exceptionOrders: ExceptionOrder[] = [
  {
    code: "DH0142 - DN-DO1809",
    quantity: 2,
    position: "A3-12",
    reason: "Nhân viên NV03 nghỉ đột xuất",
    ordersToReassign: 3,
    assignments: [
      { employeeName: "Đỗ Trần Anh Sơn", employeeId: "NV04", orderCount: 2 },
      { employeeName: "Nguyễn Bá Thiện", employeeId: "NV01", orderCount: 1 },
    ],
  },
  {
    code: "DH0189 - DN-DAF2012",
    quantity: 1,
    position: "B1-07",
    reason: "Nhân viên NV03 nghỉ đột xuất",
    ordersToReassign: 1,
    assignments: [
      { employeeName: "Đỗ Trần Anh Sơn", employeeId: "NV04", orderCount: 1 },
    ],
  },
];

export const workerProgress: WorkerProgress[] = [
  {
    name: "Nguyễn Bá Thiện",
    id: "NV01",
    block: 18,
    completed: 12,
    progress: 65,
    note: "Đang làm block hiện tại...",
    canReportAbsence: true,
  },
  {
    name: "Đỗ Trần Anh Sơn",
    id: "NV04",
    block: 20,
    completed: 14,
    progress: 92,
    action: "In block tiếp",
    canReportAbsence: true,
  },
  {
    name: "Nguyễn Thanh Bình",
    id: "NV05",
    block: 16,
    completed: 10,
    progress: 61,
    note: "Đang làm block hiện tại...",
    canReportAbsence: true,
  },
  {
    name: "Lê Văn Cường",
    id: "NV03",
    completed: 7,
    progress: 0,
    note: "Nghỉ đột xuất",
    canReportAbsence: false,
  },
];

export const readyOrdersSummary: ReadyOrdersSummary = {
  count: 127,
  nextDispatch: "15:00",
};

export const distributionRecommendation: DistributionRecommendation = {
  batch: "14:00",
  orderCount: 312,
  employeesCount: 24,
  manualOrderCount: 3,
  employeeAssignments: [
    { name: "Đỗ Trần Anh Sơn", currentOrders: 80, additionalOrders: 80 },
    { name: "Nguyễn Bá Thiện", currentOrders: 72, additionalOrders: 80 },
    { name: "Nguyễn Thanh Bình", currentOrders: 68, additionalOrders: 80 },
    { name: "Nguyễn Tuấn Anh", currentOrders: 60, additionalOrders: 80 },
  ],
};

export const printRequest: PrintRequest = {
  employeeName: "Đỗ Trần Anh Sơn",
  employeeId: "NV04",
  nextBlockCount: 22,
};
