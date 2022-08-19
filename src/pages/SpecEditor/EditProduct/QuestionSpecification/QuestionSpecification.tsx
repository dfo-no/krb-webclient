import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import QuestionSpecificationCheckbox from './QuestionSpecificationCheckbox';
import QuestionSpecificationCodelist from './QuestionSpecificationCodelist';
import QuestionSpecificationPeriodDate from './QuestionSpecificationPeriodDate';
import QuestionSpecificationSlider from './QuestionSpecificationSlider';
import QuestionSpecificationTime from './QuestionSpecificationTime';
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

const QuestionSpecification = ({ item }: IProps) => {
  const { t } = useTranslation();

  switch (item.type) {
    case QuestionVariant.Q_TEXT:
      return (
        <Typography variant={'smBold'}>
          {t('No specification needed')}
        </Typography>
      );
    case QuestionVariant.Q_CHECKBOX:
      return <QuestionSpecificationCheckbox />;
    case QuestionVariant.Q_SLIDER:
      return <QuestionSpecificationSlider item={item} />;
    case QuestionVariant.Q_CODELIST:
      return <QuestionSpecificationCodelist item={item} />;
    case QuestionVariant.Q_PERIOD_DATE:
      return <QuestionSpecificationPeriodDate item={item} />;
    case QuestionVariant.Q_TIME:
      return <QuestionSpecificationTime item={item} />;
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
};

export default QuestionSpecification;
