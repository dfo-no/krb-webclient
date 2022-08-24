import CustomJoi from '../Joi/CustomJoi';
import { QuestionTypes } from '../../models/QuestionTypes';
import { QuestionVariantSchema } from './QuestionSchema';
import { VariantType } from '../enums';

export interface IVariant {
  id: string;
  description: string;
  requirementText: string;
  instruction: string;
  useProduct: boolean;
  useSpesification: boolean;
  useQualification: boolean;
  products: string[];
  questions: QuestionTypes;
  type: VariantType;
}

export const VariantSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  description: CustomJoi.validateText(),
  requirementText: CustomJoi.validateOptionalText(),
  instruction: CustomJoi.validateOptionalText(),
  useProduct: CustomJoi.validateBoolean(),
  useSpesification: CustomJoi.validateBoolean(),
  useQualification: CustomJoi.validateBoolean(),
  products: CustomJoi.validateVariantProducts(),
  type: CustomJoi.validateVariantType(),
  questions: CustomJoi.validateUniqueArray(QuestionVariantSchema)
});

export const PostVariantSchema = VariantSchema.keys({
  id: CustomJoi.validateEmptyId()
});
