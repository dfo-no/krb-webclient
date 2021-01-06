import { Katalog } from './Katalog';
import { Krav } from './Krav';

export interface Behov {
  id: number;
  tittel: string;
  beskrivelse?: string;
  underbehov?: Katalog<Behov>;
  order?: number;
  krav?: Katalog<Krav>;
}
