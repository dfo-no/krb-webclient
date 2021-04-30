import { Bank } from './Bank';
import { RequirementAnswer } from './RequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface Specification {
  bank: Bank;
  title: string;
  products: SpecificationProduct[];
  requirements: string[];
  requirementAnswers: RequirementAnswer[];
}
