import React, { ReactElement } from 'react';

import ProductRequirementAnswer from './ProductRequirementAnswer';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { GENERAL } from '../../../common/PathConstants';
import css from '../../Stylesheets/EditorFullPage.module.scss';
import { useResponseState } from '../ResponseContext';
import Utils from '../../../common/Utils';
import { DFOAccordion } from '../../../components/DFOAccordion/DFOAccordion';

type Props = { productId: string };

export default function AnswerProducts({
  productId,
}: Props): React.ReactElement {
  const { response } = useResponseState();
  const existingNeeds = new Set<INeed>();

  const renderRequirementAnswer = (
    requirementAnswer: IRequirementAnswer
  ): ReactElement => {
    const requirementNeed = response.specification.bank.needs.find(
      (need) => need.id === requirementAnswer.requirement.needId
    );
    if (requirementNeed && !existingNeeds.has(requirementNeed)) {
      existingNeeds.add(requirementNeed);
      return (
        <div key={requirementAnswer.id}>
          <span className={css.NeedTittle}>{requirementNeed.title}</span>
          <ProductRequirementAnswer
            requirementAnswer={requirementAnswer}
            productId={productId}
          />
        </div>
      );
    } else {
      return (
        <ProductRequirementAnswer
          key={requirementAnswer.id}
          requirementAnswer={requirementAnswer}
          productId={productId}
        />
      );
    }
  };

  const renderRequirements = (): (ReactElement | undefined)[] => {
    const specOrProduct =
      productId === GENERAL
        ? response.specification
        : Utils.ensure(
            response.specification.products.find(
              (product) => product.id === productId
            ),
            `Something went wrong, the product with productId ${productId} was not in the list.`
          );
    return specOrProduct?.requirements?.map((requirementId) => {
      const requirementAnswer = specOrProduct?.requirementAnswers?.find(
        (reqAns) => reqAns.requirement.id === requirementId
      );
      if (requirementAnswer) {
        return renderRequirementAnswer(requirementAnswer);
      }
    });
  };

  const body = (): ReactElement => {
    return <>{renderRequirements()}</>;
  };

  if (productId == GENERAL) {
    return (
      <div className={css.AnswerProduct}>
        <DFOAccordion
          className={css.Accordion}
          eventKey={productId}
          header={<></>}
          body={body()}
        />
      </div>
    );
  }

  return <div className={css.AnswerProduct}>{body()}</div>;
}
