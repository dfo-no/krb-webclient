import { BaseModel } from './BaseModel';
import { Product } from './Product';
import { RequirementAnswer } from './RequirementAnswer';

export interface SpecificationProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  amount: number;
  requirements: string[];
  requirementAnswers: RequirementAnswer[];
}
