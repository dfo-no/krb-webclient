import Joi from 'joi';
import { IBaseModel } from './IBaseModel';
import ModelType from './ModelType';

export const BasePublicationSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  comment: Joi.string().required(),
  date: Joi.date().iso().raw().required(),
  version: Joi.number().min(1).required(),
  bankId: Joi.string().length(36).required(),
  type: Joi.string().equal(ModelType.publication).required(),
  sourceOriginal: Joi.string().allow(null).required(),
  sourceRel: Joi.string().allow(null).required()
});

export const PostPublicationSchema = BasePublicationSchema.keys({
  id: Joi.string().valid('').required(),
  date: Joi.string().allow(null).required()
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

export interface IPublication extends IBaseModel {
  id: string;
  comment: string;
  date: string | null;
  version: number;
  bankId: string;
}
