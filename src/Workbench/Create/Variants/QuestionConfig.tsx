import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
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
import RadioCtrl from '../../../FormProvider/RadioCtrl';
import SelectionSingularCtrl from '../../../FormProvider/SelectionSingularCtrl';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import React from 'react';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';

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
    case QuestionEnum.Q_TEXT:
      return (
        <ConfigBox>
          <VerticalTextCtrl
            name={`questions.${index}.config.max` as 'questions.0.config.max'}
            label={t('Max characters')}
            type={'number'}
          />
        </ConfigBox>
      );
    case QuestionEnum.Q_CHECKBOX:
      return (
        <ConfigBox>
          <Typography variant={'smallBold'} sx={{ marginBottom: 2 }}>
            {t('Perferred alternative')}
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
    case QuestionEnum.Q_SLIDER:
      return (
        <ConfigBox>
          <VerticalTextCtrl
            name={`questions.${index}.config.min` as 'questions.0.config.min'}
            label={t('Minumum')}
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
    case QuestionEnum.Q_CODELIST:
      return (
        <ConfigBox>
          <SelectionSingularCtrl
            name={
              `questions.${index}.config.codelist` as 'questions.0.config.codelist'
            }
            items={project.codelist}
          />
        </ConfigBox>
      );
    case QuestionEnum.Q_PERIOD_DATE:
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
    case QuestionEnum.Q_TIME:
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
