import React, { SyntheticEvent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  styled,
  Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Models/IRouteParams';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { IVariant } from '../../Nexus/entities/IVariant';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useVariantState } from '../Components/VariantContext';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import QuestionEnum from '../../models/QuestionEnum';
import { QuestionType } from '../../models/QuestionType';

const ConfigBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 16
}));

interface IProps {
  variant: IVariant;
}

const useStyles = makeStyles({
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    marginTop: 20
  },
  question: {
    paddingTop: 16,
    paddingBottom: 16
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20
  },
  questionConfigTitle: {
    marginTop: 15
  },
  questionConfigContent: {
    marginTop: 15
  }
});

export default function VariantPreview({
  variant
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { setOpenVariants } = useVariantState();
  const { t } = useTranslation();
  const classes = useStyles();

  if (!project) {
    return <></>;
  }

  const accordionChange =
    () => (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      if (isExpanded) {
        setOpenVariants((ov) => [...ov, variant.id]);
      } else {
        setOpenVariants((ov) => {
          const tmp = [...ov];
          tmp.splice(tmp.indexOf(variant.id), 1);
          return tmp;
        });
      }
    };

  const renderQuestionConfig = (item: QuestionType) => {
    console.log(item);

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
              {item.answer.value ? t('Yes') : t('No')}
            </Typography>
          </ConfigBox>
        );
      case QuestionEnum.Q_SLIDER:
        return (
          <ConfigBox>
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              Minimum
            </Typography>
            <Typography sx={{ marginTop: 1 }}>100</Typography>
            <Typography variant={'smBold'} color={theme.palette.primary.main}>
              Maximum
            </Typography>
            <Typography sx={{ marginTop: 1 }}>100</Typography>
          </ConfigBox>
        );
    }
  };

  return (
    <Accordion
      key={variant.id}
      onChange={accordionChange()}
      sx={{ boxShadow: 'none' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{variant.description}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="smBold" color={theme.palette.primary.main}>
          {t('Description')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.description ? variant.description : '-'}
        </Typography>
        <Typography variant="smBold" color={theme.palette.primary.main}>
          {t('requirementText')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.requirementText ? variant.requirementText : '-'}
        </Typography>
        <Typography variant="smBold" color={theme.palette.primary.main}>
          {t('instruction')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.instruction ? variant.instruction : '-'}
        </Typography>
        <Typography variant="smBold" color={theme.palette.primary.main}>
          {t('how to answer requirement')}
        </Typography>
        <Box className={classes.questionsContainer}>
          {variant.questions.length > 0 ? (
            variant.questions.map((item) => {
              return (
                <Card key={item.id} sx={{ margin: 1, padding: 1 }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}
                  >
                    <Typography variant={'md'} sx={{ paddingLeft: 4 }}>
                      {t(item.type)}
                    </Typography>
                  </Box>
                  <Divider />
                  {renderQuestionConfig(item)}
                </Card>
              );
            })
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
