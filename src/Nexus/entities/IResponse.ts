import CustomJoi from '../Joi/CustomJoi';
import { BaseSpecificationSchema, ISpecification } from './ISpecification';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
} from './IRequirementAnswer';
import { IResponseProduct, ResponseProductSchema } from './IResponseProduct';

export interface IResponse {
  id: string;
  specification: ISpecification;
  supplier: string;
  products: IResponseProduct[];
  requirementAnswers: IRequirementAnswer[];
}

export const BaseResponseSchema = CustomJoi.object().keys({
  id: CustomJoi.validateParentId(),
  specification: BaseSpecificationSchema,
  supplier: CustomJoi.validateLongText(),
  products: CustomJoi.validateUniqueArray(ResponseProductSchema),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
});
