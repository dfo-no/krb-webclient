import CustomJoi from '../../common/CustomJoi';
import QuestionEnum from '../../models/QuestionEnum';
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

  type: QuestionEnum;

  answer: A;

  config: C;
}

export const ConfigBaseSchema = CustomJoi.object().keys({
  defaultPoint: CustomJoi.number().required()
});

export const QuestionBaseSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  type: CustomJoi.string().valid(QuestionEnum).required(),
  answer: CustomJoi.any().required(),
  config: CustomJoi.any().required(),
  sourceOriginal: CustomJoi.string().length(36).allow(null).required(),
  sourceRel: CustomJoi.string().length(36).allow(null).required()
});
