import { Katalog } from './Katalog';

export interface Behov {
  id: number;
  tittel: string;
  beskrivelse?: string;
  underbehov?: Katalog<Behov>;
  order?: number;
}
