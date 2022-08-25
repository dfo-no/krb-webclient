import CustomJoi from '../Joi/CustomJoi';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';

export interface ITag extends IBaseModel {
  title: string;
  description?: string;
}

export const BaseTagSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  parent: CustomJoi.validateParentId(),
  type: CustomJoi.validateType(ModelType.tag)
});
