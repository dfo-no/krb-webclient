import { Behov } from './Behov';
import { Kodeliste } from './Kodeliste';
import { Krav } from './Krav';

export interface Kravbank {
  id: number;
  tittel: string;
  beskrivelse: string;
  behov: Behov[];
  krav: Krav[];
  kodeliste: Kodeliste[];
  ordering: number;
}
