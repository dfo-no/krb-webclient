import { Box, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import QuestionConfigSlider from './QuestionConfigSlider';
import SelectionSingularCtrl from '../../../../FormProvider/SelectionSingularCtrl';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { QuestionVariant } from '../../../../Nexus/enums';
import { QuestionType } from '../../../../Nexus/entities/QuestionType';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

const ConfigBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'var(--small-gap)',
}));

interface Props {
  item: QuestionType;
  index: number;
}

const QuestionConfig = ({ item, index }: Props) => {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  switch (item.type) {
    case QuestionVariant.Q_CHECKBOX:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
            {t('Assumed preferred alternative')}
          </Typography>
          <YesNoSelection
            name={`questions.${index}.config.preferedAlternative`}
          />
        </ConfigBox>
      );

    case QuestionVariant.Q_CODELIST:
      return (
        <ConfigBox>
          <SelectionSingularCtrl
            name={`questions.${index}.config.codelist`}
            saveAsString={true}
            initValue={project.codelist[0]}
            items={project.codelist}
          />
        </ConfigBox>
      );

    case QuestionVariant.Q_CONFIRMATION:
      return (
        <ConfigBox>
          <Typography variant={'smBold'}>
            {t('No configuration needed')}
          </Typography>
        </ConfigBox>
      );

    case QuestionVariant.Q_PERIOD_DATE:
      return (
        <ConfigBox>
          <CheckboxCtrl
            name={`questions.${index}.config.isPeriod`}
            label={`${t('Include to date')}`}
          />
        </ConfigBox>
      );

    case QuestionVariant.Q_SLIDER:
      return <QuestionConfigSlider index={index} />;

    case QuestionVariant.Q_TEXT:
      return (
        <ConfigBox>
          <VerticalTextCtrl
            name={`questions.${index}.config.max`}
            label={t('Max characters')}
            type={'number'}
          />
        </ConfigBox>
      );

    case QuestionVariant.Q_TIME:
      return (
        <ConfigBox>
          <CheckboxCtrl
            name={`questions.${index}.config.isPeriod`}
            label={`${t('Include to time')}`}
          />
        </ConfigBox>
      );
  }

  return <></>;
};

export default QuestionConfig;
