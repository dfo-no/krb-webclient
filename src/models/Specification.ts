import { Bank } from './Bank';
import { IRequirementAnswer } from './IRequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface Specification {
  bank: Bank;
  title: string;
  products: SpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}
