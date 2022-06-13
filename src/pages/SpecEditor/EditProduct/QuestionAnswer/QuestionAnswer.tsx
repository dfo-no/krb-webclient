import { ReactElement } from 'react';

import QuestionAnswerCheckbox from './QuestionAnswerCheckbox';
import QuestionAnswerSlider from './QuestionAnswerSlider';
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
    case QuestionVariant.Q_CODELIST:
    case QuestionVariant.Q_PERIOD_DATE:
    case QuestionVariant.Q_TIME:
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
};

export default QuestionSpecification;
