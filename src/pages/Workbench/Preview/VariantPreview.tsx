import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { SyntheticEvent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import QuestionConfigItem from './QuestionConfigItem';
import theme from '../../../theme';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useVariantState } from '../VariantContext';

interface IProps {
  variant: IVariant;
}

export default function VariantPreview({
  variant
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
          {t('Requirement text')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.requirementText ? variant.requirementText : '-'}
        </Typography>
        <Typography variant="smBold" color={theme.palette.primary.main}>
          {t('Instruction')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.instruction ? variant.instruction : '-'}
        </Typography>
        <Typography variant="smBold" color={theme.palette.primary.main}>
          {t('How to answer requirement')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 1.5,
            border: `0.1rem solid ${theme.palette.black.main}`,
            backgroundColor: theme.palette.gray100.main,
            padding: 5.5
          }}
        >
          {variant.questions.length > 0 ? (
            variant.questions.map((item) => {
              return (
                <Card key={item.id} sx={{ padding: 1 }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}
                  >
                    <Typography variant={'smBold'}>{t(item.type)}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', paddingLeft: 1 }}>
                    <QuestionConfigItem item={item} />
                  </Box>
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
