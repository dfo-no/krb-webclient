import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { t } from 'i18next';

export interface ITag extends IBaseModel {
  title: string;
  description?: string;
}

export const BaseTagSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  parent: CustomJoi.validateParent(),
  type: CustomJoi.validateType(ModelType.tag),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});

export const PostTagSchema = BaseTagSchema.keys({
  id: CustomJoi.validateEmptyId()
});
