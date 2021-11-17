import Joi from 'joi';
import ModelType from '../../models/ModelType';
import { IBaseModel } from './IBaseModel';

export interface ICode extends IBaseModel {
  id: string;
  title: string;
  description: string;
}

export const BaseCodeSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  type: Joi.string().equal(ModelType.code).required(),
  parent: Joi.alternatives([Joi.string().length(36), Joi.string().valid('')]),
  children: Joi.array(),
  sourceOriginal: Joi.string().required(),
  sourceRel: Joi.string().allow(null).required()
});

export const PostCodeSchema = BaseCodeSchema.keys({
  id: Joi.string().equal('').required()
});

export const EditCodeSchema = BaseCodeSchema.keys({
  id: Joi.string().length(36).required(),
  level: Joi.number()
});
