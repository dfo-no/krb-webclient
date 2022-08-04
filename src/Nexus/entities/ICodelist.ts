import CustomJoi from '../../common/CustomJoi';
import { BaseCodeSchema, ICode } from './ICode';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { Parentable } from '../../models/Parentable';
import { t } from 'i18next';

export interface ICodelist extends IBaseModel {
  id: string;
  title: string;
  description: string;
  codes: Parentable<ICode>[];
}

export const CodelistSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  codes: CustomJoi.validateItems(BaseCodeSchema, t('Codes')),
  type: CustomJoi.validateType(ModelType.codelist),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});

export const PostCodelistSchema = CodelistSchema.keys({
  id: CustomJoi.validateEmptyId()
});
