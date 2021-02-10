import { Requirement } from './Requirement';

export interface Need {
  id: number;
  tittel: string;
  beskrivelse?: string;
  needs?: Need[];
  requirements: Requirement[];
}
