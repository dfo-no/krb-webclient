import CustomJoi from '../Joi/CustomJoi';
import { BaseSpecificationSchema, ISpecification } from './ISpecification';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
} from './IRequirementAnswer';
import { IResponseProduct, ResponseProductSchema } from './IResponseProduct';

export interface IResponse {
  specification: ISpecification;
  supplier: string;
  products: IResponseProduct[];
  requirementAnswers: IRequirementAnswer[];
}

export const BaseResponseSchema = CustomJoi.object().keys({
  specification: BaseSpecificationSchema,
  supplier: CustomJoi.validateLongText(),
  products: CustomJoi.validateUniqueArray(ResponseProductSchema),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
});
