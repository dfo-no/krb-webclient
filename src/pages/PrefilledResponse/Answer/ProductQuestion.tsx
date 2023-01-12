import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ChosenAnswer from './ChosenAnswer';
import css from './PrefilledResponse.module.scss';
import Nexus from '../../../Nexus/Nexus';
import QuestionAnswer from './QuestionAnswer';
import SpecificationService from '../../../Nexus/services/SpecificationService';
import { DFOAccordion } from '../../../components/DFOAccordion/DFOAccordion';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { QuestionType } from '../../../Nexus/entities/QuestionType';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
  question: QuestionType;
}

export default function ProductQuestion({
  requirement,
  variant,
  question,
}: IProps): ReactElement {
  const { t } = useTranslation();
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();
  const nexus = Nexus.getInstance();
  const { productIndex } = useProductIndexState();
  const [existingAnswer, setExistingAnswer] = useState<
    IRequirementAnswer | undefined
  >(undefined);
  const [requirementAnswer, setRequirementAnswer] =
    useState<IRequirementAnswer>(
      SpecificationService.defaultRequirementAnswer(
        requirement,
        variant.id,
        question
      )
    );

  useEffect(() => {
    const answer = (
      productIndex >= 0
        ? prefilledResponse.products[productIndex]
        : prefilledResponse
    ).requirementAnswers.find((reqAns) => {
      return reqAns.question.id === question.id;
    });
    if (answer) {
      setExistingAnswer(answer);
      setRequirementAnswer(answer);
    } else {
      setExistingAnswer(undefined);
    }
  }, [nexus, question.id, productIndex, prefilledResponse]);

  const header = (): ReactElement => {
    return (
      <div className={css.Header}>
        <Typography variant="smBold">{t(question.type)}</Typography>
        <ChosenAnswer requirementAnswer={existingAnswer} />
      </div>
    );
  };

  const body = (): ReactElement => {
    return (
      <div className={css.Body}>
        <QuestionAnswer
          requirementAnswer={requirementAnswer}
          existingAnswer={existingAnswer}
        />
      </div>
    );
  };

  return (
    <div className={css.Question}>
      <DFOAccordion
        className={css.Accordion}
        eventKey={question.id}
        header={header()}
        body={body()}
      />
    </div>
  );
}
