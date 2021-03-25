import Joi from 'joi';
import { BaseModel } from './BaseModel';
import MODELTYPE from './ModelType';

export const PublicationSchema = Joi.object().keys({
  id: Joi.string().required(),
  comment: Joi.string().required().messages({
    'string.empty': `'Comment' should be a type of 'text'`,
    'any.required': 'Comment is required'
  }),
  date: Joi.date().iso().required(),
  version: Joi.number().min(1).required(),
  bankId: Joi.string().required(),
  type: Joi.string().equal(MODELTYPE.publication).required()
});

export interface Publication extends BaseModel {
  id: string;
  comment: string;
  date: string;
  version: number;
  bankId: string;
}
