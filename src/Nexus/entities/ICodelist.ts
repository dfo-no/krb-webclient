import CustomJoi from '../Joi/CustomJoi';
import { BaseCodeSchema } from './ICode';
import { Code } from '../../api/openapi-fetch';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';

export interface ICodelist extends IBaseModel {
  id: string;
  title: string;
  description: string;
  codes: Code[];
}

export const CodelistSchema = BaseModelSchema.keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  codes: CustomJoi.validateUniqueArray(BaseCodeSchema),
  type: CustomJoi.validateType(ModelType.codelist),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId(),
});
