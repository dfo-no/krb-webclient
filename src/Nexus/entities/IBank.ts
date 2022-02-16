import CustomJoi from '../../common/CustomJoi';
import { IInheritedBank } from '../../models/IInheritedBank';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { IBaseModel } from './IBaseModel';
import { ICodelist } from './ICodelist';
import { INeed } from './INeed';
import { IProduct } from './IProduct';
import { IPublication } from './IPublication';
import { ITag } from './ITag';

export const BaseBankSchema = CustomJoi.object().keys({
  id: CustomJoi.string().length(36).required(),
  title: CustomJoi.string().min(3).required(),
  description: CustomJoi.string().allow('').required(),
  needs: CustomJoi.array().required(),
  products: CustomJoi.array().required(),
  codelist: CustomJoi.array().required(),
  tags: CustomJoi.array().required(),
  version: CustomJoi.number().min(0).required(),
  type: CustomJoi.string().equal(ModelType.bank).required(),
  publications: CustomJoi.array().required(),
  publishedDate: CustomJoi.alternatives([
    CustomJoi.date().iso().raw(),
    CustomJoi.string().valid(null)
  ]).required(),
  projectId: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().allow(null)
  ]).required(),
  inheritedBanks: CustomJoi.array().required(),
  sourceOriginal: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().allow(null)
  ]).required(),
  sourceRel: CustomJoi.alternatives([
    CustomJoi.string().length(36),
    CustomJoi.string().allow(null)
  ]).required()
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
}
