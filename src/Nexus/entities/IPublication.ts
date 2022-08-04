import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { t } from 'i18next';

export const BasePublicationSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  comment: CustomJoi.validateText(t('Comment')),
  date: CustomJoi.validateDate(),
  version: CustomJoi.validateVersion(),
  bankId: CustomJoi.validateBankId(),
  type: CustomJoi.validateType(ModelType.publication),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});

export const PostPublicationSchema = BasePublicationSchema.keys({
  id: CustomJoi.validateEmptyId(),
  date: CustomJoi.validateEmptyDate()
});

export const PutPublicationSchema = BasePublicationSchema.keys();

export interface IPublication extends IBaseModel {
  id: string;
  comment: string;
  date: string | null;
  version: number;
  bankId: string;
}
