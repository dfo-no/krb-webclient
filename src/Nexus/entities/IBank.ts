import CustomJoi from '../../common/CustomJoi';
import { BaseNeedSchema, INeed } from './INeed';
import { BaseProductSchema, IProduct } from './IProduct';
import { BasePublicationSchema, IPublication } from './IPublication';
import { BaseTagSchema, ITag } from './ITag';
import { CodelistSchema, ICodelist } from './ICodelist';
import { IBaseModel } from './IBaseModel';
import { IInheritedBank } from '../../models/IInheritedBank';
import { ModelType } from '../../enums';
import { Parentable } from '../../models/Parentable';

export const BaseBankSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateLongText(),
  description: CustomJoi.validateOptionalText(),
  needs: CustomJoi.validateItems(BaseNeedSchema),
  products: CustomJoi.validateItems(BaseProductSchema),
  codelist: CustomJoi.validateItems(CodelistSchema),
  tags: CustomJoi.validateItems(BaseTagSchema),
  version: CustomJoi.validateVersion(),
  type: CustomJoi.validateType(ModelType.bank),
  publications: CustomJoi.validateItems(BasePublicationSchema),
  publishedDate: CustomJoi.validateOptionalDate(),
  projectId: CustomJoi.validateOptionalId(),
  inheritedBanks: CustomJoi.array(),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId(),
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
