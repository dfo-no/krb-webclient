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
import { t } from 'i18next';

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
  title: CustomJoi.validateText(t('Title')),
  organization: CustomJoi.validateText(t('Organization')),
  organizationNumber: CustomJoi.validateOrgNr(),
  products: CustomJoi.validateItems(SpecificationProductSchema, t('Products')),
  requirements: CustomJoi.validateItems(CustomJoi.string(), t('Requirements')),
  requirementAnswers: CustomJoi.validateItems(
    RequirementAnswerSchema,
    t('Requirement answers')
  )
});
