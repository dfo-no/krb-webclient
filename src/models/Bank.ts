import { Need } from './Need';
import { Codelist } from './Codelist';
import { Publication } from './Publication';
import { Requirement } from './Requirement';

export interface Bank {
  id: number;
  title: string;
  description: string;
  needs: Need[];
  requirements?: Requirement[];
  codelist: Codelist[];
  version: number;
  publications?: Publication[];
  publishedDate?: string;
}
