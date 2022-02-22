import CustomJoi from '../../common/CustomJoi';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { IBaseModel } from './IBaseModel';
import { BaseCodeSchema, ICode } from './ICode';

export interface ICodelist extends IBaseModel {
  id: string;
  title: string;
  description: string;
  codes: Parentable<ICode>[];
}

export const CodelistSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  codes: CustomJoi.array().items(BaseCodeSchema).required(),
  type: CustomJoi.string().equal(ModelType.codelist).required(),
  sourceOriginal: CustomJoi.string().required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PostCodelistSchema = CodelistSchema.keys({
  id: CustomJoi.string().equal('').required()
});
