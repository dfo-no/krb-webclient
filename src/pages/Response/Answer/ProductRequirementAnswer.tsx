import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import React, { ReactElement } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import ProductVariant from './ProductVariant';
import { t } from 'i18next';
import ProductQuestionAnswer from './QuestionAnswer/ProductQuestionAnswer';
import { DFOAccordionElement } from '../../../components/DFOAccordion/DFOAccordion';
import { FlexColumnBox } from '../../../components/FlexBox/FlexColumnBox';
import { useAppSelector } from '../../../store/hooks';
import { useResponseState } from '../ResponseContext';
import ChosenAnswer from './ChosenAnswer';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.white.main,
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.black.main,
    border: `0.1rem solid ${theme.palette.primary.main}`,
    padding: '1.6rem',
    paddingLeft: '3.2rem',
    paddingRight: '3.2rem',
    margin: '3.2rem'
  }
});

interface IProps {
  requirementAnswer: IRequirementAnswer;
}

export default function ProductRequirementAnswer({
  requirementAnswer
}: IProps): ReactElement {
  const classes = useStyles();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const requirementVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );
  let existingAnswer: IRequirementAnswer | undefined;
  if (
    responseProductIndex >= 0 &&
    response.products.length > responseProductIndex
  ) {
    existingAnswer = response.products[
      responseProductIndex
    ].requirementAnswers.find((reqAns) => {
      return reqAns.id === requirementAnswer.id;
    });
  }

  const header = (): ReactElement => {
    return (
      <FlexColumnBox sx={{ width: '100%', marginRight: '3.2rem' }}>
        <Typography variant="lgBold">
          {requirementAnswer.requirement.title}
        </Typography>
        <Divider sx={{ marginTop: '1.6rem' }} />
        {existingAnswer && <ChosenAnswer requirementAnswer={existingAnswer} />}
      </FlexColumnBox>
    );
  };

  const body = (): ReactElement => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {requirementVariant && <ProductVariant variant={requirementVariant} />}
        <Typography
          variant={'smBold'}
          color={theme.palette.primary.main}
          sx={{ marginBottom: '0.8rem' }}
        >
          {t('Requirement answer')}
        </Typography>
        <ProductQuestionAnswer requirementAnswer={requirementAnswer} />
      </Box>
    );
  };

  return (
    <Box className={`${classes.card}`}>
      <DFOAccordionElement
        eventKey={requirementAnswer.id}
        header={header()}
        body={body()}
      />
    </Box>
  );
}
