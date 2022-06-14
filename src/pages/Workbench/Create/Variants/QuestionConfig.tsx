import { Box, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './Variant.module.scss';
import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import SelectionSingularCtrl from '../../../../FormProvider/SelectionSingularCtrl';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';
import { ICheckboxQuestion } from '../../../../Nexus/entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../../../../Nexus/entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import { ITextQuestion } from '../../../../Nexus/entities/ITextQuestion';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';
import { QuestionVariant } from '../../../../enums';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

const ConfigBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'var(--small-gap)'
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
  const { projectId } = useParams<IRouteProjectParams>();
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
          <YesNoSelection
            name={
              `questions.${index}.config.preferedAlternative` as 'questions.0.config.preferedAlternative'
            }
          />
        </ConfigBox>
      );

    case QuestionVariant.Q_SLIDER:
      return (
        <ConfigBox>
          <VerticalTextCtrl
            className={css.InputField}
            name={`questions.${index}.config.min` as 'questions.0.config.min'}
            label={t('Minimum')}
            type={'number'}
          />
          <VerticalTextCtrl
            className={css.InputField}
            name={`questions.${index}.config.max` as 'questions.0.config.max'}
            label={t('Maximum')}
            type={'number'}
          />
          <VerticalTextCtrl
            className={css.InputField}
            name={`questions.${index}.config.unit` as 'questions.0.config.unit'}
            label={t('Unit')}
          />
          <VerticalTextCtrl
            className={css.InputField}
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
