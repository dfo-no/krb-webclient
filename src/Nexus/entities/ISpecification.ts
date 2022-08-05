import CustomJoi from '../../common/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../models/IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from '../../models/ISpecificationProduct';

export interface ISpecification {
  bank: IBank;
  id: string;
  organization: string;
  organizationNumber: string;
  products: ISpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
  title: string;
}

export const BaseSpecificationSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  id: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().valid('')
  ]).required(),
  organization: CustomJoi.validateText(),
  organizationNumber: CustomJoi.validateOrgNr(),
  products: CustomJoi.validateItems(SpecificationProductSchema),
  requirements: CustomJoi.validateItems(CustomJoi.string()),
  requirementAnswers: CustomJoi.validateItems(RequirementAnswerSchema),
  title: CustomJoi.validateText()
});
