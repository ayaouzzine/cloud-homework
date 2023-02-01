import { IProductCategory } from 'app/shared/model/productorder/product-category.model';
import { ProductSize } from 'app/shared/model/enumerations/product-size.model';

export interface IProduct {
  id?: number;
  sku?: string;
  upc?: string;
  name?: string;
  description?: string | null;
  price?: number;
  productSize?: ProductSize;
  colors?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  imageSha1?: string | null;
  imageCdnUrl?: string | null;
  thumbnailSha1?: string | null;
  thumbnailCdnUrl?: string | null;
  productCategory?: IProductCategory | null;
}

export const defaultValue: Readonly<IProduct> = {};
