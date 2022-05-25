import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export interface ITag extends IBaseModel {
  title: string;
  description?: string;
}

export const BaseTagSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().allow('').required(),
  description: CustomJoi.string().allow(''),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  type: CustomJoi.string().equal(ModelType.tag).required(),
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

export const PostTagSchema = BaseTagSchema.keys({
  id: CustomJoi.string().equal('').required()
});
