import CustomJoi from '../../common/CustomJoi';
import { BaseCodeSchema, ICode } from './ICode';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';
import { Parentable } from '../../models/Parentable';

export interface ICodelist extends IBaseModel {
  id: string;
  title: string;
  description: string;
  codes: Parentable<ICode>[];
}

export const CodelistSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  codes: CustomJoi.array().items(BaseCodeSchema).required(),
  type: CustomJoi.string().equal(ModelType.codelist).required(),
  sourceOriginal: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  sourceRel: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required()
});

export const PostCodelistSchema = CodelistSchema.keys({
  id: CustomJoi.string().equal('').required()
});
