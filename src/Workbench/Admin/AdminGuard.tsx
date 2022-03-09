import { Box } from '@mui/material';
import React from 'react';
import { Route, useParams } from 'react-router';
import { useGetProjectQuery } from '../../store/api/bankApi';
import ProjectNotFound from '../Components/ProjectNotFound';
import SideBar from '../Components/SideBar';
import { IRouteParams } from '../Models/IRouteParams';
import CodelistGuard from './Codelist/CodelistGuard';
import InheritancePage from './Inheritance/InheritancePage';
import ProductGuard from './Product/ProductGuard';
import ProjectPage from './Project/ProjectPage';
import TagGuard from './Tags/TagGuard';

export default function AdminGuard(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <ProjectNotFound />;
  }

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
      </Box>
    </Box>
  );
}
