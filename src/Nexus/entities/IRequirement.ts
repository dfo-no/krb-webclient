import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { IVariant, VariantSchema } from './IVariant';
import { ModelType } from '../../enums';

export interface IRequirement extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  variants: IVariant[];
  tags: string[];
}

export const BaseRequirementSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  needId: CustomJoi.validateId(),
  variants: CustomJoi.validateItems(VariantSchema),
  tags: CustomJoi.validateItems(CustomJoi.validateIdItems()),
  type: CustomJoi.validateType(ModelType.requirement),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId()
});

export const PutRequirementSchema = BaseRequirementSchema;

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: CustomJoi.validateEmptyId()
});
