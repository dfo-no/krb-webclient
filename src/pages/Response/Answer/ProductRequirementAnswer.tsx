import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import ProductVariant from './ProductVariant';
import { t } from 'i18next';
import ProductQuestionAnswer from './ProductQuestionAnswer';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.white.main,
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.black.main,
    padding: 16,
    paddingLeft: 32,
    paddingRight: 32,
    margin: 32
  }
});

interface IProps {
  requirementAnswer: IRequirementAnswer;
}

export default function ProductRequirementAnswer({
  requirementAnswer
}: IProps): React.ReactElement {
  const classes = useStyles();
  const requirementVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );

  return (
    <Box className={`${classes.card}`}>
      <Box sx={{ borderBottom: '1px solid', marginBottom: 2 }}>
        <Typography variant="lgBold">
          {requirementAnswer.requirement.title}
        </Typography>
      </Box>
      {requirementVariant && <ProductVariant variant={requirementVariant} />}
      <Typography
        variant={'smBold'}
        color={theme.palette.primary.main}
        sx={{ marginBottom: 1 }}
      >
        {t('Requirement answer')}
      </Typography>
      <ProductQuestionAnswer question={requirementAnswer.question} />
    </Box>
  );
}
