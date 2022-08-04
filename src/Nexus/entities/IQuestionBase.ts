import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { QuestionVariant } from '../../enums';

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
  id: CustomJoi.validateId(),
  type: CustomJoi.string()
    .valid(...Object.values(QuestionVariant))
    .required(),
  answer: CustomJoi.any().required(),
  config: CustomJoi.any().required(),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});
