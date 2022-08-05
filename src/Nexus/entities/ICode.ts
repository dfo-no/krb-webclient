import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export interface ICode extends IBaseModel {
  id: string;
  title: string;
  description: string;
}

export const BaseCodeSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  type: CustomJoi.validateType(ModelType.code),
  parent: CustomJoi.validateParentId(),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId()
});

export const PostCodeSchema = BaseCodeSchema.keys({
  id: CustomJoi.validateEmptyId()
});
