import { Tally1 } from "lucide-react";
import { MonitorCustomerData } from "../mock/BlacklistData";
import usePagination from "../hooks/usePagination";
import Pagination from "@mui/material/Pagination";
const MonitorCustomerList = () => {
  const { currentData, totalPages, currentPage, onChangePage } = usePagination({
    data: [...MonitorCustomerData],
    pageSize: 5,
  });
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, MonitorCustomerData.length);

  return (
    <section className="bg-white  rounded-lg  shadow-md text-xs mt-8">
      <div className="border-b border-gray-300 p-4">
        <div className="font-bold p-1">Danh sách theo dõi</div>
        <div className="text-gray-600 p-1">
          Danh sách các tài khoản có giấu hiệu bất thường, hoàn hàng nhiều.
        </div>
      </div>
        {currentData.map((item)=>(

            <div className="border-b border-gray-300 p-4 flex justify-between hover:bg-gray-50">
        <div>
          <div className="flex p-2 ">
            <div className="font-bold pr-2 text-sm">{item.customerName}</div>
            <div className="text-gray-600 self-end">{item.phoneNumber}</div>
          </div>
          <div className="pl-2 text-gray-600 flex">
            <div className="mr-2">{item.recentActivity}</div>
            <Tally1 size={19} color="#8c8c8c" />
            <div>{item.address}</div>
          </div>
        </div>
        <div className="flex self-end ">
          <div className="mx-3 ">
            <div className="text-red-700 font-bold ">{item.refundCount}</div>
            <span className="text-gray-600">{item.totalAmount.toLocaleString()} vnđ</span>
          </div>
          <button className="border border-gray-300 font-bold px-4 rounded-lg hover:bg-red-100 hover:text-red-600 ">
            Theo dõi
          </button>
        </div>
      </div>
        ))
            
        }
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Hiển thị{" "}
          <span className="font-medium text-gray-600">
            {startItem}-{endItem}
          </span>
          /
          <span className="font-medium text-gray-600">
            {MonitorCustomerData.length}{" "}
          </span>
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
    </section>
  );
};

export default MonitorCustomerList;
