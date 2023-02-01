import { IProductOrder } from 'app/shared/model/productorder/product-order.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomer {
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
  orders?: IProductOrder[] | null;
}

export const defaultValue: Readonly<ICustomer> = {};
