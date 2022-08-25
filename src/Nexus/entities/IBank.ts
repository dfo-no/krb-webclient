import CustomJoi from '../Joi/CustomJoi';
import { BaseNeedSchema, INeed } from './INeed';
import { BaseProductSchema, IProduct } from './IProduct';
import { BasePublicationSchema, IPublication } from './IPublication';
import { BaseTagSchema, ITag } from './ITag';
import { CodelistSchema, ICodelist } from './ICodelist';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { IInheritedBank } from './IInheritedBank';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';

export const BaseBankSchema = BaseModelSchema.keys({
  title: CustomJoi.validateLongText(),
  description: CustomJoi.validateOptionalText(),
  needs: CustomJoi.validateUniqueArray(BaseNeedSchema),
  products: CustomJoi.validateUniqueArray(BaseProductSchema),
  codelist: CustomJoi.validateUniqueArray(CodelistSchema),
  tags: CustomJoi.validateUniqueArray(BaseTagSchema),
  version: CustomJoi.validateVersion(),
  type: CustomJoi.validateType(ModelType.bank),
  publications: CustomJoi.validateUniqueArray(BasePublicationSchema),
  publishedDate: CustomJoi.validateOptionalDate(),
  projectId: CustomJoi.validateOptionalId(),
  inheritedBanks: CustomJoi.array(),
  deletedDate: CustomJoi.validateOptionalDate()
});

export interface IBank extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needs: Parentable<INeed>[];
  codelist: ICodelist[];
  products: Parentable<IProduct>[];
  version: number;
  tags: Parentable<ITag>[];
  publications: IPublication[];
  publishedDate: string | null;
  projectId: string | null;
  inheritedBanks: IInheritedBank[];
  deletedDate: string | null;
}
