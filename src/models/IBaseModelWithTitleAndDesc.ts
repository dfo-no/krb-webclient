import { IBaseModel } from '../Nexus/entities/IBaseModel';

export type IBaseModelWithTitleAndDesc = IBaseModel & {
  title: string;
  description?: string;
};
