import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import AnswerProduct from './Answer/AnswerProduct';
import css from '../Stylesheets/EditorFullPage.module.scss';
import ResponseOverview from './Overview/ResponseOverview';
import { PRODUCTS } from '../../common/PathConstants';

export type MatchParams = { responseId: string };
type Props = RouteComponentProps<MatchParams>;

export default function ResponseEditor({ match }: Props): React.ReactElement {
  console.log('match:', match);
  return (
    <div className={css.EditorFullPage}>
      <div className={css.Content}>
        <Switch>
          <Route exact path={`${match.path}`}>
            <ResponseOverview />
          </Route>
          <Route
            path={`${match.path}/${PRODUCTS}/:productIndex`}
            component={AnswerProduct}
          />
        </Switch>
      </div>
    </div>
  );
}
