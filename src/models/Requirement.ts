import { BaseModel } from './BaseModel';

export interface Requirement extends BaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  kind: string;
}
