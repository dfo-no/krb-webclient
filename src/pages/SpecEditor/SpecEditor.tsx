import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import css from '../Stylesheets/Editor.module.scss';
import EditProduct from './EditProduct/EditProduct';
import LoaderSpinner from '../../common/LoaderSpinner';
import NewProduct from './NewProduct/NewProduct';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { useSpecificationState } from './SpecificationContext';
import { PRODUCTS, SPECIFICATION } from '../../common/PathConstants';

export default function SpecEditor(): ReactElement {
  const { specification } = useSpecificationState();

  if (!specification.id) {
    return <LoaderSpinner />;
  }

  return (
    <div className={css.Editor}>
      <div className={css.Content}>
        <Switch>
          <Route exact path={`/${SPECIFICATION}/:specId`}>
            <SelectProvider>
              <NewProduct />
            </SelectProvider>
          </Route>
          <Route path={`/${SPECIFICATION}/:specId/${PRODUCTS}/:productId`}>
            <SelectProvider>
              <EditProduct />
            </SelectProvider>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
