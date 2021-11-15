import Joi from 'joi';
import { IBaseModel } from './IBaseModel';
import ModelType from './ModelType';
import { IRequirement } from './Requirement';

export interface INeed extends IBaseModel {
  title: string;
  description: string;
  requirements: IRequirement[];
}

export const BaseNeedSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  requirements: Joi.array().required(),
  type: Joi.string().equal(ModelType.need).required(),
  sourceOriginal: Joi.string().required(),
  sourceRel: Joi.string().allow(null).required()
});

export const PostNeedSchema = BaseNeedSchema.keys({
  id: Joi.string().equal('').required(),
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});

export const PutNeedSchema = BaseNeedSchema.keys({
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});
