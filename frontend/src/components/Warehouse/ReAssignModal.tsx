
const ReAssignModal = ({setReAssignModalOpen}:{setReAssignModalOpen:(isReAssignModalOpen:boolean)=> void}) => {
  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-auto  z-10 bg-white rounded-xl">
          <div className=" px-5 py-4">
            <h2  className="text-lg font-semibold">
              Phân công lại Đơn DH0142
            </h2>
            <p className="mt-2 text-xs  text-gray-500">
              SKU: DN-DO1809 x 2 - Nhân viên NV03 nghỉ đột xuất
            </p>
          </div>
          <div className="px-5 py-4">
            <div className="mb-4 border bg-gray-200 p-3 text-xs ">
              <strong>QUY TẮC PHÂN BỔ ĐƠN LẺ / CHẴN ĐÃ CHỐT:</strong>
              <p className="p-1">- Còn lại 3 đơn của nhân viên nghỉ.</p>
              <p className="p-1">- Ưu tiên 2 đơn cho nhân viên có hiệu suất cao nhất ca.</p>
              <p className="p-1" >- 1 đơn còn lại phân bổ cho nhân viên kế tiếp.</p>
            </div>
            <p className="mb-3 text-xs font-semibold">BẢNG PHÂN BỔ DỰ KIẾN:</p>
            <div className="mb-2 border border-border bg-white p-2 text-xs">
              Đỗ Trần Anh Sơn (NV04) - Nhận thêm: <span className="text-green-700">+2 đơn</span>
            </div>
            <div className="border border-border bg-white p-2 text-xs">
              Nguyễn Bá Thiện (NV01) - Nhận thêm: <span className="text-green-700">+1 đơn</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-border  px-5 py-4">
            <button
              type="button"
              className="inline-flex  items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-3.5  font-medium  bg-white hover:bg-gray-50 "
                onClick={()=>setReAssignModalOpen(false)}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-3.5 py-2 font-medium bg-red-700 text-white  hover:bg-red-800 "
            >
              Duyệt Phân công
            </button>
          </div>
      </div>
    </section>
  );
};

export default ReAssignModal;
