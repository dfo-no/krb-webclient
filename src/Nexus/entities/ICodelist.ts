import Joi from 'joi';
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

export const CodelistSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  codes: Joi.array().items(BaseCodeSchema).required(),
  type: Joi.string().equal(ModelType.codelist).required(),
  sourceOriginal: Joi.string().required(),
  sourceRel: Joi.string().allow(null).required()
});

export const PostCodelistSchema = CodelistSchema.keys({
  id: Joi.string().equal('').required()
});
