import { Codelist } from './Codelist';
import { ISelectable } from './ISelectable';

export interface ICodelistAlternative extends ISelectable {
  codelist: Codelist;
}
