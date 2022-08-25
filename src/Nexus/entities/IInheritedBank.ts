import { BaseModelSchema, IBaseModel } from './IBaseModel';
import CustomJoi from '../Joi/CustomJoi';
import { ModelType } from '../enums';

export interface IInheritedBank extends IBaseModel {
  title: string;
  description: string;
  date: string;
  projectId: string;
}

export const BaseInheritedBankSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  type: CustomJoi.validateType(ModelType.inheritedBank),
  date: CustomJoi.validateDate(),
  projectId: CustomJoi.validateParentId()
});
