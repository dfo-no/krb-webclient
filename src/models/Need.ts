import { BaseModel } from './BaseModel';
import { Hierarchical } from './Hierarchical';
import { Requirement } from './Requirement';

export interface Need extends BaseModel, Hierarchical {
  title: string;
  description: string;
  requirements: Requirement[];
}
