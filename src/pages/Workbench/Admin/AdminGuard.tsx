import React from 'react';
import { Route } from 'react-router-dom';

import css from './Admin.module.scss';
import AdminSideBar from './AdminSideBar';
import CodelistGuard from './Codelist/CodelistGuard';
import ProductGuard from './Product/ProductGuard';
import PropertiesPage from './Properties/PropertiesPage';
import { PublicationsPage } from './Publications/PublicationsPage';
import { WORKBENCH } from '../../../common/PathConstants';

export default function AdminGuard(): React.ReactElement {
  return (
    <div className={css.Admin}>
      <AdminSideBar />
      <div className={css.Content}>
        <Route exact path={`/${WORKBENCH}/:projectId/admin/`}>
          <PublicationsPage />
        </Route>
        <Route exact path={`/${WORKBENCH}/:projectId/admin/codelist`}>
          <CodelistGuard />
        </Route>
        <Route exact path={`/${WORKBENCH}/:projectId/admin/products`}>
          <ProductGuard />
        </Route>
        <Route exact path={`/${WORKBENCH}/:projectId/admin/properties`}>
          <PropertiesPage />
        </Route>
      </div>
    </div>
  );
}
