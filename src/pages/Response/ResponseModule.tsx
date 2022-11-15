import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import AnswerProduct from './Answer/AnswerProduct';
import css from '../Stylesheets/EditorFullPage.module.scss';
import ResponseOverview from './Overview/ResponseOverview';
import { RESPONSE, PRODUCTS } from '../../common/PathConstants';
import { useAppSelector } from '../../store/hooks';

export default function ResponseModule(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const [productIndex, setProductIndex] = useState(-2);
  return (
    <div className={css.EditorFullPage}>
      <div className={css.Content}>
        <Switch>
          <Route exact path={`/${RESPONSE}/${response.specification.bank.id}`}>
            <ResponseOverview setProductIndex={setProductIndex} />
          </Route>
          <Route
            path={`/${RESPONSE}/${response.specification.bank.id}/${PRODUCTS}/`}
          >
            <AnswerProduct productIndex={productIndex} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
