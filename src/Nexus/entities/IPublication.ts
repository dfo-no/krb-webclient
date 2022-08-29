import CustomJoi from '../Joi/CustomJoi';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';

export interface IPublication extends IBaseModel {
  id: string;
  comment: string;
  date: string | null;
  version: number;
  bankId: string;
  deletedDate?: string | null;
}

export const BasePublicationSchema = BaseModelSchema.keys({
  comment: CustomJoi.validateText(),
  date: CustomJoi.validateOptionalDate(),
  version: CustomJoi.validateVersion(),
  bankId: CustomJoi.validateId(),
  type: CustomJoi.validateType(ModelType.publication),
  deletedDate: CustomJoi.validateOptionalDate()
});
