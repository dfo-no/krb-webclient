import React, { ReactElement } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import css from '../../Stylesheets/EditorFullPage.module.scss';
import Panel from '../../../components/UI/Panel/Panel';
import { PREFILLED_RESPONSE } from '../../../common/PathConstants';

export default function AnswerProduct(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();

  const renderNeeds = (): ReactElement[] => {
    if (productIndex === -1) {
      return Utils.findVariantsUsedBySpecification(prefilledResponse.bank).map(
        (need) => {
          return <ProductNeed key={need.id} need={need} />;
        }
      );
    } else {
      return Utils.findVariantsUsedByProduct(
        prefilledResponse.products[productIndex].originProduct,
        prefilledResponse.bank,
        prefilledResponse.products[productIndex].relatedProducts
      ).map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    }
  };

  const toOverviewPage = (): void => {
    history.push(`/${PREFILLED_RESPONSE}/${prefilledResponse.bank.id}`);
  };

  return (
    <div>
      <div className={css.overview__content}>
        <ProductHeader />
        <AccordionProvider>{renderNeeds()}</AccordionProvider>
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
