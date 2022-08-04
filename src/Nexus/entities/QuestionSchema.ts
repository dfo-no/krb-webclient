import CustomJoi from '../../common/CustomJoi';
import { QuestionVariant } from '../../enums';
import {
  SliderQuestionAnswerSchema,
  SliderQuestionSchema
} from './ISliderQuestion';
import {
  CodelistQuestionAnswerSchema,
  CodelistQuestionSchema
} from './ICodelistQuestion';
import { TextQuestionAnswerSchema, TextQuestionSchema } from './ITextQuestion';
import {
  PeriodDateAnswerSchema,
  PeriodDateSpecSchema
} from './IPeriodDateQuestion';
import { TimeAnswerSchema, TimeSpecSchema } from './ITimeQuestion';
import {
  CheckboxQuestionAnswerSchema,
  CheckboxQuestionSchema
} from './ICheckboxQuestion';
import {
  FileUploadAnswerSchema,
  FileUploadWorkbenchSchema
} from './IFileUploadQuestion';

export const QuestionAnswerSchema = CustomJoi.alternatives().conditional(
  '.type',
  {
    switch: [
      { is: QuestionVariant.Q_SLIDER, then: SliderQuestionAnswerSchema },
      { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionAnswerSchema },
      { is: QuestionVariant.Q_TEXT, then: TextQuestionAnswerSchema },
      { is: QuestionVariant.Q_PERIOD_DATE, then: PeriodDateAnswerSchema },
      { is: QuestionVariant.Q_TIME, then: TimeAnswerSchema },
      { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionAnswerSchema },
      { is: QuestionVariant.Q_FILEUPLOAD, then: FileUploadAnswerSchema }
    ]
  }
);

export const QuestionSpecificationSchema = CustomJoi.alternatives().conditional(
  '.type',
  {
    switch: [
      { is: QuestionVariant.Q_SLIDER, then: SliderQuestionSchema },
      { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionSchema },
      { is: QuestionVariant.Q_TEXT, then: TextQuestionSchema },
      { is: QuestionVariant.Q_PERIOD_DATE, then: PeriodDateSpecSchema },
      { is: QuestionVariant.Q_TIME, then: TimeSpecSchema },
      { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionSchema },
      { is: QuestionVariant.Q_FILEUPLOAD, then: FileUploadWorkbenchSchema }
    ]
  }
);
