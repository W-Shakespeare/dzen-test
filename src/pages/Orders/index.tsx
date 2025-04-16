import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useDeleteOrderMutation,
  useDeleteProductFromOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../../services/Order";
import { IOrder, IUpdateOrder } from "../../models/IOrder";
import { toast } from "react-toastify";

import Orders from "./Orders";
import Loading from "../../components/Loading/Loading";
import OrderProductsModal from "./components/OrderProductsModal/";
import OrderModal from "./components/OrderModal/OrderModal";

const OrdersContainer = () => {
  const { data: orders = [], isFetching } = useGetOrdersQuery("");
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [deleteProductFromOrder] = useDeleteProductFromOrderMutation();

  const [isShowProductByOrder, setIsShowProductByOrder] = useState(false);
  const [currOrder, setCurrOrder] = useState<IOrder>();

  const [isShowModalOrderProduct, setIsShowModalOrderProduct] = useState(false);
  const [isShowModalOrder, setIsShowModalOrder] = useState(false);

  useEffect(() => {
    if (orders.length == 0 || !currOrder) return;
    const updatedOrder = orders.find((o) => o._id === currOrder._id);
    if (updatedOrder) setCurrOrder(updatedOrder);
  }, [orders]);

  const onUpdateOrder = (id: string, order: IUpdateOrder) => {
    updateOrder({ id, order });
  };

  const onSelectedOrder = (id: string) => {
    const order = orders?.find((order) => order._id === id);
    order && setCurrOrder(order);
    if (currOrder?._id == id || !currOrder?._id)
      setIsShowProductByOrder((pre) => !pre);
  };

  const onRemoveProductFromOrder =
    (orderId: string) => async (productsToRemove: string) => {
      await deleteProductFromOrder({
        orderId,
        productsToRemove: [productsToRemove],
      })
        .unwrap()
        .then(() => {
          toast.success("Продукт успешно удалён");
        })
        .catch(() => {
          toast.error("Ошибка при удалении продукта");
        });
    };

  const onDeleteOrder = (id: string) => {
    deleteOrder(id)
      .unwrap()
      .then(() => {
        toast.success("Order deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete order");
      });
  };

  const onShowModuleCreateOrderProduct = () => setIsShowModalOrderProduct(true);
  const onShowCreateModal = () => setIsShowModalOrder(true);

  const orderProps = {
    orders,
    currOrder,
    isShowProductByOrder,
    onSelectedOrder,
    onUpdateOrder,
    onRemoveProductFromOrder,
    onDeleteOrder,
    onShowModuleCreateOrderProduct,
    onShowCreateModal,
  };

  return (
    <>
      {currOrder?._id &&
        createPortal(
          <OrderProductsModal
            onHide={() => setIsShowModalOrderProduct(false)}
            show={isShowModalOrderProduct}
            orderId={currOrder._id}
          />,
          document.body
        )}

      {createPortal(
        <OrderModal
          onHide={() => setIsShowModalOrder(false)}
          show={isShowModalOrder}
        />,
        document.body
      )}

      {isFetching && <Loading />}

      <Orders {...orderProps} />
    </>
  );
};

export default OrdersContainer;
