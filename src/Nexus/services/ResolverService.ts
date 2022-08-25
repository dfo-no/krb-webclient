import { joiResolver } from '@hookform/resolvers/joi';
import { Resolver } from 'react-hook-form';

import CustomJoi from '../Joi/CustomJoi';
import { AnswerSchemaMap } from '../entities/QuestionSchema';
import { ModelSchemaMap } from '../entities/ModelSchema';
import { ModelType, QuestionVariant } from '../enums';

export default class ResolverService {
  resolver<T>(type: ModelType): Resolver<T> {
    const schema = ModelSchemaMap.get(type);
    if (!schema) {
      throw new Error(`Cant find schema for ${type}.`);
    }
    return joiResolver(schema);
  }

  postResolver<T>(type: ModelType): Resolver<T> {
    const schema = ModelSchemaMap.get(type);
    if (!schema) {
      throw new Error(`Cant find schema for ${type}.`);
    }
    const postSchema = schema.keys({
      id: CustomJoi.validateEmptyId()
    });
    return joiResolver(postSchema);
  }

  answerResolver<T>(type: QuestionVariant): Resolver<T> {
    const schema = AnswerSchemaMap.get(type);
    if (!schema) {
      throw new Error(`Cant find answer schema for ${type}.`);
    }
    return joiResolver(schema);
  }
}
