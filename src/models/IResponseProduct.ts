import CustomJoi from '../common/CustomJoi';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from './ISpecificationProduct';
import { t } from 'i18next';

export interface IResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: ISpecificationProduct;
  price: number;
  requirementAnswers: IRequirementAnswer[];
}

export const ResponseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  originProduct: SpecificationProductSchema.required(),
  requirementAnswers: CustomJoi.validateItems(
    RequirementAnswerSchema,
    t('Requirement answers')
  ),
  price: CustomJoi.number().integer().required()
});
