import { ICodelistQuestion } from './ICodelistQuestion';
import { IFileUploadQuestion } from './IFileUploadQuestion';
import { IPeriodDateQuestion } from './IPeriodDateQuestion';
import { ITextQuestion } from './ITextQuestion';
import { ITimeQuestion } from './ITimeQuestion';
import { ISliderQuestion } from './ISliderQuestion';
import { ICheckboxQuestion } from './ICheckboxQuestion';

export type AlternativeType =
  | ICodelistQuestion
  | IFileUploadQuestion
  | IPeriodDateQuestion
  | ITextQuestion
  | ITimeQuestion
  | ISliderQuestion
  | ICheckboxQuestion;
