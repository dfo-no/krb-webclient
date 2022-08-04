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
import { t } from 'i18next';

export const BaseBankSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateLongText(t('Title')),
  description: CustomJoi.validateOptionalText(),
  needs: CustomJoi.validateItems(BaseNeedSchema, t('Needs')),
  products: CustomJoi.validateItems(BaseProductSchema, t('Products')),
  codelist: CustomJoi.validateItems(CodelistSchema, t('Codelists')),
  tags: CustomJoi.validateItems(BaseTagSchema, t('Tags')),
  version: CustomJoi.validateVersion(),
  type: CustomJoi.validateType(ModelType.bank),
  publications: CustomJoi.validateItems(
    BasePublicationSchema,
    t('Publications')
  ),
  publishedDate: CustomJoi.validateDeletedDate(),
  projectId: CustomJoi.validateProjectId(),
  inheritedBanks: CustomJoi.array(),
  sourceOriginal: CustomJoi.validateSource(),
  sourceRel: CustomJoi.validateSource(),
  deletedDate: CustomJoi.validatePublishedDate()
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
