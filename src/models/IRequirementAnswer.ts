import ModelType from './ModelType';
import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import { Requirement } from './Requirement';

export interface IRequirementAnswer {
  id: string;
  questionId: string;
  weight: number;
  variantId: string;
  question: IQuestionBase<IAnswerBase, IConfigBase>;
  type: ModelType;
  requirement: Requirement;
}
