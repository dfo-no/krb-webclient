/* export interface ISelectable {
  id: string;
  type:
    | 'value'
    | 'codelist'
    | 'text'
    | 'yesNo'
    | 'fileUpload'
    | 'periodDate'
    | 'time';
} */

import { BaseModel } from './BaseModel';
import { IAnswerBase, IConfigBase } from './Question';

export interface IQuestionBase<A extends IAnswerBase, C extends IConfigBase>
  extends BaseModel {
  answer: A | null;
  config: C;
  getPoints(): number | null;
}
