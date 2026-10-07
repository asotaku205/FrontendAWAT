import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../components/ui/combobox";
import type { AddressParseDataType } from "../../mock/AddressParseData";
import { city, district, region } from "../../mock/AddressParseData";
const DetailAddressModal = ({
  DetailData,
  setIsDetailModalOpen,
}: {
  DetailData: AddressParseDataType;
  setIsDetailModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <section className="bg-black/45 backdrop-blur-sm  shadow-md fixed inset-0 z-50 p-4 flex items-center justify-center">
      <div className="h-auto w-full max-w-lg overflow-auto max-h-160 z-10 bg-white rounded-xl">
        {/* header */}
        <div className="flex flex-col border-b border-gray-300 font-bold">
          <div className="flex justify-between items-center p-4">
            <h3>Xác nhận & hiệu chỉnh địa chỉ</h3>
            <button
              className="text-gray-600 hover:text-red-600 font-bold"
              onClick={() => setIsDetailModalOpen(false)}
            >
              X
            </button>
          </div>
          <p className="px-4 text-xs text-gray-500">
            Khách hàng:{DetailData.customerName} - SĐT: {DetailData.phoneNumber}{" "}
            - {DetailData.orderCode}
          </p>
        </div>
        {/* content */}
        <div className="items-center justify-center px-4 py-4 rounded-lg">
          <p className="mb-2 text-gray-500 font-semibold">Địa chỉ gốc </p>
          <div className="border border-gray-300 rounded-lg p-2 mb-4 bg-gray-100 text-sm">
            {DetailData.originalAddress}
          </div>
          <div className=" grid grid-cols-3 gap-2">
            <div className="border border-gray-100 bg-gray-100 px-2 py-3 text-center">
              <p>Tỉnh / TP</p>
              <p
                className={`my-1 font-semibold ${DetailData.reliability < 75 ? "text-red-700" : DetailData.cityReliable < 95 ? "text-yellow-600" : "text-green-600"} `}
              >
                {DetailData.cityReliable}%
              </p>
                {DetailData.cityReliable < 75 ? (
                <p>Rủi ro cao</p>
              ) : DetailData.cityReliable < 95 ? (
                <p>Cần lưu ý</p>
              ) : (
                <p>Tin cậy cao</p>
              )}
            </div>
            <div className="border border-gray-100 bg-gray-100 px-2 py-3 text-center">
              <p>Quận / Huyện</p>
              <p
                className={`my-1 font-semibold ${DetailData.reliability < 75 ? "text-red-700" : DetailData.districtReliable < 95 ? "text-yellow-600" : "text-green-600"} `}
              >
                {DetailData.districtReliable}%
              </p>
              {DetailData.districtReliable < 75 ? (
                <p>Rủi ro cao</p>
              ) : DetailData.districtReliable < 95 ? (
                <p>Cần lưu ý</p>
              ) : (
                <p>Tin cậy cao</p>
              )}
            </div>
            <div className="border border-gray-100 bg-gray-100 px-2 py-3 text-center">
              <p>Xã / Phường</p>
              <p
                className={`my-1 font-semibold ${DetailData.reliability < 75 ? "text-red-700" : DetailData.regionReliable < 95 ? "text-yellow-600" : "text-green-600"} `}
              >
                {DetailData.regionReliable}%
              </p>
                {DetailData.cityReliable < 75 ? (
                <p>Rủi ro cao</p>
              ) : DetailData.cityReliable < 95 ? (
                <p>Cần lưu ý</p>
              ) : (
                <p>Tin cậy cao</p>
              )}
            </div>
          </div>
        </div>
        <p className="px-4 font-semibold">Hiệu chỉnh</p>
        <div className="space-y-3">
          <div className="flex flex-col px-4">
            <span className="text-sm font-medium py-1 text-gray-600">
              Tỉnh/TP
            </span>
            <Combobox items={city} value={DetailData.city}>
              <ComboboxInput placeholder="Chọn Tỉnh/TP" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col px-4 ">
            <span className="text-sm font-medium py-1 text-gray-600 ">
              Quận/Huyện
            </span>
            <Combobox items={district} value={DetailData.district}>
              <ComboboxInput placeholder="Chọn Quận/Huyện" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col px-4  ">
            <span className="text-sm font-medium py-1 text-gray-600 ">
              Xã/Phường
            </span>
            <Combobox items={region} value={DetailData.region}>
              <ComboboxInput placeholder="Chọn Xã/Phường" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>

        <div className="flex flex-col px-4 py-4">
          <span className="text-sm font-medium pb-2 text-gray-600">
            Địa chỉ chi tiết
          </span>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Nhập địa chỉ chi tiết"
            value={DetailData.detailedAddress}
          />
        </div>
        {/* button */}
        <div className="flex items-center bg-gray-100 justify-end border-t border-gray-300 rounded-b-lg">
          <button
            className="bg-white hover:bg-gray-300  font-bold px-2 py-1 rounded "
            onClick={() => setIsDetailModalOpen(false)}
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

export default DetailAddressModal;
