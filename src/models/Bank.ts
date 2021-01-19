import { Behov } from './Behov';
import { Codelist } from './Codelist';
import { Krav } from './Krav';

export interface Bank {
  id: number;
  title: string;
  description: string;
  behov: Behov[];
  krav?: Krav[];
  codelist?: Codelist[];
  ordering?: number;
}
