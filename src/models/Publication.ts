import { BaseModel } from './BaseModel';

export interface Publication extends BaseModel {
  id: string;
  comment: string;
  date: string;
  version: number;
  bankId: string;
}
