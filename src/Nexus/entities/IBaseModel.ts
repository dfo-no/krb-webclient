import CustomJoi from '../Joi/CustomJoi';
import { ModelType, QuestionVariant } from '../enums';

/**
 * This interface is meant to be the most basic that can be saved
 * seperately in CosmosDB. Eventually the `type` property will be the marker that this is a separate
 * CosmosDB item, and will somehow trigger a seperate CRUD operation.
 */

export interface IBaseModel {
  id: string;
  type: ModelType | QuestionVariant;
  sourceRel: string | null;
  sourceOriginal: string | null;
}

export const BaseModelSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  type: CustomJoi.validateTypes(ModelType),
  sourceRel: CustomJoi.validateOptionalId(),
  sourceOriginal: CustomJoi.validateOptionalId(),
});
