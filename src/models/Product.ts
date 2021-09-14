import Joi from 'joi';
import { BaseModel } from './BaseModel';
import ModelType from './ModelType';

export interface Product extends BaseModel {
  id: string;
  title: string;
  description: string;
  parent: string;
  children?: [];
}

export const BaseProductSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  parent: Joi.string().allow(null, '').required(),
  type: Joi.string().equal(ModelType.product).required()
});

export const PostProductSchema = BaseProductSchema.keys({
  id: Joi.string().equal('').required(),
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});

export const PutProductSchema = BaseProductSchema.keys({
  id: Joi.string().length(36).required(),
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});
