import { BaseModel } from './BaseModel';
import { Product } from './Product';
import { IRequirementAnswer } from './IRequirementAnswer';

export interface SpecificationProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  amount: number;
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}
