import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { IVariant } from './IVariant';
import ModelType from './ModelType';
import RequirementType from './RequirementType';

export interface Requirement extends BaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  variants: IVariant[];
  kind: string;
  requirement_Type: RequirementType;
}

export const BaseRequirementSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  needId: Joi.string().length(36).required(),
  variants: Joi.array().required(),
  kind: Joi.string().valid('yes/no'),
  requirement_Type: Joi.string().valid(...Object.values(RequirementType)),
  type: Joi.string().equal(ModelType.requirement).required()
});

export const PutRequirementSchema = BaseRequirementSchema;

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: Joi.string().equal('').required()
});
