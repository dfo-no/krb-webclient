import React, { ReactElement } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ProductHeader from './ProductHeader';
import ProductRequirementAnswer from './ProductRequirementAnswer';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { RESPONSE } from '../../../common/PathConstants';
import Panel from '../../../components/UI/Panel/Panel';
import css from '../../Stylesheets/EditorFullPage.module.scss';
import { useResponseState } from '../ResponseContext';
import Utils from '../../../common/Utils';

type AnswerProductMatchParams = { productIndex: string };

type Props = RouteComponentProps<AnswerProductMatchParams>;

export default function AnswerProduct({ match }: Props): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useResponseState();
  const existingNeeds = new Set<INeed>();

  const paramsProductIndex = match.params.productIndex;
  const productIndex = Utils.isNumeric(paramsProductIndex)
    ? Number(paramsProductIndex)
    : -1;

  const toOverviewPage = (): void => {
    history.push(`/${RESPONSE}/${response.id}`);
  };

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
            productIndex={productIndex}
          />
        </div>
      );
    } else {
      return (
        <ProductRequirementAnswer
          key={requirementAnswer.id}
          requirementAnswer={requirementAnswer}
          productIndex={productIndex}
        />
      );
    }
  };

  const renderRequirements = (): (ReactElement | undefined)[] => {
    const specOrProduct =
      productIndex === -1
        ? response.specification
        : response.specification.products[productIndex];
    return specOrProduct?.requirements?.map((requirementId) => {
      const requirementAnswer = specOrProduct?.requirementAnswers?.find(
        (reqAns) => reqAns.requirement.id === requirementId
      );
      if (requirementAnswer) {
        return renderRequirementAnswer(requirementAnswer);
      }
    });
  };

  return (
    <div className={css.ProductOverview}>
      <div className={css.ProductOverview__content}>
        <ProductHeader productIndex={productIndex} />
        <div className={css.ProductRequirements}>{renderRequirements()}</div>
      </div>
      <Panel
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
