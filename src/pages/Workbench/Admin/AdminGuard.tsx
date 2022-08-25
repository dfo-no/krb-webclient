import Box from '@mui/material/Box';
import React from 'react';
import { Route } from 'react-router';

import AdminSideBar from './AdminSideBar';
import CodelistGuard from './Codelist/CodelistGuard';
import InheritancePage from './Inheritance/InheritancePage';
import ProductGuard from './Product/ProductGuard';
import PropertiesPage from './Properties/PropertiesPage';
import PublicationsPage from './Publications/PublicationsPage';
import TagGuard from './Tags/TagGuard';

export default function AdminGuard(): React.ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <AdminSideBar />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100%',
          width: '100%',
          background: 'var(--secondary-background-color)'
        }}
      >
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
        <Route exact path="/workbench/:projectId/admin/inheritance">
          <InheritancePage />
        </Route>
        <Route exact path="/workbench/:projectId/admin/properties">
          <PropertiesPage />
        </Route>
      </Box>
    </Box>
  );
}
