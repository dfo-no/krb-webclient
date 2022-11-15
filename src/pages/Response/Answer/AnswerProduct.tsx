import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import ProductRequirementAnswer from './ProductRequirementAnswer';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { useAppSelector } from '../../../store/hooks';
import EditResponseProduct from '../EditResponseProduct/EditResponseProduct';
import { RESPONSE } from '../../../common/PathConstants';
import Panel from '../../../components/UI/Panel/Panel';
import css from '../../Stylesheets/EditorFullPage.module.scss';
import { CombinedProductOrGeneral, GENERAL } from '../ResponseModule';

type Props = {
  product: CombinedProductOrGeneral;
};

export default function AnswerProduct({ product }: Props): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useAppSelector((state) => state.response);
  const existingNeeds = new Set<INeed>();

  const toOverviewPage = (): void => {
    history.push(`/${RESPONSE}/${response.specification.bank.id}`);
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
          <ProductNeed need={requirementNeed} />
          <ProductRequirementAnswer
            requirementAnswer={requirementAnswer}
            product={product}
          />
        </div>
      );
    } else {
      return (
        <ProductRequirementAnswer
          key={requirementAnswer.id}
          requirementAnswer={requirementAnswer}
          product={product}
        />
      );
    }
  };

  const renderRequirements = (): (ReactElement | undefined)[] => {
    const specOrProduct =
      product === GENERAL
        ? response.specification
        : product.specificationProduct;
    return specOrProduct.requirements.map((requirementId) => {
      const requirementAnswer = specOrProduct.requirementAnswers.find(
        (reqAns) => reqAns.requirement.id === requirementId
      );
      if (requirementAnswer) {
        return renderRequirementAnswer(requirementAnswer);
      }
    });
  };

  return (
    <div>
      <div className={css.overview__content}>
        <ProductHeader product={product} />
        {product !== GENERAL && <EditResponseProduct product={product} />}
        <AccordionProvider>{renderRequirements()}</AccordionProvider>
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
