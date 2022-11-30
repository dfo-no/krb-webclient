import CustomJoi from '../Joi/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
} from './IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema,
} from './ISpecificationProduct';

export const SPECIFICATION_CUSTOMIZATION = 'kravbank:specification:v1.0';

export interface ISpecification {
  id: string;
  customization: typeof SPECIFICATION_CUSTOMIZATION;
  bank: IBank;
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
  id: CustomJoi.validateParentId(),
  customization: CustomJoi.validateText,
  bank: BaseBankSchema,
  organization: CustomJoi.validateText(),
  organizationNumber: CustomJoi.validateOrgNr(),
  products: CustomJoi.validateUniqueArray(SpecificationProductSchema),
  requirements: CustomJoi.validateIdArray(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
  title: CustomJoi.validateText(),
  caseNumber: CustomJoi.validateOptionalTextNotRequired(),
  currencyUnit: CustomJoi.validateText(),
});
