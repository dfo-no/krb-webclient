import CustomJoi from '../../common/CustomJoi';
import ModelType from '../../models/ModelType';
import { IBaseModel } from './IBaseModel';
export interface ITag extends IBaseModel {
  title: string;
  id: string;
}

export const BaseTagSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().allow('').required(),
  type: CustomJoi.string().equal(ModelType.tag).required(),
  sourceOriginal: CustomJoi.string().required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PostTagSchema = BaseTagSchema.keys({
  id: CustomJoi.string().equal('').required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  children: CustomJoi.array(),
  level: CustomJoi.number()
});

export const PutTagSchema = BaseTagSchema.keys({
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  children: CustomJoi.array(),
  level: CustomJoi.number()
});
