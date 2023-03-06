import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type Nestable<T extends IBaseModel> = T & {
  parent: string;
  children: Nestable<T>[];
  level: number;
};

export type NestableKRB858<T> = T & {
  parent: string;
  children: NestableKRB858<T>[];
  level: number;
};
