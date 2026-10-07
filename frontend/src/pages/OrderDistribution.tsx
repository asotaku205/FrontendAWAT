import { useState } from "react";
import AllOrder from "../components/Warehouse/AllOrder";
import ProcessTab from "../components/Warehouse/ProcessTab";
import usePagination from "../hooks/usePagination";
import { AuditLogData } from "../mock/AuditLog";
import Pagination from "@mui/material/Pagination";
import AssignProposalModal from "../components/Warehouse/AssignProposalModal";
import PrintOrderModal from "../components/Warehouse/PrintOrderModal";

const OrderDistribution = () => {
  const [tabOpen, setTabOpen] = useState("all");
  const [isAssignProposalModalOpen,setAssignProposalModalOpen] = useState(false)
  const [isPrintOrderModalOpen,setPrintOrderModalOpen] = useState(false)
  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...AuditLogData],
    pageSize: 5,
  });

  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, AuditLogData.length);
  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="text-lg font-bold">Phân phối dơn hàng</div>
        <div className="flex items-center gap-2">
          <button
            className={
              tabOpen === "all"
                ? "rounded-md px-3 py-2 bg-red-700 text-white hover:bg-red-800 justify-center gap-1.5 font-bold"
                : "rounded-md px-3 py-2 bg-white border border-gray-100 justify-center gap-1.5 font-medium hover:bg-red-700 hover:text-white "
            }
            onClick={() => setTabOpen("all")}
          >
            Xem tất cả
          </button>
          <button
            className={
              tabOpen === "process"
                ? "rounded-md px-3 py-2 bg-red-700 text-white hover:bg-red-800 justify-center gap-1.5 font-bold"
                : "rounded-md px-3 py-2 bg-white border border-gray-100 justify-center gap-1.5 font-medium hover:bg-red-700 hover:text-white "
            }
            onClick={() => setTabOpen("process")}
          >
            Cần chú ý
          </button>
        </div>
      </div>
      {/* Recommend */}
      <div className="mb-4 flex items-center justify-between gap-3 bg-white rounded-lg border border-b-red-600  px-4 py-3">
        <p className="font-bold text-red-800">
          ĐỢT 14:00 - 312 ĐƠN / 24 NHÂN VIÊN:
          <span className="text-sm text-gray-500 font-normal">
            {" "}
            AI đã tính phương án tối ưu - 3 đơn cần xử lý tay
          </span>
        </p>
        <button className="rounded-md px-3 py-2 border border-gray-100 justify-center gap-1.5 font-bold bg-red-700 text-white hover:bg-red-800 "
        onClick={()=> setAssignProposalModalOpen(true)}
        >
          Xem đề xuất phân công
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3 bg-white rounded-lg border border-b-red-600  px-2 py-2">
        <p className="text-xs text-gray-500 font-normal">
          [Máy in] 1 nhân viên yêu cầu in block tiếp: Đỗ Trần Anh Sơn (NV04) -
          Block tiếp theo 22 phiếu
        </p>

        <button className="rounded-md px-2 py-2 text-xs border border-gray-100 justify-center gap-1.5 font-bold bg-red-700 text-white hover:bg-red-800 "
                onClick={()=> setPrintOrderModalOpen(true)}
        >
          Xác nhận in mới
        </button>
      </div>
      {tabOpen === "all" ? <AllOrder /> : <ProcessTab />}
      {/* auditlog */}
      <div className="mt-6">
        <div className="items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold ">
          Audit log - Lịch sử duyệt đợt phân công hôm nay
        </div>
        <div className="overflow-x-auto rounded-lg border border-border bg-white text-xs">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Đợt
                </th>
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Giờ duyệt
                </th>
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Số đơn
                </th>
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Nhân viên
                </th>
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Đơn ngoại lệ
                </th>
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Người duyệt
                </th>
                <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((data) => (
                <tr>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                    Đợt {data.batch}
                  </td>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                    {data.approveTime}
                  </td>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                  {data.orderCount} đơn
                  </td>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                    {data.employeesCount} nhân viên
                  </td>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                    {data.exceptionOrder} đơn ngoại lệ
                  </td>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                  {data.manager}
                  </td>
                  <td className ="border-b border-r px-3 py-3 items-center ">
                    {data.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Hiển thị{" "}
            <span className="font-medium text-gray-600">
              {startItem}-{endItem}
            </span>{" "}
            /
            <span className="font-medium text-gray-600">
              {AuditLogData.length}
            </span>{" "}
            bản ghi
          </span>
          <div className="flex items-center gap-1">
            <Pagination
              count={totalPages}
              page={currentPage}
              shape="rounded"
              onChange={onChangePage}
            />
          </div>
        </div>
      </div>
      {isAssignProposalModalOpen && <AssignProposalModal setIsAgssignProposalModalOpen={setAssignProposalModalOpen}/> }
      {isPrintOrderModalOpen && <PrintOrderModal setPrintOrderModalOpen={setPrintOrderModalOpen}/> }
    </>
  );
};

export default OrderDistribution;
