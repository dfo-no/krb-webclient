import { BaseModel } from './BaseModel';
import QuestionType from './QuestionType';

export interface IAnswerBase {
  point: number | null;
}

export interface IConfigBase {
  defaultPoint: number;
}

export interface IQuestionBase<A extends IAnswerBase, C extends IConfigBase>
  extends BaseModel {
  id: string;
  type: QuestionType;
  answer: A | null;
  config: C;
  getPoints(): number | null;
}
