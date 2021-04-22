import { ISelectable } from './ISelectable';

export interface IPeriodDateAlternative extends ISelectable {
  fromDate?: string;
  toDate?: string;
  minDays?: number;
  maxDays?: number;
}
