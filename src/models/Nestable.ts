import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type Nestable<T extends IBaseModel> = T & {
  parent: string;
  children: Nestable<T>[];
  level: number;
};
