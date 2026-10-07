const PrintOrderModal = ({
  setPrintOrderModalOpen,
}: {
  setPrintOrderModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-auto  z-10 bg-white rounded-xl">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold">Xác nhận in thêm đợt mới</h2>
        </div>
        <div className="px-5 py-4">
          <p className="mb-3 text-xs ">
            In thêm block 22 phiếu cho 1 nhân viên đủ điều kiện.
          </p>
          <div className="border-b border-border py-2 text-xs">
            Đỗ Trần Anh Sơn (NV04): <span className="font-bold text-green-700">+22 phiếu</span>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 justify-end border-t border-gray-300 rounded-b-lg">
          <button
            className="bg-white hover:bg-gray-300  font-bold px-2 py-1 rounded "
            onClick={() => setPrintOrderModalOpen(false)}
          >
            Hủy
          </button>
          <button className="bg-red-700 hover:bg-red-800 text-white font-bold px-2 py-1 rounded m-4">
            Xác nhận
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrintOrderModal;
