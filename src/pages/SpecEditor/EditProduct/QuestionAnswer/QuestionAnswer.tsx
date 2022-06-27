import { ReactElement } from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import QuestionAnswerCodelist from './QuestionAnswerCodelist';
import QuestionAnswerPeriodDate from './QuestionAnswerPeriodDate';
import QuestionAnswerSlider from './QuestionAnswerSlider';
import QuestionAnswerText from './QuestionAnswerText';
import QuestionAnswerTime from './QuestionAnswerTime';
import { ICheckboxQuestion } from '../../../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../../../../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';
import { QuestionVariant } from '../../../../enums';

interface IProps {
  item:
    | ITimeQuestion
    | ITextQuestion
    | ISliderQuestion
    | IPeriodDateQuestion
    | IFileUploadQuestion
    | ICodelistQuestion
    | ICheckboxQuestion;
}

const QuestionSpecification = ({ item }: IProps): ReactElement => {
  switch (item.type) {
    case QuestionVariant.Q_CHECKBOX:
      return <QuestionAnswerCheckbox />;
    case QuestionVariant.Q_SLIDER:
      return <QuestionAnswerSlider item={item} />;
    case QuestionVariant.Q_TEXT:
      return <QuestionAnswerText />;
    case QuestionVariant.Q_CODELIST:
      return <QuestionAnswerCodelist item={item} />;
    case QuestionVariant.Q_PERIOD_DATE:
      return <QuestionAnswerPeriodDate item={item} />;
    case QuestionVariant.Q_TIME:
      return <QuestionAnswerTime item={item} />;
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
};

export default QuestionSpecification;
