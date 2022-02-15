import CustomJoi from '../../common/CustomJoi';
import ModelType from '../../models/ModelType';
import { IBaseModel } from './IBaseModel';
export interface IProduct extends IBaseModel {
  id: string;
  title: string;
  description: string;
  parent: string;
  children?: [];
}

export const BaseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  parent: CustomJoi.string().allow(null, '').required(),
  type: CustomJoi.string().equal(ModelType.product).required(),
  sourceOriginal: CustomJoi.string().required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PostProductSchema = BaseProductSchema.keys({
  id: CustomJoi.string().equal('').required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  children: CustomJoi.array(),
  level: CustomJoi.number()
});

export const PutProductSchema = BaseProductSchema.keys({
  id: CustomJoi.string().length(36).required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  children: CustomJoi.array(),
  level: CustomJoi.number()
});
