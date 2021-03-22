import { BaseModel } from './BaseModel';

export interface Code extends BaseModel {
  id: string;
  title: string;
  description: string;
}
