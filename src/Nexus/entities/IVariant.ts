import CustomJoi from '../../common/CustomJoi';
import VariantType from './VariantType';
import { QuestionTypes } from '../../models/QuestionTypes';
import { QuestionSpecificationSchema } from './QuestionSchema';

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
  questions: CustomJoi.validateItems(QuestionSpecificationSchema)
});

export const PostVariantSchema = VariantSchema.keys({
  id: CustomJoi.validateEmptyId()
});
