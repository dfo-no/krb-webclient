import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export const BasePublicationSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  comment: CustomJoi.string().required(),
  date: CustomJoi.date().iso().raw().required(),
  version: CustomJoi.number().min(1).required(),
  bankId: CustomJoi.string().length(36).required(),
  type: CustomJoi.string().equal(ModelType.publication).required(),
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

export const PostPublicationSchema = BasePublicationSchema.keys({
  id: CustomJoi.string().valid('').required(),
  date: CustomJoi.string().allow(null).required()
});

export const PutPublicationSchema = BasePublicationSchema.keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required()
});

export const PutPublicationSchemaArray = CustomJoi.object().keys({
  publications: CustomJoi.array()
    .ordered(PostPublicationSchema)
    .items(PutPublicationSchema)
    .unique('id')
    .unique('version')
    .unique('date')
});

export interface IPublication extends IBaseModel {
  id: string;
  comment: string;
  date: string | null;
  version: number;
  bankId: string;
}
