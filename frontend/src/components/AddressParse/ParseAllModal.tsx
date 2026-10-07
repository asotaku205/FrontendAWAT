
const ParseAllModal = ({
  setIsParseAllModalOpen,
}: {
  setIsParseAllModalOpen: (isOpen: boolean) => void;
}) => {

  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-auto  z-10 bg-white rounded-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-300 font-bold">
          <h3>Tách địa chỉ hàng loạt</h3>
          <button
            className="text-gray-600 hover:text-red-600 font-bold"
            onClick={() => setIsParseAllModalOpen(false)}
          >
            X
          </button>
        </div>
        <div className=" p-4 m-4 gap-2 items-center border border-gray-300 rounded-lg flex">
          <input type="radio" name="parseMode" value="all" />
          <p>Xác nhận tách tất cả đơn hiện có </p>
        </div>
        <div className="flex flex-col  gap-2 p-4 m-4 border border-gray-300 rounded-lg">
          <label className="flex gap-2 items-center">
            <input type="radio" name="parseMode" value="date" />{" "}
            <span>Lọc theo ngày tạo đơn</span>
          </label>
          <div className="flex gap-2">
            <p className="py-3">Từ ngày</p>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2 mr-2"
            />
            <p className="py-3">đến</p>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="flex items-center bg-gray-100 justify-end border-t border-gray-300 rounded-b-lg">
          <button
            className="bg-white hover:bg-gray-300  font-bold px-2 py-1 rounded "
            onClick={() => setIsParseAllModalOpen(false)}
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

export default ParseAllModal;
