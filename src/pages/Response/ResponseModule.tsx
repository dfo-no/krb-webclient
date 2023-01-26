import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import css from '../Stylesheets/EditorFullPage.module.scss';
import ResponseOverview from './Overview/ResponseOverview';
import { ResponseProvider } from './ResponseContext';

export type MatchParams = { responseId: string; productId: string };
type Props = RouteComponentProps<MatchParams>;

export default function ResponseModule({
  ...props
}: Props): React.ReactElement {
  return (
    <ResponseProvider {...props}>
      <div className={css.EditorFullPage}>
        <div className={css.Content}>
          <Switch>
            <Route exact path={`${props.match.path}`}>
              <ResponseOverview />
            </Route>
          </Switch>
        </div>
      </div>
    </ResponseProvider>
  );
}
