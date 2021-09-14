import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { Codelist } from './Codelist';
import ModelType from './ModelType';
import { Need } from './Need';
import { Nestable } from './Nestable';
import { Product } from './Product';
import { Publication } from './Publication';
import { Tag } from './Tag';

export const BaseBankSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('').required(),
  needs: Joi.array().required(),
  products: Joi.array().required(),
  codelist: Joi.array().required(),
  tags: Joi.array().required(),
  version: Joi.number().min(0).required(),
  type: Joi.string().equal(ModelType.bank).required(),
  publications: Joi.array().required(),
  publishedDate: Joi.alternatives([
    Joi.date(),
    Joi.string().valid('')
  ]).required()
});

export interface Bank extends BaseModel {
  id: string;
  title: string;
  description: string;
  needs: Nestable<Need>[];
  codelist: Codelist[];
  products: Product[];
  version: number;
  tags: Tag[];
  publications: Publication[];
  publishedDate?: string;
}
