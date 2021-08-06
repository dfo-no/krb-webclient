import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { Codelist } from './Codelist';
import ModelType from './ModelType';
import { Need } from './Need';
import { Nestable } from './Nestable';
import { Product } from './Product';
import { Publication } from './Publication';

export const BaseBankSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('').required(),
  needs: Joi.array().required(),
  products: Joi.array().required(),
  codelist: Joi.array().required(),
  version: Joi.number().min(0).required(),
  type: Joi.string().equal(ModelType.bank).required(),
  publications: Joi.array().required(),
  publishedDate: Joi.alternatives([
    Joi.date(),
    Joi.string().valid('')
  ]).required()
});

export const PostBankSchema = BaseBankSchema.keys({
  id: Joi.string().equal('').required(),
  description: Joi.string().allow('').required(),
  publishedDate: Joi.string().equal('').required()
});

export const PutBankSchema = BaseBankSchema.keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(ModelType.bank).required()
});

export interface Bank extends BaseModel {
  id: string;
  title: string;
  description: string;
  needs: Nestable<Need>[];
  codelist: Codelist[];
  products: Product[];
  version: number;
  publications: Publication[];
  publishedDate?: string;
}
