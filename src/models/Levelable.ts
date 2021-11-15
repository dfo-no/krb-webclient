import { IBaseModel } from './IBaseModel';

export type Levelable<T extends IBaseModel> = T & {
  parent: string;
  level: number;
};
