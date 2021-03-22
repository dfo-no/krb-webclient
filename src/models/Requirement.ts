import { IVariant } from './IVariant';
import { BaseModel } from './BaseModel';
import RequirementType from './RequirementType';

export interface Requirement extends BaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  layouts: IVariant[];
  kind: string;
  requirement_Type: RequirementType;
}
