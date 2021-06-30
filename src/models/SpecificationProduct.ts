import { BaseModel } from './BaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import { Product } from './Product';

export interface SpecificationProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  amount: number;
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}
