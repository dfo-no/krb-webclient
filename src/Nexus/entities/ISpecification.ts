import CustomJoi from '../Joi/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from './ISpecificationProduct';

export interface ISpecification {
  bank: IBank;
  id: string;
  organization: string;
  organizationNumber: string;
  products: ISpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
  title: string;
  caseNumber?: string;
  currencyUnit: string;
}

export const BaseSpecificationSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  id: CustomJoi.validateParentId(),
  organization: CustomJoi.validateText(),
  organizationNumber: CustomJoi.validateOrgNr(),
  products: CustomJoi.validateUniqueArray(SpecificationProductSchema),
  requirements: CustomJoi.validateIdArray(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
  title: CustomJoi.validateText(),
  caseNumber: CustomJoi.validateOptionalTextNotRequired(),
  currencyUnit: CustomJoi.validateText()
});
