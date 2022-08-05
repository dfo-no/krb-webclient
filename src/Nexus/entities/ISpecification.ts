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
  organization: string;
  organizationNumber: string;
  products: ISpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BaseSpecificationSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  title: CustomJoi.validateText(),
  organization: CustomJoi.validateText(),
  organizationNumber: CustomJoi.validateOrgNr(),
  products: CustomJoi.validateItems(SpecificationProductSchema),
  requirements: CustomJoi.validateItems(CustomJoi.string()),
  requirementAnswers: CustomJoi.validateItems(RequirementAnswerSchema)
});
