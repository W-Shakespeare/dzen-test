import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddProductsToOrderMutation,
  useGetOrderProductIdsQuery,
} from "../../../../services/Order";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../../services/Products";
import { toast } from "react-toastify";
import { schema } from "./schema";
import OrderProductsModal from "./OrderProductsModal";

interface OrderProductsModalContainerProps {
  show: boolean;
  onHide: () => void;
  orderId: string;
}

const OrderProductsModalContainer: React.FC<
  OrderProductsModalContainerProps
> = (props) => {
  const { orderId } = props;

  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [currTab, setCurrTab] = useState("existProducts");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProductsToOrder] = useAddProductsToOrderMutation();
  const { data: orderProductIds } = useGetOrderProductIdsQuery(orderId);

  const filteredProducts = products?.filter(
    (product) => !orderProductIds?.includes(product._id)
  );

  const onAddProductsToOrder = (productsToAdd: string[]) => {
    addProductsToOrder({
      orderId,
      productsToAdd,
    })
      .unwrap()
      .then(() => {
        toast.success("Продукт успешно добавлен в заказ!");
        setSelectedProductsIds([]);
      })
      .catch(() => toast.error("Ошибка при добавлении продукта в заказ"));
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const guaranteeStart = data.guaranteeStart
      ? data.guaranteeStart.toISOString()
      : null;
    const guaranteeEnd = data.guaranteeEnd
      ? data.guaranteeEnd.toISOString()
      : null;

    formData.append("title", data.title);
    formData.append("serialNumber", data.serialNumber);
    formData.append("type", data.type);
    formData.append("specification", data.specification);
    formData.append("guaranteeStart", guaranteeStart);
    formData.append("guaranteeEnd", guaranteeEnd);
    formData.append("isNew", data.isNew);
    formData.append(
      "price",
      JSON.stringify([
        { value: data.priceUsd, symbol: "USD" },
        { value: data.priceUah, symbol: "UAH" },
      ])
    );

    if (data?.photo) {
      formData.append("photo", data.photo);
    }

    try {
      await createProduct(formData)
        .unwrap()
        .then((res) => {
          toast.success("Продукт успешно создан!");

          if (!res?._id || !orderId) return;

          onAddProductsToOrder([res._id]);

          reset();
          setImagePreview(null);
        });
    } catch (error) {
      toast.error("Ошибка при создании продукта");
    }
  };

  const hideAndResetModal = () => {
    setImagePreview(null);
    reset();
    props.onHide();
  };

  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([]);

  const handleToggleSelectProduct = (productId: string) => {
    setSelectedProductsIds((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const orderProductProps = {
    ...props,
    products,
    isLoading,
    isError,
    currTab,
    setCurrTab,
    imagePreview,
    setImagePreview,
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    errors,
    createProduct,
    isCreateProductLoading,
    deleteProduct,
    filteredProducts,
    onAddProductsToOrder,
    onSubmit,
    selectedProductsIds,
    setSelectedProductsIds,
    handleToggleSelectProduct,
    onHide: hideAndResetModal,
  };

  return <OrderProductsModal {...orderProductProps} />;
};

export default OrderProductsModalContainer;
