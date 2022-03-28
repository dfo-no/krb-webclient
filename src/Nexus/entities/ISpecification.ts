import CustomJoi from '../../common/CustomJoi';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../models/IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from '../../models/ISpecificationProduct';
import { BaseBankSchema, IBank } from './IBank';

export interface ISpecification {
  bank: IBank;
  title: string;
  version: string;
  organization: string;
  organizationNumber: string;
  products: ISpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BaseSpecificationSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  title: CustomJoi.string().required(),
  organization: CustomJoi.string().required(),
  version: CustomJoi.string().length(36).required(),
  organizationNumber: CustomJoi.string().length(9).required(),
  products: CustomJoi.array().items(SpecificationProductSchema).required(),
  requirements: CustomJoi.array().items(CustomJoi.string()).required(),
  // TODO: change to productSchema when finished refactoring workbench
  // answeredVariants: CustomJoi.array().items(CustomJoi.string()),
  requirementAnswers: CustomJoi.array()
    .items(RequirementAnswerSchema)
    .required()
});
