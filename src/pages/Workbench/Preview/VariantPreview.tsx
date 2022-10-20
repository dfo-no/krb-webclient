import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { SyntheticEvent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './Preview.module.scss';
import QuestionConfigItem from './QuestionConfigItem';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useVariantState } from '../VariantContext';

interface IProps {
  variant: IVariant;
}

export default function VariantPreview({
  variant,
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { setOpenVariants } = useVariantState();
  const { t } = useTranslation();

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

  return (
    <Accordion
      key={variant.id}
      onChange={accordionChange()}
      className={css.Variant}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{variant.description}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="smBold" className={css.title}>
          {t('Description')}
        </Typography>
        <Typography className={css.text}>
          {variant.description ? variant.description : '-'}
        </Typography>
        <Typography variant="smBold" className={css.title}>
          {t('Requirement text')}
        </Typography>
        <Typography className={css.text}>
          {variant.requirementText ? variant.requirementText : '-'}
        </Typography>
        <Typography variant="smBold" className={css.title}>
          {t('Instruction')}
        </Typography>
        <Typography className={css.text}>
          {variant.instruction ? variant.instruction : '-'}
        </Typography>
        <Typography variant="smBold" className={css.title}>
          {t('How to answer requirement')}
        </Typography>
        <Box className={css.questions}>
          {variant.questions.length > 0 ? (
            <Card key={variant.questions[0].id} className={css.question}>
              <Box className={css.title}>
                <Typography variant={'smBold'}>
                  {t(variant.questions[0].type)}
                </Typography>
              </Box>
              <Divider />
              <QuestionConfigItem item={variant.questions[0]} />
            </Card>
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
