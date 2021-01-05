import { Behov } from './Behov';
import { Katalog } from './Katalog';
import { Kodeliste } from './Kodeliste';
import { Krav } from './Krav';

export interface Kravbank {
  id: number;
  tittel: string;
  beskrivelse: string;
  behov: Katalog<Behov>;
  krav?: Krav[];
  kodeliste?: Katalog<Kodeliste>;
  ordering?: number;
}
