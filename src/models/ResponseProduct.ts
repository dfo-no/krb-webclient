import { BaseModel } from './BaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface ResponseProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: SpecificationProduct;
  price: number;
  requirementAnswers: IRequirementAnswer[];
}
