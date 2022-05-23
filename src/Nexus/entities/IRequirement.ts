import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { IVariant, VariantSchema } from './IVariant';
import { ModelType } from '../../enums';

export interface IRequirement extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needId: string;
  variants: IVariant[];
  tags: string[];
}

export const BaseRequirementSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  needId: CustomJoi.string().length(36).required(),
  variants: CustomJoi.array().items(VariantSchema).required(),
  tags: CustomJoi.array().items(CustomJoi.string()),
  type: CustomJoi.string().equal(ModelType.requirement).required(),
  sourceOriginal: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  sourceRel: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required()
});

export const PutRequirementSchema = BaseRequirementSchema;

export const PostRequirementSchema = BaseRequirementSchema.keys({
  id: CustomJoi.string().equal('').required()
});
