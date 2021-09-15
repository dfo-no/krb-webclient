import { BaseModel } from './BaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import { Product } from './Product';

export interface PrefilledResponseProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}
