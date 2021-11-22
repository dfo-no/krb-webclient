import { IRequirementAnswer } from './IRequirementAnswer';
import { IResponseProduct } from './IResponseProduct';
import { ISpecification } from './ISpecification';

export interface IResponse {
  spesification: ISpecification;
  supplier: string;
  products: IResponseProduct[];
  requirementAnswers: IRequirementAnswer[];
}
