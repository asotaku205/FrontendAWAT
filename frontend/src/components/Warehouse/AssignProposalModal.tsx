const AssignProposalModal = ({setIsAgssignProposalModalOpen}: {setIsAgssignProposalModalOpen:(isOpen: boolean) => void}) => {
  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-auto  z-10 bg-white rounded-xl">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold">Đề xuất phân công Đợt 14:00</h2>
          <p className="mt-2 text-xs  text-gray-500">
            Phương án theo khu vực kho/Công suất
          </p>
        </div>
        <div className="px-5 py-4">
          <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
            <div className="rounded-lg border border-t-red-600 border-t-2  bg-white px-5 py-4 text-center">
              <p className="mb-1 text-2xl font-bold ">
                309
              </p>
              <p className="text-xs text-gray-500">Đơn hợp lệ</p>
            </div>
            <div className="rounded-lg border border-t-red-600 border-t-2  bg-white px-5 py-4 text-center">
              <p className="mb-1 text-2xl font-bold ">
                3
              </p>
              <p className="text-xs text-gray-500">Đơn ngoại lệ</p>
            </div>
            <div className="rounded-lg border border-t-red-600 border-t-2  bg-white px-5 py-4 text-center">
              <p className="mb-1 text-2xl font-bold ">
                24
              </p>
              <p className="text-xs text-gray-500">Nhân viên / ca</p>
            </div>
          </div>
          <p className="mb-3  font-semibold">
            DỰ KIẾN CÔNG VIỆC NHÂN VIÊN
          </p>
          <div className="mb-2 border rounded-md bg-white p-2 text-xs">
            <p className="font-bold">Đỗ Trần Anh Sơn</p>
            <p className="mt-1  text-gray-600">
              Đơn hiện tại: 80 - Nhận thêm: <span className=" font-bold text-green-800">+80</span>
            </p>
          </div>
          <div className="mb-2 border rounded-md bg-white p-2 text-xs">
            <p className="font-bold">Nguyễn Bá Thiện</p>
            <p className="mt-1 text-gray-600">
              Đơn hiện tại: 72 - Nhận thêm: <span className=" font-bold text-green-800">+80</span>
            </p>
          </div>
          <div className="mb-2 border rounded-md bg-white p-2 text-xs">
            <p className="font-bold">Nguyễn Thanh Bình</p>
            <p className="mt-1  text-gray-600">
              Đơn hiện tại: 68 - Nhận thêm: <span className=" font-bold text-green-800">+80</span>
            </p>
          </div>
          <div className="mb-2 border rounded-md bg-white p-2 text-xs">
            <p className="font-bold">Nguyễn Tuấn Anh</p>
            <p className="mt-1 text-gray-600">
              Đơn hiện tại: 60 - Nhận thêm: <span className=" font-bold text-green-800">+80</span>
            </p>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 justify-end border-t border-gray-300 rounded-b-lg">
          <button
            className="bg-white hover:bg-gray-300  font-bold px-2 py-1 rounded "
            onClick={() => setIsAgssignProposalModalOpen(false)}
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

export default AssignProposalModal;
