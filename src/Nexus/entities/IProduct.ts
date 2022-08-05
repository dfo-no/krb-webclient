import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { t } from 'i18next';

export interface IProduct extends IBaseModel {
  id: string;
  title: string;
  description: string;
  parent: string;
  children?: [];
  deletedDate: string | null;
}

export const BaseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  parent: CustomJoi.validateParentId(),
  type: CustomJoi.validateType(ModelType.product),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId(),
  deletedDate: CustomJoi.validateOptionalDate()
});

export const PostProductSchema = BaseProductSchema.keys({
  id: CustomJoi.validateEmptyId()
});
