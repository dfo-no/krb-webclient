import { Behov } from './Behov';
import { Kodeliste } from './Kodeliste';
import { Krav } from './Krav';

interface mymap<T> {
  [key: string]: T;
}

export interface Kravbank {
  id: string;
  tittel: string;
  beskrivelse: string;
  behov: Behov[];
  krav?: Krav[];
  kodeliste?: mymap<Kodeliste>;
  ordering?: number;
}
