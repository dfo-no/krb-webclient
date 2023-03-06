import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type Parentable<T extends IBaseModel> = T & {
  parent: string;
};

export type ParentableKRB858 = {
  parent: string;
};

// export type ParentableKRB858<T> = T & {
//   parent: string;
// };
