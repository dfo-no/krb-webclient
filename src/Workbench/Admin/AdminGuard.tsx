import Box from '@mui/material/Box';
import React from 'react';
import { Route } from 'react-router';
import SideBar from '../Components/SideBar';
import CodelistGuard from './Codelist/CodelistGuard';
import InheritancePage from './Inheritance/InheritancePage';
import ProductGuard from './Product/ProductGuard';
import ProjectPage from './Project/ProjectPage';
import PropertiesPage from './Properties/PropertiesPage';
import TagGuard from './Tags/TagGuard';

export default function AdminGuard(): React.ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%'
      }}
    >
      <SideBar />
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%'
        }}
      >
        <Route exact path="/workbench/:projectId/admin/">
          <ProjectPage />
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
