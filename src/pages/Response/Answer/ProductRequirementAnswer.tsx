import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { t } from 'i18next';

import ChosenAnswer from './ChosenAnswer';
import css from './ProductRequirementAnswer.module.scss';
import ProductQuestionAnswer from './QuestionAnswer/ProductQuestionAnswer';
import ProductVariant from './ProductVariant';
import TextUtils from '../../../common/TextUtils';
import theme from '../../../theme';
import VariantType from '../../../Nexus/entities/VariantType';
import { DFOAccordion } from '../../../components/DFOAccordion/DFOAccordion';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
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
  const isInfo =
    requirementVariant && requirementVariant.type === VariantType.info;

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
        {(existingAnswer || isInfo) && (
          <ChosenAnswer
            requirementAnswer={requirementAnswer}
            existingAnswer={existingAnswer}
          />
        )}
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
        {isInfo ? (
          <Typography className={css.label}>
            {TextUtils.getAnswerText(requirementAnswer, response.specification)}
          </Typography>
        ) : (
          <ProductQuestionAnswer
            requirementAnswer={requirementAnswer}
            existingAnswer={existingAnswer}
          />
        )}
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
