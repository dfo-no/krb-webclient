import { Box } from '@mui/material';
import React from 'react';
import { Route } from 'react-router';
import SideBar from '../Components/SideBar';
import CodelistGuard from './Codelist/CodelistGuard';
import InheritancePage from './Inheritance/InheritancePage';
import NeedPage from './Need/NeedPage';
import ProductGuard from './Product/ProductGuard';
import ProjectGuard from './Project/ProjectGuard';
import RequirementEditor from './Requirement/RequirementEditor';
import RequirementPage from './Requirement/RequirementPage';
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
          <ProjectGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/need">
          <NeedPage />
        </Route>
        <Route
          exact
          path="/workbench/:projectId/admin/need/:needId/requirement"
        >
          <RequirementPage />
        </Route>
        <Route
          exact
          path="/workbench/:projectId/admin/need/:needId/requirement/:requirementId/edit"
        >
          <RequirementEditor />
        </Route>
        <Route exact path="/workbench/:projectId/admin/need/requirement">
          <RequirementPage />
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
        <Route exact path="/workbench/:projectId/admin/:productId/product">
          <ProductGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/inheritance">
          <InheritancePage />
        </Route>
      </Box>
    </Box>
  );
}
