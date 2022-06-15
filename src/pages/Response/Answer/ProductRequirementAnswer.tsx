import { Box, Divider, Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';

import ChosenAnswer from './ChosenAnswer';
import css from './ProductRequirementAnswer.module.scss';
import ProductQuestionAnswer from './QuestionAnswer/ProductQuestionAnswer';
import ProductVariant from './ProductVariant';
import theme from '../../../theme';
import { DFOAccordion } from '../../../components/DFOAccordion/DFOAccordion';
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
  const [existingAnswer, setExistingAnswer] = useState<
    IRequirementAnswer | undefined
  >(undefined);
  const requirementVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );

  useEffect(() => {
    const answer = (
      responseProductIndex >= 0
        ? response.products[responseProductIndex]
        : response
    ).requirementAnswers.find((reqAns) => {
      return reqAns.id === requirementAnswer.id;
    });
    if (answer) {
      setExistingAnswer(answer);
    }
  }, [requirementAnswer.id, responseProductIndex, response]);

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
        <ProductQuestionAnswer
          requirementAnswer={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      </Box>
    );
  };

  return (
    <Box className={`${css.ProductRequirementAnswer}`}>
      <DFOAccordion
        eventKey={requirementAnswer.id}
        header={header()}
        body={body()}
      />
    </Box>
  );
}
