import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type Levelable<T extends IBaseModel> = T & {
  parent: string;
  level: number;
};

export type LevelableKRB858<T> = T & {
  parent: string;
  level: number;
};
