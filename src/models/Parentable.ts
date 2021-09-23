import { BaseModel } from './BaseModel';

export type Parentable<T extends BaseModel> = T & {
  parent: string;
};
