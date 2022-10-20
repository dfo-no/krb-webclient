import CustomJoi from '../Joi/CustomJoi';
import { BaseRequirementSchema, IRequirement } from './IRequirement';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';

export interface INeed extends IBaseModel {
  title: string;
  description: string;
  requirements: IRequirement[];
}

export const BaseNeedSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  requirements: CustomJoi.validateUniqueArray(BaseRequirementSchema),
  type: CustomJoi.validateType(ModelType.need),
  parent: CustomJoi.validateParentId(),
});

export const PostNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.validateEmptyId(),
});
