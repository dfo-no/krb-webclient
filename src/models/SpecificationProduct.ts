import { BaseModel } from './BaseModel';
import { Product } from './Product';

export interface SpecificationProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  amount: number;
}
