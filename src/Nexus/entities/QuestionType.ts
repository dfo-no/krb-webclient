import { ICheckboxQuestion } from './ICheckboxQuestion';
import { ICodelistQuestion } from './ICodelistQuestion';
import { IConfirmationQuestion } from './IConfirmationQuestion';
import { IFileUploadQuestion } from './IFileUploadQuestion';
import { IPeriodDateQuestion } from './IPeriodDateQuestion';
import { ISliderQuestion } from './ISliderQuestion';
import { ITextQuestion } from './ITextQuestion';
import { ITimeQuestion } from './ITimeQuestion';

export type QuestionType =
  | ICheckboxQuestion
  | ICodelistQuestion
  | IConfirmationQuestion
  | IFileUploadQuestion
  | IPeriodDateQuestion
  | ISliderQuestion
  | ITextQuestion
  | ITimeQuestion;
