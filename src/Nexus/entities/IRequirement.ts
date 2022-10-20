import CustomJoi from '../Joi/CustomJoi';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { IVariant, VariantSchema } from './IVariant';
import { ModelType } from '../enums';

export interface IRequirement extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  variants: IVariant[];
  tags: string[];
}

export const BaseRequirementSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  needId: CustomJoi.validateId(),
  variants: CustomJoi.validateUniqueArray(VariantSchema),
  tags: CustomJoi.validateIdArray(),
  type: CustomJoi.validateType(ModelType.requirement),
});
