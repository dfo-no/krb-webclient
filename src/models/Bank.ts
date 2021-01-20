import { Need } from './Need';
import { Codelist } from './Codelist';
import { Krav } from './Krav';
import { Publication } from './Publication';

export interface Bank {
  id: number;
  title: string;
  description: string;
  needs: Need[];
  krav?: Krav[];
  codelist?: Codelist[];
  version: number;
  publications?: Publication[];
}
