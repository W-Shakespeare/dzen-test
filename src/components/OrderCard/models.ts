export interface IOrderCardProps {
  title: string;
  date: string; // ISO строка
  productCount: number;
  onSave: (updatedTitle: string, updatedDate: string) => void;
  onSelectedOrder: (id: string) => void;
  _id: string;
  isShowProductByOrder: boolean;
  totalUSD: number;
  totalOtherCurrency: number;
  onDelete: (id: string) => void;
  isOpenCard: boolean;
}
