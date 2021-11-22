import { ICheckboxQuestion } from '../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../Nexus/entities/IPeriodDateQuestion';
import { ISliderQuestion } from '../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../Nexus/entities/ITimeQuestion';

export type QuestionType =
  | ICodelistQuestion
  | IFileUploadQuestion
  | IPeriodDateQuestion
  | ITextQuestion
  | ITimeQuestion
  | ISliderQuestion
  | ICheckboxQuestion;
