import React, { ReactElement, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import css from '../Stylesheets/EditorFullPage.module.scss';
import AnswerProduct from './Answer/AnswerProduct';
import { useProductIndexState } from '../../components/ProductIndexContext/ProductIndexContext';
import PrefilledResponseOverview from './PrefilledResponseOverview/PrefilledResponseOverview';
import { PRODUCTS, PREFILLED_RESPONSE } from '../../common/PathConstants';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { HeaderContainer } from '../../components/Header/HeaderContext';
import { PrefilledResponseContainer } from './PrefilledResponseContext';
import { PrefilledResponseRouteParams } from '../../models/PrefilledResponseRouteParams';

export default function PrefilledResponseEditor(): ReactElement {
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();
  const { productIndex } = useProductIndexState();
  const { setTitle } = HeaderContainer.useContainer();

  useEffect(() => {
    console.log(
      'in PrefilledResponseEditor, prefilledResponse = ',
      prefilledResponse
    );

    setTitle(prefilledResponse.bank.title);
    return function cleanup() {
      setTitle('');
    };
  }, [setTitle, prefilledResponse]);
  const { productId } = useParams<PrefilledResponseRouteParams>();

  const renderProduct = () => {
    console.log('productId = ', productId);

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
