import { IBank } from './IBank';
import { IRequirementAnswer } from './IRequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface Specification {
  bank: IBank;
  title: string;
  products: SpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}
