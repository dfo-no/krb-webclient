import { ISelectable } from './ISelectable';

export interface ITextAlternative extends ISelectable {
  max: number;
  text: string;
}
