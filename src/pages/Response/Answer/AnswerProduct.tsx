import React, { ReactElement } from 'react';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import CalculatedPercentage from './CalculatedPercentage';
import ProductRequirementAnswer from './ProductRequirementAnswer';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { useAppSelector } from '../../../store/hooks';
import { useResponseState } from '../ResponseContext';

export default function AnswerProduct(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const existingNeeds = new Set<INeed>();

  const renderRequirementAnswer = (
    requirementAnswer: IRequirementAnswer,
    first?: boolean
  ): ReactElement => {
    const requirementNeed = response.specification.bank.needs.find(
      (need) => need.id === requirementAnswer.requirement.needId
    );
    if (requirementNeed && !existingNeeds.has(requirementNeed)) {
      existingNeeds.add(requirementNeed);
      return (
        <div key={requirementAnswer.id}>
          {first && <CalculatedPercentage />}
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
      responseProductIndex === -1
        ? response.specification
        : response.specification.products[responseProductIndex];
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
    </div>
  );
}
