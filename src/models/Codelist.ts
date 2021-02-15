import { Code } from './Code';

export interface Codelist {
  id: string;
  title: string;
  description: string;
  codes: Code[];
}
