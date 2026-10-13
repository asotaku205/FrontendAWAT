type EmployeesDataType = {
  employees: string;
  currentBlock: number;
  completedOrder: number;
  remainingOrder: number;
  performance: number;
  eta: number;
  status: "Đang thực hiện" | "Nghỉ đột xuất" | "In thêm";
};
export const EmployeesData: EmployeesDataType[] = [
  {
    employees: "Đỗ Trần Anh Sơn",
    currentBlock: 80,
    completedOrder: 58,
    remainingOrder: 22,
    performance: 42,
    eta: 42,
    status: "Đang thực hiện",
  },
  {
    employees: "Nguyễn Bá Thiện",
    currentBlock: 72,
    completedOrder: 54,
    remainingOrder: 18,
    performance: 36,
    eta: 30,
    status: "Đang thực hiện",
  },
  {
    employees: "Nguyễn Thanh Bình",
    currentBlock: 68,
    completedOrder: 30,
    remainingOrder: 38,
    performance: 30,
    eta: 76,
    status: "Đang thực hiện",
  },
  {
    employees: "Nguyễn Tuấn Anh",
    currentBlock: 60,
    completedOrder: 60,
    remainingOrder: 0,
    performance: 24,
    eta: 0,
    status: "In thêm",
  },
  {
    employees: "Lê Văn Cường",
    currentBlock: 	50,
    completedOrder: 	50,
    remainingOrder: 0,
    performance: 0,
    eta: 0,
    status: "Nghỉ đột xuất",
  },
  
];
