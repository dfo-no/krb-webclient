import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { IVariant, VariantSchema } from './IVariant';
import ModelType from './ModelType';
import RequirementType from './RequirementType';
import { Tag } from './Tag';

export interface Requirement extends BaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  variants: IVariant[];
  kind: string;
  requirement_Type: RequirementType;
  tags: Tag[];
}

export const BaseRequirementSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  needId: Joi.string().length(36).required(),
  variants: Joi.array()
    .when('requirement_Type', {
      is: RequirementType.info,
      then: Joi.array().items(VariantSchema).max(1)
    })
    .items(VariantSchema)
    .required(),
  kind: Joi.string().valid('yes/no'),
  tags: Joi.array().items(Joi.string()),
  requirement_Type: Joi.string().valid(...Object.values(RequirementType)),
  type: Joi.string().equal(ModelType.requirement).required()
});

export const PutRequirementSchema = BaseRequirementSchema.keys({});

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: Joi.string().equal('').required()
});

/* const requirementSchema = Joi.object().keys({
   id: Joi.string().length(36).required(),
   title: Joi.string().max(100).required(),
   description: Joi.string().allow(null, '').required(),
   needId: Joi.string().required(),
  kind: Joi.string(),
  variants: Joi.array()
    .when('requirement_Type', {
      is: RequirementType.info,
      then: Joi.array().items(variantSchema).max(1)
    })
    .items(variantSchema)
    .required()
   requirement_Type: Joi.string().required(),
   type: Joi.string().equal(ModelType.requirement).required()
}); */
