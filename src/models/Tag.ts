import Joi from 'joi';
import { BaseModel } from './BaseModel';
import ModelType from './ModelType';

export interface Tag extends BaseModel {
  title: string;
  id: string;
}

export const BaseTagSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  type: Joi.string().equal(ModelType.tag).required()
});

export const PostTagSchema = BaseTagSchema.keys({
  id: Joi.string().equal('').required()
});
