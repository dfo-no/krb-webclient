import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export interface IProduct extends IBaseModel {
  id: string;
  title: string;
  description: string;
  parent: string;
  children?: [];
  deletedDate: string | null;
}

export const BaseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  parent: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]),
  type: CustomJoi.string().equal(ModelType.product).required(),
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
  deletedDate: CustomJoi.alternatives([
    CustomJoi.date().iso().raw(),
    CustomJoi.string().valid(null)
  ])
});

export const PostProductSchema = BaseProductSchema.keys({
  id: CustomJoi.string().equal('').required()
});
