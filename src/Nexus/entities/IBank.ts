import { z } from 'zod';

import CustomJoi from '../Joi/CustomJoi';
import { BaseNeedSchema, INeed } from './INeed';
import { BaseProductSchema, IProduct } from './IProduct';
import { BasePublicationSchema, IPublication } from './IPublication';
import { CodelistSchema, ICodelist } from './ICodelist';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { IInheritedBank } from './IInheritedBank';
import { ModelType } from '../enums';
import { Parentable } from '../../models/Parentable';

export const ProjectSchema = z.object({
  title: z
    .string()
    .min(
      5,
      'Something about projecty title TODO: temporary error mesage needs to be integrated with i18n '
    ),
  description: z.string(),
  ref: z.string(),
});

export const BaseBankSchema = BaseModelSchema.keys({
  title: CustomJoi.validateLongText(),
  description: CustomJoi.validateOptionalText(),
  needs: CustomJoi.validateUniqueArray(BaseNeedSchema),
  products: CustomJoi.validateUniqueArray(BaseProductSchema),
  codelist: CustomJoi.validateUniqueArray(CodelistSchema),
  version: CustomJoi.validateVersion(),
  type: CustomJoi.validateType(ModelType.bank),
  publications: CustomJoi.validateUniqueArray(BasePublicationSchema),
  publishedDate: CustomJoi.validateOptionalDate(),
  projectId: CustomJoi.validateOptionalId(),
  inheritedBanks: CustomJoi.array(),
  deletedDate: CustomJoi.validateOptionalDate(),
});

export interface IBank extends IBaseModel {
  id: string;
  title: string;
  description: string;
  needs: Parentable<INeed>[];
  codelist: ICodelist[];
  products: Parentable<IProduct>[];
  version: number;
  publications: IPublication[];
  publishedDate: string | null;
  projectId: string | null;
  inheritedBanks: IInheritedBank[];
  deletedDate: string | null;
}
