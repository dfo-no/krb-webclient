import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';

export interface IRequirementAnswer {
  id: string;
  alternativeId: string;
  weight: number;
  reqTextId: string;
  alternative: IQuestionBase<IAnswerBase, IConfigBase>;
  type: string;
}
