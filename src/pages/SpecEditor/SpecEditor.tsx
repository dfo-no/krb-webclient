import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import EditProduct from './EditProduct/ProductHeader/EditProduct';
import css from '../Stylesheets/EditorFullPage.module.scss';
import LoaderSpinner from '../../common/LoaderSpinner';
import SpecificationOverview from './SpecificationOverview/SpecificationOverview';
import { SelectProvider } from '../Workbench/Create/SelectContext';
import { useSpecificationState } from './SpecificationContext';
import { PRODUCTS, SPECIFICATION } from '../../common/PathConstants';

export default function SpecEditor(): ReactElement {
  const { specification } = useSpecificationState();

  if (!specification.id) {
    return <LoaderSpinner />;
  }

  return (
    <div className={css.EditorFullPage}>
      <div className={css.Content}>
        <Switch>
          <Route exact path={`/${SPECIFICATION}/:specId`}>
            <SelectProvider>
              <SpecificationOverview />
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
