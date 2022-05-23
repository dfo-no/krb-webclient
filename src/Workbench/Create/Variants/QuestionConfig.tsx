import { Box, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import { QuestionVariant } from '../../../enums/QuestionVariant';
import RadioCtrl from '../../../FormProvider/RadioCtrl';
import SelectionSingularCtrl from '../../../FormProvider/SelectionSingularCtrl';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { ICheckboxQuestion } from '../../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../../../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../../Nexus/entities/IPeriodDateQuestion';
import { IRouteParams } from '../../Models/IRouteParams';
import { ISliderQuestion } from '../../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../Nexus/entities/ITimeQuestion';
import { useGetProjectQuery } from '../../../store/api/bankApi';

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
  index: number;
}

const QuestionConfig = ({ item, index }: IProps) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  switch (item.type) {
    case QuestionVariant.Q_TEXT:
      return (
        <ConfigBox>
          <VerticalTextCtrl
            name={`questions.${index}.config.max` as 'questions.0.config.max'}
            label={t('Max characters')}
            type={'number'}
          />
        </ConfigBox>
      );
    case QuestionVariant.Q_CHECKBOX:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
            {t('Preferred alternative')}
          </Typography>
          <RadioCtrl
            name={
              `questions.${index}.config.preferedAlternative` as 'questions.0.config.preferedAlternative'
            }
            options={[
              { value: 'true', label: t('Yes') },
              { value: 'false', label: t('No') }
            ]}
          />
        </ConfigBox>
      );
    case QuestionVariant.Q_SLIDER:
      return (
        <ConfigBox>
          <VerticalTextCtrl
            name={`questions.${index}.config.min` as 'questions.0.config.min'}
            label={t('Minimum')}
            type={'number'}
          />
          <VerticalTextCtrl
            name={`questions.${index}.config.max` as 'questions.0.config.max'}
            label={t('Maximum')}
            type={'number'}
          />
          <VerticalTextCtrl
            name={`questions.${index}.config.unit` as 'questions.0.config.unit'}
            label={t('Unit')}
          />
          <VerticalTextCtrl
            name={`questions.${index}.config.step` as 'questions.0.config.step'}
            label={t('Step')}
            type={'number'}
          />
        </ConfigBox>
      );
    case QuestionVariant.Q_CODELIST:
      return (
        <ConfigBox>
          <SelectionSingularCtrl
            name={
              `questions.${index}.config.codelist` as 'questions.0.config.codelist'
            }
            saveAsString={true}
            initValue={project.codelist[0]}
            items={project.codelist}
          />
        </ConfigBox>
      );
    case QuestionVariant.Q_PERIOD_DATE:
      return (
        <ConfigBox>
          <CheckboxCtrl
            name={
              `questions.${index}.config.isPeriod` as 'questions.0.config.isPeriod'
            }
            label={`${t('Include to date')}`}
          />
        </ConfigBox>
      );
    case QuestionVariant.Q_TIME:
      return (
        <ConfigBox>
          <CheckboxCtrl
            name={
              `questions.${index}.config.isPeriod` as 'questions.0.config.isPeriod'
            }
            label={`${t('Include to time')}`}
          />
        </ConfigBox>
      );
  }
  return <></>;
};

export default QuestionConfig;
