import React, { SyntheticEvent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

interface IProps {
  variant: IVariant;
}

export default function VariantPreview({
  variant
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
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
        <Typography>{variant.requirementText}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant={'smallBold'} color={theme.palette.dfoBlue.main}>
          {t('Description')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.description ? variant.description : '-'}
        </Typography>
        <Typography variant={'smallBold'} color={theme.palette.dfoBlue.main}>
          {t('requirementText')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.requirementText ? variant.requirementText : '-'}
        </Typography>
        <Typography variant={'smallBold'} color={theme.palette.dfoBlue.main}>
          {t('instruction')}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {variant.instruction ? variant.instruction : '-'}
        </Typography>
        <Typography variant={'smallBold'} color={theme.palette.dfoBlue.main}>
          {t('how to answer requirement')}
        </Typography>
        {variant.questions.length > 0 ? (
          variant.questions.map((item) => {
            return (
              <Card key={item.id}>
                <CardHeader title={t(item.type)} />
              </Card>
            );
          })
        ) : (
          <Typography>-</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
