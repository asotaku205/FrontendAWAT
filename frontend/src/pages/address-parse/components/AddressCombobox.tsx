import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../components/ui/combobox";

type AddressComboboxProps = {
  items: string[];
  placeholder: string;
  value?: string;
};

const AddressCombobox = ({ items, placeholder, value }: AddressComboboxProps) => (
  <Combobox items={items} value={value}>
    <ComboboxInput placeholder={placeholder} showClear />
    <ComboboxContent>
      <ComboboxEmpty>Không tìm thấy kết quả.</ComboboxEmpty>
      <ComboboxList>
        {(item) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
);

export default AddressCombobox;
