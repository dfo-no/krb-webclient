import { RequirementAnswer } from './RequirementAnswer';
import { ResponseProduct } from './ResponseProduct';
import { Specification } from './Specification';

export interface Response {
  spesification: Specification;
  title: string;
  products: ResponseProduct[];
  requirementAnswers: RequirementAnswer[];
}
