import Pagination from "@mui/material/Pagination";
import usePagination from "../../hooks/usePagination";
import { AssignedOrderData } from "../../mock/AssignedOrderData";

const Assigned = () => {
  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...AssignedOrderData],
    pageSize: 5,
  });

  const startItem = (currentPage - 1) * 5 + 1;

  const endItem = Math.min(currentPage * 5, AssignedOrderData.length);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-border bg-white text-xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Mã đơn
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                SKU
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Vị trí kho
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Nhân viên
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Trạng thái
              </th>
              <th className="whitespace-nowrap border-b border-r border-border px-3 py-3 font-semibold ">
                Block
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => (
              <tr>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.orderCode}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.sku}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.location}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.employees}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.status}
                </td>
                <td className="border-b border-r px-3 py-3 items-center ">
                  {data.block}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Hiển thị{" "}
            <span className="font-medium text-gray-600">
              {startItem}-{endItem}
            </span>{" "}
            /
            <span className="font-medium text-gray-600">
              {AssignedOrderData.length}
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
    </>
  );
};

export default Assigned;
