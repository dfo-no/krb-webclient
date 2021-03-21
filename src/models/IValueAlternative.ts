import { ISelectable } from './ISelectable';

export interface IValueAlternative extends ISelectable {
  step: number;
  min: number;
  max: number;
  unit: string;
}
