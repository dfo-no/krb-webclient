import CustomJoi from '../../common/CustomJoi';
import { IInheritedBank } from '../../models/IInheritedBank';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { IBaseModel } from './IBaseModel';
import { CodelistSchema, ICodelist } from './ICodelist';
import { BaseNeedSchema, INeed } from './INeed';
import { BaseProductSchema, IProduct } from './IProduct';
import { BasePublicationSchema, IPublication } from './IPublication';
import { BaseTagSchema, ITag } from './ITag';

export const BaseBankSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().min(3).required(),
  description: CustomJoi.string().allow('').required(),
  needs: CustomJoi.array().items(BaseNeedSchema).required(),
  products: CustomJoi.array().items(BaseProductSchema).required(),
  codelist: CustomJoi.array().items(CodelistSchema).required(),
  tags: CustomJoi.array().items(BaseTagSchema).required(),
  version: CustomJoi.number().min(0).required(),
  type: CustomJoi.string().equal(ModelType.bank).required(),
  publications: CustomJoi.array().items(BasePublicationSchema).required(),
  publishedDate: CustomJoi.alternatives([
    CustomJoi.date().iso().raw(),
    CustomJoi.string().valid(null)
  ]).required(),
  projectId: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().allow(null)
  ]).required(),
  inheritedBanks: CustomJoi.array().required(),
  sourceOriginal: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  sourceRel: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .allow(null)
    .required(),
  deletedDate: CustomJoi.alternatives([
    CustomJoi.date().iso().raw(),
    CustomJoi.string().valid(null)
  ])
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
