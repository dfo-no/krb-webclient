import Joi from 'joi';
import { IBaseModel } from './IBaseModel';
import ModelType from './ModelType';

export interface ITag extends IBaseModel {
  title: string;
  id: string;
}

export const BaseTagSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().allow('').required(),
  type: Joi.string().equal(ModelType.tag).required(),
  sourceOriginal: Joi.string().required(),
  sourceRel: Joi.string().allow(null).required()
});

export const PostTagSchema = BaseTagSchema.keys({
  id: Joi.string().equal('').required(),
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});

export const PutTagSchema = BaseTagSchema.keys({
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});
