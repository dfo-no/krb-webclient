import { BaseModel } from './BaseModel';

export type Nestable<T extends BaseModel> = T & {
  parent: string;
  children?: Nestable<T>[];
};
