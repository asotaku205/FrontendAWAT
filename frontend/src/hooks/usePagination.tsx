import { useMemo, useState } from "react";

const usePagination = ({
  data,
  pageSize,
}: {
  data: any[];
  pageSize: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length; // tổng số lượng item
  const totalPages = Math.ceil(totalItems / pageSize); // tổng số trang
  //cắt mảng để lấy dữ liệu trong trang hiện tại
  //lưu vào memo để tránh tính toán lại và chỉ tính lại khi data thay đổi
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data,startIndex,endIndex]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) =>
    setCurrentPage(page);
  return {
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
    onChangePage,
    
  };
};

export default usePagination;
// tài liệu tham khảo: https://medium.com/@manice18/pagination-in-react-with-material-ui-d5ab7ca17e3f
