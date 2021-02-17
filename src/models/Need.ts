import { BaseModel } from './BaseModel';
import { Requirement } from './Requirement';

export interface Need extends BaseModel {
  id: string;
  title: string;
  description: string;
  needs: Need[];
  requirements: Requirement[];
}
