import CustomJoi from '../Joi/CustomJoi';
import { BaseSpecificationSchema, ISpecification } from './ISpecification';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
} from './IRequirementAnswer';
import { IResponseProduct, ResponseProductSchema } from './IResponseProduct';

export const RESPONSE_CUSTOMIZATION = 'kravbank:response:v1.0';

export interface IResponse {
  id: string;
  customization: typeof RESPONSE_CUSTOMIZATION;
  specification: ISpecification;
  supplier: string;
  products: IResponseProduct[];
  requirementAnswers: IRequirementAnswer[];
}

export const BaseResponseSchema = CustomJoi.object().keys({
  id: CustomJoi.validateParentId(),
  customization: CustomJoi.validateText(),
  specification: BaseSpecificationSchema,
  supplier: CustomJoi.validateLongText(),
  products: CustomJoi.validateUniqueArray(ResponseProductSchema),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
});
