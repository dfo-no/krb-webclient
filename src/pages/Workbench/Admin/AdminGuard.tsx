import React from 'react';
import { Route } from 'react-router-dom';

import css from './Admin.module.scss';
import AdminSideBar from './AdminSideBar';
import CodelistGuard from './Codelist/CodelistGuard';
import ProductGuard from './Product/ProductGuard';
import PropertiesPage from './Properties/PropertiesPage';
import TagGuard from './Tags/TagGuard';
import { PublicationsPage } from './Publications/PublicationsPage';

export default function AdminGuard(): React.ReactElement {
  return (
    <div className={css.Admin}>
      <AdminSideBar />
      <div className={css.Content}>
        <Route exact path="/workbench/:projectId/admin/">
          <PublicationsPage />
        </Route>
        <Route exact path="/workbench/:projectId/admin/tags">
          <TagGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/codelist">
          <CodelistGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/products">
          <ProductGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/properties">
          <PropertiesPage />
        </Route>
      </div>
    </div>
  );
}
