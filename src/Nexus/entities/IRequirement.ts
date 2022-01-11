import Joi from 'joi';
import ModelType from '../../models/ModelType';
import RequirementType from '../../models/RequirementType';
import { IBaseModel } from './IBaseModel';
import { IVariant, VariantSchema } from './IVariant';

export interface IRequirement extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  variants: IVariant[];
  requirement_Type: RequirementType;
  tags: string[];
}

export const BaseRequirementSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  needId: Joi.string().length(36).required(),
  variants: Joi.array().when('requirement_Type', {
    is: RequirementType.info,
    then: Joi.array().items(VariantSchema).max(1),
    otherwise: Joi.array().items(VariantSchema)
  }),
  tags: Joi.array().items(Joi.string()),
  requirement_Type: Joi.string().valid(...Object.values(RequirementType)),
  type: Joi.string().equal(ModelType.requirement).required(),
  sourceOriginal: Joi.string().required(),
  sourceRel: Joi.string().allow(null).required()
});

export const PutRequirementSchema = BaseRequirementSchema;

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: Joi.string().equal('').required()
});
