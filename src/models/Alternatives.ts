import { Codelist } from './Codelist';

export interface CodelistAlternative {
  id: string;
  type: string;
  codelist: Codelist;
}

export interface ValueAlternative {
  id: string;
  type: string;
  step: number;
  min: number;
  max: number;
  unit: string;
}
