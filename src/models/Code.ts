import Joi from 'joi';
import { BaseModel } from './BaseModel';
import ModelType from './ModelType';

export interface Code extends BaseModel {
  id: string;
  title: string;
  description: string;
}

export const BaseCodeSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  type: Joi.string().equal(ModelType.code).required(),
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array()
});

export const PostCodeSchema = BaseCodeSchema.keys({
  id: Joi.string().equal('').required()
});

export const EditCodeSchema = BaseCodeSchema.keys({
  id: Joi.string().length(36).required()
});
