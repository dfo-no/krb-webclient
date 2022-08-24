import CustomJoi from '../Joi/CustomJoi';
import { BaseCodeSchema, ICode } from './ICode';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';

export interface ICodelist extends IBaseModel {
  id: string;
  title: string;
  description: string;
  codes: Parentable<ICode>[];
}

export const CodelistSchema = BaseModelSchema.keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  codes: CustomJoi.validateUniqueArray(BaseCodeSchema),
  type: CustomJoi.validateType(ModelType.codelist),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId()
});

export const PostCodelistSchema = CodelistSchema.keys({
  id: CustomJoi.validateEmptyId()
});
