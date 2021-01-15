import { Behov } from './Behov';
import { Codelist } from './Codelist';
import { Krav } from './Krav';

export interface Kravbank {
  id: number;
  tittel: string;
  beskrivelse: string;
  behov: Behov[];
  krav: Krav[];
  codelist: Codelist[];
  ordering: number;
}
