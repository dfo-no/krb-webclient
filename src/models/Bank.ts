import { Need } from './Need';
import { Codelist } from './Codelist';
import { Publication } from './Publication';
import { Product } from './Product';
import { BaseModel } from './BaseModel';
import { Nestable } from './Nestable';

export interface Bank extends BaseModel {
  id: string;
  title: string;
  description: string;
  needs: Nestable<Need>[];
  codelist: Codelist[];
  products: Product[];
  version: number;
  publications?: Publication[];
  publishedDate?: string;
}
