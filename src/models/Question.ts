import { BaseModel } from './BaseModel';
import QuestionEnum from './QuestionEnum';

export interface IAnswerBase {
  point: number | null;
}

export interface IConfigBase {
  defaultPoint: number;
}

export interface IQuestionBase<A extends IAnswerBase, C extends IConfigBase>
  extends BaseModel {
  id: string;

  type: QuestionEnum;

  answer: A | null;

  config: C;
}
