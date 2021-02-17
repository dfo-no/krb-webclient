import { Codelist } from './Codelist';

export interface CodelistAlternative {
  type: string;
  codelist: Codelist;
}

export interface ValueAlternative {
  type: string;
  step: number;
  min: number;
  max: number;
  unit: number;
}
