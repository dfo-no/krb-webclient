import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Models/IRouteParams';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import QuestionEnum from '../../models/QuestionEnum';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';
import { ICheckboxQuestion } from '../../Nexus/entities/ICheckboxQuestion';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';
import { IFileUploadQuestion } from '../../Nexus/entities/IFileUploadQuestion';

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

export default function QuestionConfigItem({
  item
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { t } = useTranslation();

  if (!project) {
    return <></>;
  }

  const getCodelistNameById = (codelistId: string) => {
    const codelistNameById = project.codelist.find(
      (codelist) => codelist.id === codelistId
    );

    if (codelistNameById) return codelistNameById.title;
  };

  switch (item.type) {
    case QuestionEnum.Q_TEXT:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('Max characters')}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>{item.config.max}</Typography>
        </ConfigBox>
      );

    case QuestionEnum.Q_CHECKBOX:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('Preferred alternative')}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {item.config.preferedAlternative ? t('Yes') : t('No')}
          </Typography>
        </ConfigBox>
      );

    case QuestionEnum.Q_SLIDER:
      return (
        <ConfigBox sx={{ gap: 2 }}>
          <Box>
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              {t('Minimum')}
            </Typography>
            <Typography sx={{ marginTop: 1 }}>{item.config.min}</Typography>
          </Box>
          <Box>
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              {t('Maximum')}
            </Typography>
            <Typography sx={{ marginTop: 1 }}>{item.config.max}</Typography>
          </Box>
          <Box>
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              {t('Unit')}
            </Typography>
            <Typography sx={{ marginTop: 1 }}>{item.config.unit}</Typography>
          </Box>
          <Box>
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              {t('Step')}
            </Typography>
            <Typography sx={{ marginTop: 1 }}>{item.config.step}</Typography>
          </Box>
        </ConfigBox>
      );

    case QuestionEnum.Q_CODELIST:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('name of codelist')}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {getCodelistNameById(item.config.codelist)}
          </Typography>
        </ConfigBox>
      );

    case QuestionEnum.Q_PERIOD_DATE:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('Include to date')}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {item.config.isPeriod ? t('Yes') : t('No')}
          </Typography>
        </ConfigBox>
      );

    case QuestionEnum.Q_TIME:
      return (
        <ConfigBox>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('Include to time')}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            {' '}
            {item.config.isPeriod ? t('Yes') : t('No')}
          </Typography>
        </ConfigBox>
      );
  }

  return <></>;
}
