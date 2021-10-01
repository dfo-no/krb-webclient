import ModelType from './ModelType';
import QuestionEnum from './QuestionEnum';
/**
 * This interface is meant to be the most basic that can be saved
 * seperately in CosmosDB. Eventually the `type` property will be the marker that this is a separate
 * CosmosDB item, and will showhow trigger a seperate CRUD operation.
 */

export interface BaseModel {
  id: string;
  type: ModelType | QuestionEnum;
  source_rel: string | null;
  source_original: string | null;
}
