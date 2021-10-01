import Joi from 'joi';
import { BaseModel } from './BaseModel';
import ModelType from './ModelType';

export const BasePublicationSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  comment: Joi.string().required(),
  date: Joi.date().iso().required(),
  version: Joi.number().min(1).required(),
  bankId: Joi.string().length(36).required(),
  type: Joi.string().equal(ModelType.publication).required(),
  source_original: Joi.string().allow(null).required(),
  source_rel: Joi.string().allow(null).required()
});

export const PostPublicationSchema = BasePublicationSchema.keys({
  id: Joi.string().valid('').required(),
  date: Joi.alternatives([Joi.date(), Joi.string().valid('')]).required()
});

export const PutPublicationSchema = BasePublicationSchema.keys({
  id: Joi.string().min(36).max(36).required()
});

export const PutPublicationSchemaArray = Joi.object().keys({
  publications: Joi.array()
    .ordered(PostPublicationSchema)
    .items(PutPublicationSchema)
    .unique('id')
    .unique('version')
    .unique('date')
});

export interface Publication extends BaseModel {
  id: string;
  comment: string;
  date: string;
  version: number;
  bankId: string;
}
