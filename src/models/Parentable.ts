import { IBaseModel } from './IBaseModel';

export type Parentable<T extends IBaseModel> = T & {
  parent: string;
};
