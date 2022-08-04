import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { t } from 'i18next';

export interface ICode extends IBaseModel {
  id: string;
  title: string;
  description: string;
}

export const BaseCodeSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  type: CustomJoi.validateType(ModelType.code),
  parent: CustomJoi.validateParent(),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});

export const PostCodeSchema = BaseCodeSchema.keys({
  id: CustomJoi.validateEmptyId().required()
});
