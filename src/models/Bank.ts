import { Need } from './Need';
import { Codelist } from './Codelist';
import { Publication } from './Publication';
import { Product } from './Product';
import { BaseModel } from './BaseModel';

export interface Bank extends BaseModel {
  id: string;
  title: string;
  description: string;
  needs: Need[];
  codelist: Codelist[];
  products: Product[];
  version: number;
  publications?: Publication[];
  publishedDate?: string;
}
