type AuditLogType = {
    batch:string,
    approveTime:string,
    orderCount:number,
    employeesCount:number,
    exceptionOrder:number,
    manager:string,
    note:"Hoàn thành 100%" | "Đang thực hiện"
}
export const AuditLogData:AuditLogType[] = [
    {
        batch:"08:00",
        approveTime:"07:45",
        orderCount:280,
        employeesCount:22,
        exceptionOrder:3,
        manager:"Quản lý A",
        note:"Hoàn thành 100%"
    },
     {
        batch:"11:00",
        approveTime:"10:02",
        orderCount:195,
        employeesCount:20,
        exceptionOrder:2,
        manager:"Quản lý A",
        note:"Hoàn thành 100%"
    },
     {
        batch:"14:00",
        approveTime:"13:41",
        orderCount:312,
        employeesCount:24,
        exceptionOrder:2,
        manager:"Quản lý B",
        note:"Đang thực hiện"
    }
]
   