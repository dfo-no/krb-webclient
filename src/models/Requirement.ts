import { RequirementLayout } from './RequirementLayout';
import { BaseModel } from './BaseModel';

export interface Requirement extends BaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  layouts: RequirementLayout[];
  kind: string;
}
