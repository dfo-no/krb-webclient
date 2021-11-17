import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type Nestable<T extends IBaseModel> = T & {
  parent: string;
  children?: Nestable<T>[];
  // TODO: make level mandatory when all Utils functions has been fixed
  level?: number;
};
