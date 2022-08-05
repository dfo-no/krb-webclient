import CustomJoi from '../../common/CustomJoi';
import { BaseRequirementSchema, IRequirement } from './IRequirement';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export interface INeed extends IBaseModel {
  title: string;
  description: string;
  requirements: IRequirement[];
}

export const BaseNeedSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  requirements: CustomJoi.validateItems(BaseRequirementSchema),
  type: CustomJoi.validateType(ModelType.need),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId(),
  parent: CustomJoi.validateParentId()
});

export const PostNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.validateEmptyId()
});
