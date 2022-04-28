import { IBaseModel } from '../Nexus/entities/IBaseModel';

export interface IInheritedBank extends IBaseModel {
  title: string;
  description: string;
  date: string;
  projectId: string;
}
