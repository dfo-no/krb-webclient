import { BaseModel } from './BaseModel';
import { Code } from './Code';

export interface Codelist extends BaseModel {
  id: string;
  title: string;
  description: string;
  codes: Code[];
}
