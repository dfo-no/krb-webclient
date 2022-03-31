import { ISpecification } from '../Nexus/entities/ISpecification';
import { IRequirementAnswer } from './IRequirementAnswer';
import { IResponseProduct } from './IResponseProduct';

export interface IResponse {
  spesification: ISpecification;
  supplier: string;
  products: IResponseProduct[];
  requirementAnswers: IRequirementAnswer[];
}
