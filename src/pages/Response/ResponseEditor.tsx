import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AnswerProduct from './Answer/AnswerProduct';
import css from '../Stylesheets/EditorFullPage.module.scss';
import ResponseOverview from './Overview/ResponseOverview';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { PRODUCTS, RESPONSE } from '../../common/PathConstants';
import { useResponseState } from './ResponseContext';

export default function ResponseEditor(): React.ReactElement {
  const { response } = useResponseState();
  return (
    <div className={css.EditorFullPage}>
      <div className={css.Content}>
        <Switch>
          <Route exact path={`/${RESPONSE}/${response.specification.bank.id}`}>
            <SelectProvider>
              <ResponseOverview />
            </SelectProvider>
          </Route>
          <Route
            path={`/${RESPONSE}/${response.specification.bank.id}/${PRODUCTS}/`}
          >
            <SelectProvider>
              <AnswerProduct />
            </SelectProvider>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
