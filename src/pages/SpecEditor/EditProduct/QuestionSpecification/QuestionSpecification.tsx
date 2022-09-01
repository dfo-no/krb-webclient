import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import QuestionSpecificationCheckbox from './QuestionSpecificationCheckbox';
import QuestionSpecificationCodelist from './QuestionSpecificationCodelist';
import QuestionSpecificationConfirmation from './QuestionSpecificationConfirmation';
import QuestionSpecificationPeriodDate from './QuestionSpecificationPeriodDate';
import QuestionSpecificationSlider from './QuestionSpecificationSlider';
import QuestionSpecificationTime from './QuestionSpecificationTime';
import { QuestionVariant } from '../../../../Nexus/enums';
import { QuestionType } from '../../../../Nexus/entities/QuestionType';

interface IProps {
  item: QuestionType;
}

const QuestionSpecification = ({ item }: IProps) => {
  const { t } = useTranslation();

  switch (item.type) {
    case QuestionVariant.Q_CHECKBOX:
      return <QuestionSpecificationCheckbox />;
    case QuestionVariant.Q_CODELIST:
      return <QuestionSpecificationCodelist item={item} />;
    case QuestionVariant.Q_CONFIRMATION:
      return <QuestionSpecificationConfirmation />;
    case QuestionVariant.Q_PERIOD_DATE:
      return <QuestionSpecificationPeriodDate item={item} />;
    case QuestionVariant.Q_SLIDER:
      return <QuestionSpecificationSlider item={item} />;
    case QuestionVariant.Q_TEXT:
      return (
        <Typography variant={'smBold'}>
          {t('No specification needed')}
        </Typography>
      );
    case QuestionVariant.Q_TIME:
      return <QuestionSpecificationTime item={item} />;
    case QuestionVariant.Q_FILEUPLOAD:
  }
  return <></>;
};

export default QuestionSpecification;
