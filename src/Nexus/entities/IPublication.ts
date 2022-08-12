import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export const BasePublicationSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  comment: CustomJoi.validateText(),
  date: CustomJoi.validateDate(),
  version: CustomJoi.validateVersion(),
  bankId: CustomJoi.validateId(),
  type: CustomJoi.validateType(ModelType.publication),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId(),
  deletedDate: CustomJoi.validateOptionalDate()
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
  deletedDate?: string | null;
}
