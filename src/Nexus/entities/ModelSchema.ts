import { ObjectSchema } from 'joi';

import { BaseBankSchema } from './IBank';
import { BaseCodeSchema } from './ICode';
import { CodelistSchema } from './ICodelist';
import { BaseInheritedBankSchema } from './IInheritedBank';
import { BaseNeedSchema } from './INeed'; // TODO
import { BasePrefilledResponseSchema } from './IPrefilledResponse';
import { PrefilledResponseProductSchema } from './IPrefilledResponseProduct';
import { BaseProductSchema } from './IProduct';
import { BasePublicationSchema } from './IPublication';
import { BaseRequirementSchema } from './IRequirement';
import { RequirementAnswerSchema } from './IRequirementAnswer';
import { BaseResponseSchema } from './IResponse';
import { ResponseProductSchema } from './IResponseProduct';
import { BaseSpecificationSchema } from './ISpecification';
import { SpecificationProductSchema } from './ISpecificationProduct';
import { VariantSchema } from './IVariant';
import { ModelType } from '../enums';

export const ModelSchemaMap = new Map<ModelType, ObjectSchema>([
  [ModelType.bank, BaseBankSchema],
  [ModelType.code, BaseCodeSchema],
  [ModelType.codelist, CodelistSchema],
  [ModelType.inheritedBank, BaseInheritedBankSchema],
  [ModelType.need, BaseNeedSchema],
  [ModelType.prefilledResponse, BasePrefilledResponseSchema],
  [ModelType.prefilledResponseProduct, PrefilledResponseProductSchema],
  [ModelType.product, BaseProductSchema],
  [ModelType.publication, BasePublicationSchema],
  [ModelType.requirement, BaseRequirementSchema],
  [ModelType.requirementAnswer, RequirementAnswerSchema],
  [ModelType.response, BaseResponseSchema],
  [ModelType.responseProduct, ResponseProductSchema],
  [ModelType.specification, BaseSpecificationSchema],
  [ModelType.specificationProduct, SpecificationProductSchema],
  [ModelType.variant, VariantSchema],
]);
