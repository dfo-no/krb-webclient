import CustomJoi from '../common/CustomJoi';
import { BaseProductSchema, IProduct } from '../Nexus/entities/IProduct';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
import { ModelType } from '../enums';
import { t } from 'i18next';

export interface ISpecificationProduct extends IBaseModel {
  title: string;
  description: string;
  originProduct: IProduct;
  weight: number;
  amount: number;
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const SpecificationProductSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(t('Title')),
  originProduct: BaseProductSchema,
  description: CustomJoi.validateOptionalText(),
  amount: CustomJoi.number().integer().min(1).required(),
  requirements: CustomJoi.validateItems(CustomJoi.string(), t('Requirements')),
  weight: CustomJoi.number().integer().min(1).required(),
  requirementAnswers: CustomJoi.validateItems(
    RequirementAnswerSchema,
    t('Requirement answers')
  ),
  type: CustomJoi.validateType(ModelType.specificationProduct),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource()
});

export const PostSpecificationProductSchema = SpecificationProductSchema.keys({
  id: CustomJoi.validateEmptyId()
});
