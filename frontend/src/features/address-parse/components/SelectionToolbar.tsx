import { Button } from "../../../components/Button";

const SelectionToolbar = ({
  count,
  actionLabel,
  onAction,
  onClear,
}: {
  count: number;
  actionLabel: string;
  onAction: () => void;
  onClear: () => void;
}) => (
  <div className="flex items-center bg-white text-sm font-semibold text-gray-600">
    <span className="my-4 px-5">{count} dòng đã được chọn</span>
    <Button className="mx-2 my-4" onClick={onAction}>
      {actionLabel}
    </Button>
    <Button variant="secondary" className="mx-2 my-4" onClick={onClear}>
      Bỏ chọn
    </Button>
  </div>
);

export default SelectionToolbar;
