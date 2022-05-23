import CustomJoi from '../../common/CustomJoi';
import QuestionVariant from '../../models/QuestionVariant';
import { IBaseModel } from './IBaseModel';

export interface IAnswerBase {
  point: number | null;
}

export interface IConfigBase {
  defaultPoint: number;
}

export interface IQuestionBase<A extends IAnswerBase, C extends IConfigBase>
  extends IBaseModel {
  id: string;

  type: QuestionVariant;

  answer: A;

  config: C;
}

export const ConfigBaseSchema = CustomJoi.object().keys({
  defaultPoint: CustomJoi.number().required()
});

export const QuestionBaseSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  type: CustomJoi.string().valid(QuestionVariant).required(),
  answer: CustomJoi.any().required(),
  config: CustomJoi.any().required(),
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
