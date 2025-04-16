import { IOrder } from "../../models/IOrder";

export interface OrdersProps {
  orders: IOrder[];
  currOrder?: IOrder;
  isShowProductByOrder: boolean;
  onSelectedOrder: (id: string) => void;
  onUpdateOrder: (id: string, order: { title: string; date: string }) => void;
  onRemoveProductFromOrder: (orderId: string) => (productId: string) => void;
  onDeleteOrder: (id: string) => void;
  onShowModuleCreateOrderProduct: () => void;
  onShowCreateModal: () => void;
}
