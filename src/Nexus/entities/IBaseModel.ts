import CustomJoi from '../../common/CustomJoi';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
/**
 * This interface is meant to be the most basic that can be saved
 * seperately in CosmosDB. Eventually the `type` property will be the marker that this is a separate
 * CosmosDB item, and will somehow trigger a seperate CRUD operation.
 */

export interface IBaseModel {
  id: string;
  type: ModelType | QuestionEnum;
  sourceRel: string | null;
  sourceOriginal: string | null;
}

export const BaseModelSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  type: CustomJoi.string()
    .equal(...Object.values(ModelType))
    .required(),
  sourceRel: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  sourceOriginal: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required()
});
