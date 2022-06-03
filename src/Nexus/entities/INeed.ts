import CustomJoi from '../../common/CustomJoi';
import { BaseRequirementSchema, IRequirement } from './IRequirement';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export interface INeed extends IBaseModel {
  title: string;
  description: string;
  requirements: IRequirement[];
}

export const BaseNeedSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  requirements: CustomJoi.array().items(BaseRequirementSchema).required(),
  type: CustomJoi.string().equal(ModelType.need).required(),
  sourceOriginal: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  sourceRel: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ])
});

export const PostNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.string().equal('').required()
});

export const PutNeedSchema = BaseNeedSchema;

export const DeleteNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  level: CustomJoi.number(),
  requirements: CustomJoi.array().max(0).required()
});
