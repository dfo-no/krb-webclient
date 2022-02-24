import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Route } from 'react-router';
import theme from '../../theme';
import SideBar from '../Components/SideBar';
import CodelistGuard from './Codelist/CodelistGuard';
import InheritancePage from './Inheritance/InheritancePage';
import NeedPage from './Need/NeedPage';
import ProductGuard from './Product/ProductGuard';
import ProductPage from './Product/ProductPage';
import ProjectPage from './Project/ProjectPage';
import RequirementEditor from './Requirement/RequirementEditor';
import RequirementPage from './Requirement/RequirementPage';
import TagPage from './Tags/TagPage';

const useStyles = makeStyles({
  sideBarContainer: {
    backgroundColor: theme.palette.gray100.main
  },
  editorContainer: {
    flex: '1'
  }
});
export default function AdminGuard(): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.sideBarContainer}>
        <SideBar />
      </Box>
      <Box className={classes.editorContainer}>
        <Route exact path="/workbench/:projectId/admin/">
          <ProjectPage />
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
          <TagPage />
        </Route>
        <Route exact path="/workbench/:projectId/admin/codelist">
          <CodelistGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/products">
          <ProductPage />
        </Route>
        <Route exact path="/workbench/:projectId/admin/:productId/product">
          <ProductGuard />
        </Route>
        <Route exact path="/workbench/:projectId/admin/inheritance">
          <InheritancePage />
        </Route>
      </Box>
    </>
  );
}
