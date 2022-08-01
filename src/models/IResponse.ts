import CustomJoi from '../common/CustomJoi';
import {
  BaseSpecificationSchema,
  ISpecification
} from '../Nexus/entities/ISpecification';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
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
  supplier: CustomJoi.string().min(3).required(),
  products: CustomJoi.array().items(ResponseProductSchema).required(),
  requirementAnswers: CustomJoi.array()
    .items(RequirementAnswerSchema)
    .required()
});
