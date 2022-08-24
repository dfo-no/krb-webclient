import CustomJoi from '../Joi/CustomJoi';
import { BaseBankSchema } from './IBank';
import { PutPublicationSchema } from './IPublication';
import { ModelType } from '../enums';

export const PutProjectSchema = BaseBankSchema.keys({
  id: CustomJoi.validateId(),
  type: CustomJoi.validateType(ModelType.bank),
  publications: CustomJoi.array()
    .items(PutPublicationSchema)
    .unique('id')
    .unique('version')
    .unique('date')
});

export const PostProjectSchema = BaseBankSchema.keys({
  id: CustomJoi.validateEmptyId(),
  description: CustomJoi.validateOptionalText(),
  publishedDate: CustomJoi.validateEmptyDate()
});
