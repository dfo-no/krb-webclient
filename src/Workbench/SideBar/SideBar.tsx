import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import css from './SideBar.module.scss';
import { RootState } from '../../store/store';

interface IRouteLink {
  link: string;
  name: string;
}

interface RouteParams {
  projectId: string;
}

const renderRouteLinks = (routes: IRouteLink[], isProjectSelected: boolean) => {
  return routes.map((route) => {
    return (
      <Nav.Item key={route.name} className={`${css.sidebar__item}`}>
        <Nav.Link
          as={NavLink}
          to={route.link}
          role="link"
          activeClassName={`${css.sidebar__item__active}`}
          disabled={!isProjectSelected}
        >
          {route.name}
        </Nav.Link>
      </Nav.Item>
    );
  });
};

function SideBar(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const match = useRouteMatch<RouteParams>('/workbench/:projectId');
  const { t } = useTranslation();

  const currentUrl = match?.url ? match.url : '/workbench';
  const isProjectSelected = !!id;

  const selectProject = list.find((bank) => bank.id === id);

  const displayTitle = selectProject ? selectProject.title : '<None selected>';

  const routes = [
    { link: `${currentUrl}`, name: `Workbench: ${displayTitle}` },
    { link: `${currentUrl}/need`, name: t('Need') },
    { link: `${currentUrl}/requirement`, name: t('Requirement') },
    { link: `${currentUrl}/codelist`, name: t('Codelist') },
    { link: `${currentUrl}/product`, name: t('Products') }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectSelected)}
    </Nav>
  );
}

export default withRouter(SideBar);
