import { Input } from "../../../components/ui/input";
import Modal from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/button";
import AddressCombobox from "./AddressCombobox";
import type {
  AddressParseDataType,
  AddressParseOptions,
} from "../../../services/types";

const DetailAddressModal = ({
  DetailData: address,
  setIsDetailModalOpen,
  addressOptions,
}: {
  DetailData: AddressParseDataType;
  setIsDetailModalOpen: (isOpen: boolean) => void;
  addressOptions: AddressParseOptions;
}) => {
  const confidence = [
    { title: "Tỉnh / TP", value: address.cityReliable },
    { title: "Quận / Huyện", value: address.districtReliable },
    { title: "Xã / Phường", value: address.regionReliable },
  ];
  const close = () => setIsDetailModalOpen(false);

  return (
    <Modal
      title="Xác nhận & hiệu chỉnh địa chỉ"
      description={`Khách hàng: ${address.customerName} - SĐT: ${address.phoneNumber} - ${address.orderCode}`}
      open
      onClose={close}
      className="max-h-[90vh] max-w-lg overflow-y-auto"
      contentClassName="p-0"
    >
      <div className="space-y-4 p-4">
        <section>
          <h3 className="mb-2 font-semibold text-gray-500">Địa chỉ gốc</h3>
          <p className="rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm">
            {address.originalAddress}
          </p>
        </section>
        <section className="grid grid-cols-3 gap-2">
          {confidence.map(({ title, value }) => (
            <div key={title} className="border border-gray-100 bg-gray-100 px-2 py-3 text-center">
              <p>{title}</p>
              <p className={`my-1 font-semibold ${getConfidenceColor(value)}`}>
                {value}%
              </p>
              <p>{getConfidenceLabel(value)}</p>
            </div>
          ))}
        </section>
        <section className="space-y-3">
          <h3 className="font-semibold">Hiệu chỉnh</h3>
          <AddressField label="Tỉnh/TP" items={addressOptions.city} value={address.city} />
          <AddressField label="Quận/Huyện" items={addressOptions.district} value={address.district} />
          <AddressField label="Xã/Phường" items={addressOptions.region} value={address.region} />
        </section>
        <label className="block space-y-2 text-sm font-medium text-gray-600">
          Địa chỉ chi tiết
          <Input
            className="w-full"
            placeholder="Nhập địa chỉ chi tiết"
            value={address.detailedAddress}
            readOnly
          />
        </label>
      </div>
      <footer className="flex justify-end border-t border-gray-300 bg-gray-100">
        <Button variant="outline" className="my-4" onClick={close}>
          Hủy
        </Button>
        <Button className="m-4">Xác nhận</Button>
      </footer>
    </Modal>
  );
};

const AddressField = ({
  label,
  items,
  value,
}: {
  label: string;
  items: string[];
  value: string;
}) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-gray-600">
    {label}
    <AddressCombobox items={items} placeholder={`Chọn ${label}`} value={value} />
  </label>
);

const getConfidenceColor = (value: number) =>
  value < 75 ? "text-red-700" : value < 95 ? "text-yellow-600" : "text-green-600";

const getConfidenceLabel = (value: number) =>
  value < 75 ? "Rủi ro cao" : value < 95 ? "Cần lưu ý" : "Tin cậy cao";

export default DetailAddressModal;
