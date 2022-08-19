import CustomJoi from '../common/CustomJoi';
import { BaseBankSchema } from '../Nexus/entities/IBank';
import { PutPublicationSchema } from '../Nexus/entities/IPublication';
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
