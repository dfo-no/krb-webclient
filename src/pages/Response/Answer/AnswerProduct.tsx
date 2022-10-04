import React, { ReactElement } from 'react';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import CalculatedPercentage from './CalculatedPercentage';
import ProductRequirementAnswer from './ProductRequirementAnswer';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { RESPONSE } from '../../../common/PathConstants';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import Panel from '../../../components/UI/Panel/Panel';
import { useTranslation } from 'react-i18next';

export default function AnswerProduct(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();
  const existingNeeds = new Set<INeed>();

  const toOverviewPage = (): void => {
    history.push(`/${RESPONSE}/${response.specification.bank.id}`);
  };

  const renderRequirementAnswer = (
    requirementAnswer: IRequirementAnswer,
    showPercentage?: boolean
  ): ReactElement => {
    const requirementNeed = response.specification.bank.needs.find(
      (need) => need.id === requirementAnswer.requirement.needId
    );
    if (requirementNeed && !existingNeeds.has(requirementNeed)) {
      existingNeeds.add(requirementNeed);
      return (
        <div key={requirementAnswer.id}>
          {showPercentage && <CalculatedPercentage />}
          <ProductNeed need={requirementNeed} />
          <ProductRequirementAnswer requirementAnswer={requirementAnswer} />
        </div>
      );
    } else {
      return (
        <ProductRequirementAnswer
          key={requirementAnswer.id}
          requirementAnswer={requirementAnswer}
        />
      );
    }
  };

  const renderRequirements = (): (ReactElement | undefined)[] => {
    const specOrProduct =
      productIndex === -1
        ? response.specification
        : response.specification.products[productIndex];
    return specOrProduct.requirements.map((requirementId, idx) => {
      const requirementAnswer = specOrProduct.requirementAnswers.find(
        (reqAns) => reqAns.requirement.id === requirementId
      );
      if (requirementAnswer) {
        return renderRequirementAnswer(requirementAnswer, idx === 0);
      }
    });
  };

  return (
    <div>
      <ProductHeader />
      <AccordionProvider>{renderRequirements()}</AccordionProvider>
      <Panel
        sticky={true}
        panelColor={'white'}
        children={
          <Button variant="primary" onClick={toOverviewPage}>
            {t('Save')}
          </Button>
        }
      />
    </div>
  );
}
