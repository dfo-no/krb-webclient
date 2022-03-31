import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type Parentable<T extends IBaseModel> = T & {
  parent: string;
};
