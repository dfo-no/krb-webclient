import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { Codelist } from './Codelist';
import { InheritedBank } from './InheritedBank';
import ModelType from './ModelType';
import { Need } from './Need';
import { Parentable } from './Parentable';
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
    Joi.date().iso().raw(),
    Joi.string().valid(null)
  ]).required(),
  projectId: Joi.alternatives([
    Joi.string().length(36),
    Joi.string().allow(null)
  ]).required(),
  inheritedBanks: Joi.array().required(),
  sourceOriginal: Joi.alternatives([
    Joi.string().length(36),
    Joi.string().allow(null)
  ]).required(),
  sourceRel: Joi.alternatives([
    Joi.string().length(36),
    Joi.string().allow(null)
  ]).required()
});

export interface Bank extends BaseModel {
  id: string;
  title: string;
  description: string;
  needs: Parentable<Need>[];
  codelist: Codelist[];
  products: Parentable<Product>[];
  version: number;
  tags: Parentable<Tag>[];
  publications: Publication[];
  publishedDate: string | null;
  projectId: string | null;
  inheritedBanks: InheritedBank[];
}
