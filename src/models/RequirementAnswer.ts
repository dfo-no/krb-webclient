import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';

export interface RequirementAnswer {
  id: string;
  alternativeId: string;
  weight: number;
  reqTextId: string;
  alternative: IQuestionBase<IAnswerBase, IConfigBase>;
  type: string;
}
