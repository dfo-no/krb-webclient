import { Bank } from './Bank';
import { IRequirementAnswer } from './RequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface Specification {
  bank: Bank;
  title: string;
  products: SpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}
