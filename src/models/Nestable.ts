import { BaseModel } from './BaseModel';

export type Nestable<T extends BaseModel> = T & {
  parent: string;
  children?: Nestable<T>[];
  // TODO: make level mandatory when all Utils functions has been fixed
  level?: number;
};
