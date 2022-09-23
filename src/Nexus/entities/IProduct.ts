import CustomJoi from '../Joi/CustomJoi';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';

export interface IProduct extends IBaseModel {
  id: string;
  title: string;
  description: string;
  parent: string;
  children?: [];
  deletedDate: string | null;
  unit?: string;
}

export const BaseProductSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  parent: CustomJoi.validateParentId(),
  type: CustomJoi.validateType(ModelType.product),
  deletedDate: CustomJoi.validateOptionalDate(),
  unit: CustomJoi.validateOptionalText()
});
