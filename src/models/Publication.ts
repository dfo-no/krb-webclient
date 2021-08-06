import Joi from 'joi';
import { BaseModel } from './BaseModel';
import ModelType from './ModelType';

export const BasePublicationSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  comment: Joi.string().required(),
  date: Joi.date().iso().required(),
  version: Joi.number().min(1).required(),
  bankId: Joi.string().length(36).required(),
  type: Joi.string().equal(ModelType.publication).required()
});

export const PostPublicationSchema = BasePublicationSchema.keys({
  id: Joi.string().allow('').required(),
  date: Joi.string().valid('')
});

export const PutPublicationSchema = BasePublicationSchema.keys({
  id: Joi.string().min(36).max(36).required()
});

export interface Publication extends BaseModel {
  id: string;
  comment: string;
  date: string;
  version: number;
  bankId: string;
}
