import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { t } from 'i18next';
import classNames from 'classnames';

import ChosenAnswer from './ChosenAnswer';
import css from './ProductRequirementAnswer.module.scss';
import ProductQuestionAnswer from './ProductQuestionAnswer';
import ProductVariant from './ProductVariant';
import TextUtils from '../../../common/TextUtils';
import { DFOAccordion } from '../../../components/DFOAccordion/DFOAccordion';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { VariantType } from '../../../Nexus/enums';
import { useAccordionState } from '../../../components/DFOAccordion/AccordionContext';
import { useResponseState } from '../ResponseContext';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  productIndex: number;
}

export default function ProductRequirementAnswer({
  requirementAnswer,
  productIndex,
}: IProps): ReactElement {
  const { response } = useResponseState();

  console.log('In ProductRequirementAnswer, productIndex = ', productIndex);

  const [existingAnswer, setExistingAnswer] = useState<
    IRequirementAnswer | undefined
  >(undefined);
  const { setActiveKey } = useAccordionState();
  const requirementVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );
  const isInfo =
    requirementVariant && requirementVariant.type === VariantType.info;
  const isAnswered = !!(existingAnswer || isInfo);

  useEffect(() => {
    const answer = (
      productIndex >= 0 ? response.products[productIndex] : response
    ).requirementAnswers.find((reqAns) => {
      return reqAns.id === requirementAnswer.id;
    });
    if (answer) setExistingAnswer(answer);
    else setActiveKey(requirementAnswer.id);
  }, [requirementAnswer.id, productIndex, response, setActiveKey]);

  const header = (): ReactElement => {
    return (
      <Box className={css.header}>
        <span className={css.title}>{requirementAnswer.requirement.title}</span>
        {isAnswered && (
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
        <span className={css.title}>{t('Requirement answer')}</span>
        {isInfo ? (
          <span className={css.label}>
            {TextUtils.getAnswerText(
              requirementAnswer,
              response.specification.bank
            )}
          </span>
        ) : (
          <ProductQuestionAnswer
            requirementAnswer={requirementAnswer}
            existingAnswer={existingAnswer}
            productIndex={productIndex}
          />
        )}
      </Box>
    );
  };

  return (
    <Box
      className={classNames(
        css.ProductRequirementAnswer,
        isAnswered ? css.answered : undefined
      )}
    >
      <DFOAccordion
        eventKey={requirementAnswer.id}
        header={header()}
        body={body()}
        className={css.Accordion}
      />
    </Box>
  );
}
