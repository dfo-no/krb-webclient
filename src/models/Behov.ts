import { Krav } from './Krav';

export interface Behov {
  id: number;
  tittel: string;
  beskrivelse?: string;
  underbehov?: Behov[];
  order?: number;
  krav?: Krav[];
}
