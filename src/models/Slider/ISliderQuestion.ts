import { IAnswerBase, IConfigBase, IQuestionBase } from '../Question';
import QuestionType from '../QuestionType';

export interface ISliderQuestion
  extends IQuestionBase<ISliderAnswer, ISliderConfig> {
  type: QuestionType.Q_SLIDER;
}

export interface ISliderConfig extends IConfigBase {
  step: number;
  min: number;
  max: number;
  unit: string;
}

export interface ISliderAnswer extends IAnswerBase {
  value: number | null;
}
