import CustomJoi from '../Joi/CustomJoi';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';

export interface ICode extends IBaseModel {
  id: string;
  title: string;
  description: string;
}

export const BaseCodeSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  type: CustomJoi.validateType(ModelType.code),
  parent: CustomJoi.validateParentId(),
});

export const PostCodeSchema = BaseCodeSchema.keys({
  id: CustomJoi.validateEmptyId(),
});
