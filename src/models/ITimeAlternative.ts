import { ISelectable } from './ISelectable';

export interface ITimeAlternative extends ISelectable {
  fromTime?: string;
  toTime?: string;
}
