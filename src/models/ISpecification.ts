import { IBank } from '../Nexus/entities/IBank';
import { IRequirementAnswer } from './IRequirementAnswer';
import { ISpecificationProduct } from './ISpecificationProduct';

export interface ISpecification {
  bank: IBank;
  title: string;
  products: ISpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}
