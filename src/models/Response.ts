import { IRequirementAnswer } from './IRequirementAnswer';
import { ResponseProduct } from './ResponseProduct';
import { Specification } from './Specification';

export interface Response {
  spesification: Specification;
  supplier: string;
  products: ResponseProduct[];
  requirementAnswers: IRequirementAnswer[];
}
