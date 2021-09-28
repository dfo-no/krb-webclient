import Joi from 'joi';
import { BaseBankSchema } from './Bank';
import ModelType from './ModelType';
import { PutPublicationSchema } from './Publication';

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
