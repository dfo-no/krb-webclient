import { Box, Divider, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import ChosenAnswer from './ChosenAnswer';
import css from './ProductRequirementAnswer.module.scss';
import ProductQuestionAnswer from './QuestionAnswer/ProductQuestionAnswer';
import ProductVariant from './ProductVariant';
import theme from '../../../theme';
import { DFOAccordionElement } from '../../../components/DFOAccordion/DFOAccordion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { t } from 'i18next';
import { useAppSelector } from '../../../store/hooks';
import { useResponseState } from '../ResponseContext';

interface IProps {
  requirementAnswer: IRequirementAnswer;
}

export default function ProductRequirementAnswer({
  requirementAnswer
}: IProps): ReactElement {
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
      <Box className={css.header}>
        <Typography variant="lgBold">
          {requirementAnswer.requirement.title}
        </Typography>
        <Divider className={css.divider} />
        {existingAnswer && <ChosenAnswer requirementAnswer={existingAnswer} />}
      </Box>
    );
  };

  const body = (): ReactElement => {
    return (
      <Box className={css.body}>
        {requirementVariant && <ProductVariant variant={requirementVariant} />}
        <Typography
          variant={'smBold'}
          color={theme.palette.primary.main}
          className={css.title}
        >
          {t('Requirement answer')}
        </Typography>
        <ProductQuestionAnswer requirementAnswer={requirementAnswer} />
      </Box>
    );
  };

  return (
    <Box className={`${css.ProductRequirementAnswer}`}>
      <DFOAccordionElement
        eventKey={requirementAnswer.id}
        header={header()}
        body={body()}
      />
    </Box>
  );
}
