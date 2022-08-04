import CustomJoi from '../../common/CustomJoi';
import { BaseRequirementSchema, IRequirement } from './IRequirement';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { t } from 'i18next';

export interface INeed extends IBaseModel {
  title: string;
  description: string;
  requirements: IRequirement[];
}

export const BaseNeedSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  requirements: CustomJoi.validateItems(
    BaseRequirementSchema,
    t('Requirements')
  ),
  type: CustomJoi.validateType(ModelType.need),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource(),
  parent: CustomJoi.validateParent()
});

export const PostNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.validateEmptyId()
});
