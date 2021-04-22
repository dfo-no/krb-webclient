import { BaseModel } from './BaseModel';
import { Requirement } from './Requirement';

export interface Need extends BaseModel {
  title: string;
  description: string;
  requirements: Requirement[];
}
