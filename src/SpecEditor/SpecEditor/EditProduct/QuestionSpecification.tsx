import { Box, styled, Typography } from '@mui/material';
import { ITimeQuestion } from '../../../Nexus/entities/ITimeQuestion';
import { ITextQuestion } from '../../../Nexus/entities/ITextQuestion';
import { ISliderQuestion } from '../../../Nexus/entities/ISliderQuestion';
import { IPeriodDateQuestion } from '../../../Nexus/entities/IPeriodDateQuestion';
import { IFileUploadQuestion } from '../../../Nexus/entities/IFileUploadQuestion';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { ICheckboxQuestion } from '../../../Nexus/entities/ICheckboxQuestion';
import QuestionEnum from '../../../models/QuestionEnum';
import { useTranslation } from 'react-i18next';
import QuestionSpecificationSlider from './QuestionSpecificationSlider';
import QuestionSpecificationCheckbox from './QuestionSpecificationCheckbox';
import QuestionSpecificationPeriodDate from './QuestionSpecificationPeriodDate';
import QuestionSpecificationCodelist from './QuestionSpecificationCodelist';

const ConfigBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 16
}));

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
    case QuestionEnum.Q_TEXT:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
            {t('No specification needed')}
          </Typography>
        </ConfigBox>
      );
    case QuestionEnum.Q_CHECKBOX:
      return (
        <ConfigBox>
          <QuestionSpecificationCheckbox />
        </ConfigBox>
      );
    case QuestionEnum.Q_SLIDER:
      return (
        <ConfigBox>
          <QuestionSpecificationSlider item={item} />
        </ConfigBox>
      );
    case QuestionEnum.Q_CODELIST:
      return (
        <ConfigBox>
          <QuestionSpecificationCodelist item={item} />
        </ConfigBox>
      );
    case QuestionEnum.Q_PERIOD_DATE:
      return (
        <ConfigBox>
          <QuestionSpecificationPeriodDate />
        </ConfigBox>
      );
    case QuestionEnum.Q_TIME:
      return <ConfigBox> Ikke definert </ConfigBox>;
  }
  return <></>;
};

export default QuestionSpecification;
