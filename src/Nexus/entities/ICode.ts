import CustomJoi from '../../common/CustomJoi';
import ModelType from '../../models/ModelType';
import { IBaseModel } from './IBaseModel';
export interface ICode extends IBaseModel {
  id: string;
  title: string;
  description: string;
}

export const BaseCodeSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  type: CustomJoi.string().equal(ModelType.code).required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  sourceOriginal: CustomJoi.string().required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PostCodeSchema = BaseCodeSchema.keys({
  id: CustomJoi.string().equal('').required()
});
