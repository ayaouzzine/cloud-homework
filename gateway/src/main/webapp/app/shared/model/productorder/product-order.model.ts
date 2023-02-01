import dayjs from 'dayjs';
import { IOrderItem } from 'app/shared/model/productorder/order-item.model';
import { ICustomer } from 'app/shared/model/productorder/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IProductOrder {
  id?: number;
  placedDate?: string;
  status?: OrderStatus;
  invoiceId?: number | null;
  code?: string;
  orderItems?: IOrderItem[] | null;
  customer?: ICustomer | null;
}

export const defaultValue: Readonly<IProductOrder> = {};
