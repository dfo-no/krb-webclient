import { Code } from './Code';

export interface Codelist {
  id: number;
  title: string;
  description: string;
  codes: Code[];
}
