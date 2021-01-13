import { Kode } from './Kode';

export interface Kodeliste {
  id: number;
  tittel: string;
  beskrivelse: string;
  koder: Kode[];
}
