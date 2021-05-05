import { ICodelistAlternative } from './ICodelistAlternative';
import { IFileUploadAlternative } from './IFileUploadAlternative';
import { IPeriodDateAlternative } from './IPeriodDateAlternative';
import { ITextAlternative } from './ITextAlternative';
import { ITimeAlternative } from './ITimeAlternative';
import { IValueAlternative } from './IValueAlternative';
import { IYesNoAlternative } from './IYesNoAlternative';

export type AlternativeType =
  | ICodelistAlternative
  | IFileUploadAlternative
  | IPeriodDateAlternative
  | ITextAlternative
  | ITimeAlternative
  | IValueAlternative
  | IYesNoAlternative;

export type AlternativeTypes = Array<AlternativeType>;

export interface IVariant {
  id: string;
  requirementText: string;
  instruction: string;
  use_Product: boolean;
  use_Spesification: boolean;
  use_Qualification: boolean;
  products: string[];
  alternatives: AlternativeTypes;
}
