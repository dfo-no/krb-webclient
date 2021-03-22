import { BaseModel } from './BaseModel';

export interface Product extends BaseModel {
  id: string;
  title: string;
  description: string;
  parent: string;
}
