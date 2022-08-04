import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { IVariant, VariantSchema } from './IVariant';
import { ModelType } from '../../enums';
import { t } from 'i18next';

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
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  needId: CustomJoi.validateNeedId(),
  variants: CustomJoi.validateItems(VariantSchema, t('Variants')),
  tags: CustomJoi.validateItems(CustomJoi.string(), t('Tags')),
  type: CustomJoi.validateType(ModelType.requirement),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});

export const PutRequirementSchema = BaseRequirementSchema;

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: CustomJoi.validateEmptyId()
});
