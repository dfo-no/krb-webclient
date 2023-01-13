import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import css from '../Stylesheets/EditorFullPage.module.scss';
import AnswerProduct from './Answer/AnswerProduct';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';
import PrefilledResponseOverview from './PrefilledResponseOverview/PrefilledResponseOverview';
import { PRODUCTS, PREFILLED_RESPONSE } from '../../common/PathConstants';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { PrefilledResponseContainer } from './PrefilledResponseContext';

export default function PrefilledResponseEditor(): ReactElement {
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();
  const { productIndex } = useProductIndexState();

  const renderProduct = () => {
    if (productIndex >= -1) {
      return <AnswerProduct />;
    }
  };

  return (
    <div className={css.EditorFullPage}>
      <Switch>
        <Route exact path={`/${PREFILLED_RESPONSE}/${prefilledResponse.id}`}>
          <SelectProvider>
            <PrefilledResponseOverview />
          </SelectProvider>
        </Route>
        <Route
          path={`/${PREFILLED_RESPONSE}/:prefilledResponseId/${PRODUCTS}/:productId`}
        >
          <SelectProvider>
            <div className={css.Content} children={renderProduct()} />
          </SelectProvider>
        </Route>
      </Switch>
    </div>
  );
}
