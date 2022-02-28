import CustomJoi from '../../common/CustomJoi';
import ModelType from '../../models/ModelType';
import { IBaseModel } from './IBaseModel';
import { IRequirement } from './IRequirement';

export interface INeed extends IBaseModel {
  title: string;
  description: string;
  requirements: IRequirement[];
}

export const BaseNeedSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  requirements: CustomJoi.array().required(),
  type: CustomJoi.string().equal(ModelType.need).required(),
  sourceOriginal: CustomJoi.string().required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PostNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.string().equal('').required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  children: CustomJoi.array()
});

export const PutNeedSchema = BaseNeedSchema.keys({
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  children: CustomJoi.array(),
  level: CustomJoi.number()
});

export const DeleteNeedSchema = BaseNeedSchema.keys({
  id: CustomJoi.string().length(36).required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  level: CustomJoi.number(),
  requirements: CustomJoi.array().max(0).required()
  // requirements: CustomJoi.assertEmptyRequirements()
});

// BaseNeedSchema.options({});
/* export const DeleteNeedProjectSchema = BaseBankSchema.keys({
  id: CustomJoi.string().length(36).required(),
  requirements: CustomJoi.assertEmptyRequirements().required()
}); */
