import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import QuestionSpecificationSlider from './QuestionSpecificationSlider';
import QuestionSpecificationCheckbox from './QuestionSpecificationCheckbox';
import QuestionSpecificationCodelist from './QuestionSpecificationCodelist';
import { ICheckboxQuestion } from '../../../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../../../../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';
import { QuestionVariant } from '../../../../enums';

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
    case QuestionVariant.Q_TEXT:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
            {t('No specification needed')}
          </Typography>
        </ConfigBox>
      );
    case QuestionVariant.Q_CHECKBOX:
      return (
        <ConfigBox>
          <QuestionSpecificationCheckbox />
        </ConfigBox>
      );
    case QuestionVariant.Q_SLIDER:
      return (
        <ConfigBox>
          <QuestionSpecificationSlider item={item} />
        </ConfigBox>
      );
    case QuestionVariant.Q_CODELIST:
      return (
        <ConfigBox>
          <QuestionSpecificationCodelist item={item} />
        </ConfigBox>
      );
    case QuestionVariant.Q_PERIOD_DATE:
      return <ConfigBox> Ikke definert </ConfigBox>;
    case QuestionVariant.Q_TIME:
      return <ConfigBox> Ikke definert </ConfigBox>;
  }
  return <></>;
};

export default QuestionSpecification;
