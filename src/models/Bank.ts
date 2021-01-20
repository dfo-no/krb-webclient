import { Behov } from './Behov';
import { Codelist } from './Codelist';
import { Krav } from './Krav';
import { Publication } from './Publication';

export interface Bank {
  id: number;
  title: string;
  description: string;
  behov: Behov[];
  krav?: Krav[];
  codelist?: Codelist[];
  version?: number;
  publications?: Publication[];
}
