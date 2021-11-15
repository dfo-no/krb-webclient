import Joi from 'joi';
import { IBaseModel } from './IBaseModel';
import { ICodelist } from './ICodelist';
import { INeed } from './INeed';
import { InheritedBank } from './InheritedBank';
import { IPublication } from './IPublication';
import ModelType from './ModelType';
import { Parentable } from './Parentable';
import { IProduct } from './Product';
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

export interface IBank extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needs: Parentable<INeed>[];
  codelist: ICodelist[];
  products: IProduct[];
  version: number;
  tags: Parentable<Tag>[];
  publications: IPublication[];
  publishedDate: string | null;
  projectId: string | null;
  inheritedBanks: InheritedBank[];
}
