import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import css from '../Stylesheets/EditorFullPage.module.scss';
import AnswerProduct from './Answer/AnswerProduct';
import NewProduct from './NewProduct/NewProduct';
import NoProducts from './NoProducts/NoProducts';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';
import PrefilledResponseOverview from './PrefilledResponseOverview/PrefilledResponseOverview';
import { PRODUCTS, PREFILLED_RESPONSE } from '../../common/PathConstants';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { useAppSelector } from '../../store/hooks';

export default function PrefilledResponseEditor(): ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { create, productIndex } = useProductIndexState();

  const renderProduct = () => {
    if (create) {
      return <NewProduct />;
    }
    if (productIndex >= -1) {
      return <AnswerProduct />;
    }
    if (prefilledResponse.products.length == 0) {
      return <NoProducts />;
    }
  };

  return (
    <div className={css.EditorFullPage}>
      <Switch>
        <Route
          exact
          path={`/${PREFILLED_RESPONSE}/${prefilledResponse.bank.id}`}
        >
          <SelectProvider>
            <PrefilledResponseOverview />
          </SelectProvider>
        </Route>
        <Route
          path={`/${PREFILLED_RESPONSE}/${prefilledResponse.bank.id}/${PRODUCTS}/`}
        >
          <SelectProvider>
            <div className={css.Content} children={renderProduct()} />
          </SelectProvider>
        </Route>
      </Switch>
    </div>
  );
}
