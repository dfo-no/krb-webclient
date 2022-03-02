import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type BaseModelWithTitleAndDesc = IBaseModel & {
  title: string;
  description?: string;
};
