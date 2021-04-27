import { BaseModel } from './BaseModel';
import { RequirementAnswer } from './RequirementAnswer';
import { SpecificationProduct } from './SpecificationProduct';

export interface ResponseProduct extends BaseModel {
  id: string;
  originProduct: SpecificationProduct;
  price: number;
  requirementAnswers: RequirementAnswer[];
}
