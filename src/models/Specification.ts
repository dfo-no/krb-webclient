import { RequirementAnswer } from './RequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface Specification {
  bankId: string;
  title: string;
  products: SpecificationProduct[];
  requirements: string[];
  requirementAnswers: RequirementAnswer[];
}
