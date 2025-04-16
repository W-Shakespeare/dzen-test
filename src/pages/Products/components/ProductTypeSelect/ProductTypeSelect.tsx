import { Form } from "react-bootstrap";
import { useGetProductTypesQuery } from "../../../../services/Products";

type ProductTypeSelectProps = {
  onSelect: (value: string) => void;
  value?: string;
  isInvalid?: boolean;
};

export const ProductTypeSelect: React.FC<ProductTypeSelectProps> = ({
  onSelect,
  isInvalid,
}: any) => {
  const { data: productTypes = [] } = useGetProductTypesQuery();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value", e.target.value);
    onSelect(e.target.value);
  };

  console.log("isInvalid", isInvalid);

  return (
    <Form.Select
      onChange={handleTypeChange}
      aria-label="Выберите тип"
      className={isInvalid ? "is-invalid" : ""}
    >
      <option value="">Выберите тип</option>
      {productTypes.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Form.Select>
  );
};
