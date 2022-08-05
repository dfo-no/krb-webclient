import CustomJoi from '../../common/CustomJoi';
import { IBaseModel } from './IBaseModel';
import { ModelType } from '../../enums';

export interface ITag extends IBaseModel {
  title: string;
  description?: string;
}

export const BaseTagSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  parent: CustomJoi.validateParentId(),
  type: CustomJoi.validateType(ModelType.tag),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId()
});

export const PostTagSchema = BaseTagSchema.keys({
  id: CustomJoi.validateEmptyId()
});
