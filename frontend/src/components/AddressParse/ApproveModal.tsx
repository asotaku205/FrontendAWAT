
const ApproveModal = ({ selectedIds, setIsApproveModalOpen }:{ selectedIds: string[]; setIsApproveModalOpen:(isOpen:boolean)=>void }) => {
  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-auto  z-10 bg-white rounded-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-300 font-bold">
          <h3>Xác nhận địa chỉ hàng loạt</h3>
          <button
            className="text-gray-600 hover:text-red-600 font-bold"
            onClick={() => setIsApproveModalOpen(false)}
          >
            X
          </button>
        </div>
        <div className="items-center justify-center p-4 m-4 border border-gray-300 rounded-lg">
          <p>Xác nhận ({selectedIds.length}) địa chỉ đã chọn </p>
        </div>
        <div className="flex items-center bg-gray-100 justify-end border-t border-gray-300 rounded-b-lg">
          <button
            className="bg-white hover:bg-gray-300  font-bold px-2 py-1 rounded "
            onClick={() => setIsApproveModalOpen(false)}
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

export default ApproveModal;
