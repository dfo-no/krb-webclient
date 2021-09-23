import { BaseModel } from './BaseModel';

export type Levelable<T extends BaseModel> = T & {
  parent: string;
  level: number;
};
