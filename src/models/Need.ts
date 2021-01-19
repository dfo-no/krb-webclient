import { Krav } from './Krav';

export interface Need {
  id: number;
  tittel: string;
  beskrivelse?: string;
  needs?: Need[];
  order?: number;
  krav?: Krav[];
}
