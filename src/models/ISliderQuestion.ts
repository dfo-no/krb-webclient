import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ISliderQuestion
  extends IQuestionBase<ISliderAnswer, ISliderConfig> {
  type: QuestionEnum.Q_SLIDER;
}

export interface ISliderAnswer extends IAnswerBase {
  value: number;
}
export interface ISliderConfig extends IConfigBase {
  step: number;
  min: number;
  max: number;
  unit: string;
}
