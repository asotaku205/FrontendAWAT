const ProcessTab = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold  ">
          <span>Chờ phân công (3 ngoại lệ)</span>
        </div>
        <div className="mt-2 space-y-3">
          <div className="rounded-lg border border-border bg-white p-3 text-xs">
            <p className="font-medium">DH0142 - DN-DO1809 × 2</p>
            <p className="mt-2">Vị trí: A3-12</p>
            <p className="mt-1 text-gray-600">Lý do: Nhân viên NV03 nghỉ đột xuất</p>
            <button
              type="button"
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border px-3.5  font-medium   bg-red-700 text-white  hover:bg-red-800  mt-3 w-full"
            >
              Phân công lại
            </button>
          </div>
          <div className="rounded-lg border border-border bg-white p-3 text-xs">
            <p className="font-medium">DH0189 - DN-DAF2012 × 1</p>
            <p className="mt-2">Vị trí: B1-07</p>
            <p className="mt-1 leading-5">Lý do: Nhân viên NV03 nghỉ đột xuất</p>
            <button
              type="button"
              className="inline-flex min-h-9 items-center justify-center gap-1.5  rounded-md border px-3.5  font-medium   bg-red-700 text-white  hover:bg-red-800  mt-3 w-full"
            >
              Phân công lại
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold ">
          <span>Đang đóng gói</span>
          <button
            type="button"
            className="inline-flex min-h-9 items-center justify-center gap-1.5  rounded-md border px-3.5 font-medium hover:bg-gray-100 bg-white "
          >
            Xem tất cả
          </button>
        </div>
        <div className="mt-2 space-y-2">
          <div className="rounded-lg border border-border bg-white p-4 text-xs ">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Nguyễn Bá Thiện (NV01)</p>
              <button className=" bg-red-700 text-white  hover:bg-red-800 px-2 rounded-xl py-1">Báo nghỉ</button>
            </div>
            <p className="mt-2">Block: 18 phiếu | Đã xong: 12</p>
           
            <p className="mt-1">Tiến độ: 65%</p>
            <p className="mt-2 text-gray-500">Đang làm block hiện tại...</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-4 text-xs ">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Đỗ Trần Anh Sơn (NV04)</p>
              <button className=" bg-red-700 text-white  hover:bg-red-800 px-2 rounded-xl py-1">Báo nghỉ</button>
            </div>
            <p className="mt-2">Block: 20 phiếu | Đã xong: 14</p>
             
            <p className="mt-1">Tiến độ: 92%</p>
            <button
              type="button"
              className="inline-flex min-h-9 items-center justify-center gap-1.5  rounded-md border px-3.5 font-medium  bg-red-700 text-white  hover:bg-red-800 mt-2"
            >
              In block tiếp
            </button>
          </div>
          <div className="rounded-lg border border-border bg-white p-4 text-xs">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Nguyễn Thanh Bình (NV05)</p>
              <button className=" bg-red-700 text-white  hover:bg-red-800 px-2 rounded-xl py-1">Báo nghỉ</button>
            </div>
            <p className="mt-2">Block: 16 phiếu | Đã xong: 10</p>
           
            <p className="mt-1">Tiến độ: 61%</p>
            <p className="mt-2 text-gray-500">Đang làm block hiện tại...</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-4 text-xs ]">
            <div className="flex justify-between gap-2">
              <p className="font-medium">Lê Văn Cường (NV03)</p>
            </div>
            <p className="mt-2">Đã hoàn thành 7 đơn trong ca</p>
            
            <p className="mt-1">Tiến độ: 0%</p>
            <p className="mt-2 text-gray-500">Nghỉ đột xuất</p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-lg border border-border bg-white px-4 py-3 text-xs font-semibold ">
          <span>Sẵn sàng giao (127 đơn)</span>
        </div>
        <div className="mt-2 flex min-h-60 flex-col items-center justify-center rounded-lg border border-border bg-white p-5 text-center text-xs">
          <p className="font-semibold">127 đơn đã hoàn thành đóng gói</p>
          <p className="mt-2 ">Đang chờ bàn giao vận chuyển</p>
          <p className="mt-3">Đợt xuất hàng tiếp theo: 15:00</p>
          <button
            type="button"
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border px-3.5 font-medium bg-white  shadow-xs  hover:bg-gray-50 mt-5"
          >
            Xem chi tiết 127 đơn sẵn sàng giao
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProcessTab;
