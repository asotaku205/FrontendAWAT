
const OffModal = ({setOffModalOpen}:{setOffModalOpen:(isReAssignModalOpen:boolean)=> void}) => {
  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-auto  z-10 bg-white rounded-xl">
        <div className=" px-5 py-4">
          <h2 className="text-lg font-semibold">
            Báo nghỉ - Nhân viên: Đỗ Trần Anh Sơn
          </h2>
        </div>
        <div className="px-5 py-4">
          <label className="mb-3 flex flex-col gap-1.5 text-xs">
            <span>
              Lý do nghỉ<span className="ml-1 text-red-800">*</span>
            </span>
            <textarea
              name="reason"
              className="rounded-md border border-border  bg-gray-100 p-6"
            ></textarea>
          </label>
          <p className="text-xs ">
            Các đơn còn lại sẽ được đưa về hàng chờ phân công lại. Nhân viên sẽ
            không nhận block mới.
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2 border-t border-border bg-muted px-5 py-4">
          <button
            type="button"
            className="inline-flex  items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-3.5 py-2  bg-white hover:bg-gray-50 "
            onClick={()=>setOffModalOpen(false)}
          >
            Hủy
          </button>
          <button
            type="submit"
           className="inline-flex  items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-3.5 py-2  font-medium bg-red-700  text-white  hover:bg-red-800 "
          >
            Xác nhận báo nghỉ
          </button>
        </div>
      </div>
    </section>
  );
};

export default OffModal;
