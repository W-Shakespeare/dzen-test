import { IProduct } from "../../../../models/IProduct";

export interface OrderProductsModalProps {
  show: boolean;
  onHide: () => void;
  orderId: string;
  products: IProduct[];
  isLoading: boolean;
  isError: boolean;
  currTab: string;
  setCurrTab: (k: string) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  register: any;
  handleSubmit: any;
  control: any;
  setValue: any;
  reset: any;
  errors: any;
  createProduct: any;
  isCreateProductLoading: boolean;
  deleteProduct: any;
  filteredProducts: IProduct[];
  onAddProductsToOrder: (ids: string[]) => void;
  onSubmit: (data: any) => void;
  selectedProductsIds: string[];
  setSelectedProductsIds: (ids: string[]) => void;
  handleToggleSelectProduct: (id: string) => void;
}
