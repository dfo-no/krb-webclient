import React from 'react';

import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

interface IRouteLink {
  link: string;
  name: string;
}

interface IRouteParams {
  projectId: string;
}

const renderRouteLinks = (routes: IRouteLink[], isProjectSelected: boolean) => {
  return routes.map((route) => {
    return <ListItemButton>{route.name}</ListItemButton>;
  });
};

function SideBar(): React.ReactElement {
  const match = useRouteMatch<IRouteParams>('/workbench/:projectId');
  const { t } = useTranslation();

  const currentUrl = match?.url ? match.url : '/workbench';
  const selectProject = useAppSelector((state) => state.project.project);
  const isProjectSelected = !!selectProject.id;
  const displayTitle = selectProject.id
    ? selectProject.title
    : `<${t('none selected')}>`;

  const routes: IRouteLink[] = [
    { link: `${currentUrl}`, name: `${t('Workbench')}: ${displayTitle}` },
    { link: `${currentUrl}/need`, name: t('Need') },
    { link: `${currentUrl}/need/requirement`, name: t('Requirement') },
    { link: `${currentUrl}/codelist`, name: t('Codelist') },
    { link: `${currentUrl}/product`, name: t('Products') },
    { link: `${currentUrl}/tags`, name: t('Tags') },
    { link: `${currentUrl}/inheritance`, name: t('Inheritance') }
  ];

  return <List>{renderRouteLinks(routes, isProjectSelected)}</List>;
}

export default withRouter(SideBar);
