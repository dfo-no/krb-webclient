import CustomJoi from '../../common/CustomJoi';
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

export const BaseRequirementSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  needId: CustomJoi.string().length(36).required(),
  variants: CustomJoi.array().when('requirement_Type', {
    is: RequirementType.info,
    then: CustomJoi.array().items(VariantSchema).max(1),
    otherwise: CustomJoi.array().items(VariantSchema)
  }),
  tags: CustomJoi.array().items(CustomJoi.string()),
  requirement_Type: CustomJoi.string().valid(...Object.values(RequirementType)),
  type: CustomJoi.string().equal(ModelType.requirement).required(),
  sourceOriginal: CustomJoi.string().required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PutRequirementSchema = BaseRequirementSchema;

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: CustomJoi.string().equal('').required()
});
