import CustomJoi from '../Joi/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import {
  IPrefilledResponseProduct,
  PrefilledResponseProductSchema,
} from './IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
} from './IRequirementAnswer';

export const PREFILLED_RESPONSE_CUSTOMIZATION =
  'kravbank:prefilled_response:v1.0';

export interface IPrefilledResponse {
  bank: IBank;
  customization: typeof PREFILLED_RESPONSE_CUSTOMIZATION; // In the future:  PREFILLED_RESPONSE_CUSTOMIZATION_V1_0 | typeof PREFILLED_RESPONSE_CUSTOMIZATION_V1_1 | typeof PREFILLED_RESPONSE_CUSTOMIZATION_V2_0 etc
  supplier: string;
  products: IPrefilledResponseProduct[];
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BasePrefilledResponseSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  customization: CustomJoi.validateText(),
  supplier: CustomJoi.validateText(),
  products: CustomJoi.validateArray(PrefilledResponseProductSchema),
  answeredVariants: CustomJoi.validateIdArray(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
});
