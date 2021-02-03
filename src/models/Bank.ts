import { Need } from './Need';
import { Codelist } from './Codelist';
import { Publication } from './Publication';
import { Product } from './Product';

export interface Bank {
  id: number;
  title: string;
  description: string;
  needs: Need[];
  codelist: Codelist[];
  products: Product[];
  version: number;
  publications?: Publication[];
  publishedDate?: string;
}
