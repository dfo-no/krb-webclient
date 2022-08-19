import CustomJoi from '../../common/CustomJoi';
import {
  CheckboxQuestionAnswerSchema,
  CheckboxQuestionWorkbenchSchema
} from './ICheckboxQuestion';
import {
  CodelistQuestionAnswerSchema,
  CodelistQuestionWorkbenchSchema
} from './ICodelistQuestion';
import {
  FileUploadAnswerSchema,
  FileUploadWorkbenchSchema
} from './IFileUploadQuestion';
import {
  PeriodDateAnswerSchema,
  PeriodDateWorkbenchSchema
} from './IPeriodDateQuestion';
import { QuestionVariant } from '../../enums';
import {
  SliderQuestionAnswerSchema,
  SliderQuestionWorkbenchSchema
} from './ISliderQuestion';
import {
  TextQuestionAnswerSchema,
  TextQuestionWorkbenchSchema
} from './ITextQuestion';
import {
  TimeQuestionAnswerSchema,
  TimeQuestionWorkbenchSchema
} from './ITimeQuestion';

export const QuestionAnswerSchema = CustomJoi.alternatives().conditional(
  '.type',
  {
    switch: [
      { is: QuestionVariant.Q_SLIDER, then: SliderQuestionAnswerSchema },
      { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionAnswerSchema },
      { is: QuestionVariant.Q_TEXT, then: TextQuestionAnswerSchema },
      { is: QuestionVariant.Q_PERIOD_DATE, then: PeriodDateAnswerSchema },
      { is: QuestionVariant.Q_TIME, then: TimeQuestionAnswerSchema },
      { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionAnswerSchema },
      { is: QuestionVariant.Q_FILEUPLOAD, then: FileUploadAnswerSchema }
    ]
  }
);

export const QuestionVariantSchema = CustomJoi.alternatives().conditional(
  '.type',
  {
    switch: [
      { is: QuestionVariant.Q_SLIDER, then: SliderQuestionWorkbenchSchema },
      { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionWorkbenchSchema },
      { is: QuestionVariant.Q_TEXT, then: TextQuestionWorkbenchSchema },
      { is: QuestionVariant.Q_PERIOD_DATE, then: PeriodDateWorkbenchSchema },
      { is: QuestionVariant.Q_TIME, then: TimeQuestionWorkbenchSchema },
      { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionWorkbenchSchema },
      { is: QuestionVariant.Q_FILEUPLOAD, then: FileUploadWorkbenchSchema }
    ]
  }
);
