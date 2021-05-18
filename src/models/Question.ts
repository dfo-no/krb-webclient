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

/*
export const config: ISliderConfig = {
  step: 1,
  min: 1,
  max: 100,
  unit: 'GB',
  defaultPoint: 1
};

export const answer: ISliderAnswer = {
  value: null,
  point: null
}; */

/* const slider: ISliderQuestion = {
  id: '46674GEFVAWDDqsfrwer3',
  type: QuestionType.Q_SLIDER,
  answer: null,
  config,
  getPoints: () => {
    if (!answer.point) {
      return null;
    }
    return answer.point;
  }
};

console.log(slider.config); */
