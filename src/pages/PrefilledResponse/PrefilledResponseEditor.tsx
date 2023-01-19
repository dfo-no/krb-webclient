import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import css from '../Stylesheets/EditorFullPage.module.scss';
import AnswerProduct from './Answer/AnswerProduct';
import PrefilledResponseOverview from './PrefilledResponseOverview/PrefilledResponseOverview';
import { PRODUCTS, PREFILLED_RESPONSE } from '../../common/PathConstants';
import { PrefilledResponseContainer } from './PrefilledResponseContext';

export default function PrefilledResponseEditor(): ReactElement {
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();

  return (
    <div className={css.EditorFullPage}>
      <div className={css.Content}>
        <Switch>
          <Route
            exact
            path={`/${PREFILLED_RESPONSE}/${prefilledResponse.id}`}
            component={PrefilledResponseOverview}
          />
          <Route
            path={`/${PREFILLED_RESPONSE}/:prefilledResponseId/${PRODUCTS}/:productId`}
            component={AnswerProduct}
          />
        </Switch>
      </div>
    </div>
  );
}
