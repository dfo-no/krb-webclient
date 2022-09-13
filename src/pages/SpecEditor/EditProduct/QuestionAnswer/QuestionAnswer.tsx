import { ReactElement } from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import QuestionAnswerCodelist from './QuestionAnswerCodelist';
import QuestionAnswerConfirmation from './QuestionAnswerConfirmation';
import QuestionAnswerPeriodDate from './QuestionAnswerPeriodDate';
import QuestionAnswerSlider from './QuestionAnswerSlider';
import QuestionAnswerText from './QuestionAnswerText';
import QuestionAnswerTime from './QuestionAnswerTime';
import { QuestionType } from '../../../../Nexus/entities/QuestionType';
import { QuestionVariant } from '../../../../Nexus/enums';

interface IProps {
  item: QuestionType;
}

const QuestionAnswer = ({ item }: IProps): ReactElement => {
  switch (item.type) {
    case QuestionVariant.Q_CHECKBOX:
      return <QuestionAnswerCheckbox />;
    case QuestionVariant.Q_CODELIST:
      return <QuestionAnswerCodelist item={item} />;
    case QuestionVariant.Q_CONFIRMATION:
      return <QuestionAnswerConfirmation />;
    case QuestionVariant.Q_PERIOD_DATE:
      return <QuestionAnswerPeriodDate item={item} />;
    case QuestionVariant.Q_SLIDER:
      return <QuestionAnswerSlider item={item} />;
    case QuestionVariant.Q_TEXT:
      return <QuestionAnswerText />;
    case QuestionVariant.Q_TIME:
      return <QuestionAnswerTime item={item} />;
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
};

export default QuestionAnswer;
