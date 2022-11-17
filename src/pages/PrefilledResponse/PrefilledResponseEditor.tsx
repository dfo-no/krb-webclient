import React, { ReactElement, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import css from '../Stylesheets/EditorFullPage.module.scss';
import AnswerProduct from './Answer/AnswerProduct';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';
import PrefilledResponseOverview from './PrefilledResponseOverview/PrefilledResponseOverview';
import { PRODUCTS, PREFILLED_RESPONSE } from '../../common/PathConstants';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { useAppSelector } from '../../store/hooks';
import { HeaderContainer } from '../../components/Header/HeaderContext';

export default function PrefilledResponseEditor(): ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();
  const { setTitle } = HeaderContainer.useContainer();

  useEffect(() => {
    setTitle(prefilledResponse.bank.title);
    return function cleanup() {
      setTitle('');
    };
  }, [setTitle, prefilledResponse]);

  const renderProduct = () => {
    if (productIndex >= -1) {
      return <AnswerProduct />;
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
