import { ISelectable } from './ISelectable';

export interface RequirementAnswer {
  id: string;
  alternativeId: string;
  weight: number;
  reqTextId: string;
  alternative: ISelectable;
  type: string;
}
