import Joi from 'joi';
import { BaseBankSchema } from './IBank';
import { PutPublicationSchema } from './IPublication';
import ModelType from './ModelType';

export const EditProjectSchema = BaseBankSchema.keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(ModelType.bank).required(),
  needs: Joi.array(),
  publications: Joi.array()
    .items(PutPublicationSchema)
    .unique('id')
    .unique('version')
    .unique('date')
});

export const PutProjectSchema = BaseBankSchema.keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(ModelType.bank).required(),
  publications: Joi.array()
    .items(PutPublicationSchema)
    .unique('id')
    .unique('version')
    .unique('date')
});

export const PostProjectSchema = BaseBankSchema.keys({
  id: Joi.string().equal('').required(),
  description: Joi.string().allow('').required(),
  publishedDate: Joi.string().equal(null).required()
});
