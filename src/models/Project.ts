import CustomJoi from '../common/CustomJoi';
import { BaseBankSchema } from '../Nexus/entities/IBank';
import { PutPublicationSchema } from '../Nexus/entities/IPublication';
import { ModelType } from '../enums';

export const PutProjectSchema = BaseBankSchema.keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  type: CustomJoi.string().equal(ModelType.bank).required(),
  publications: CustomJoi.array()
    .items(PutPublicationSchema)
    .unique('id')
    .unique('version')
    .unique('date')
});

export const PostProjectSchema = BaseBankSchema.keys({
  id: CustomJoi.string().equal('').required(),
  description: CustomJoi.string().allow('').required(),
  publishedDate: CustomJoi.string().equal(null).required()
});
