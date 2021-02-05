import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './SideBar.module.scss';
import { RootState } from '../../store/rootReducer';

interface IRouteLink {
  link: string;
  name: string;
}

interface RouteParams {
  projectId: string;
}

const renderRouteLinks = (routes: IRouteLink[], isProjectSelected: boolean) => {
  return routes.map((route, index) => {
    return (
      <Nav.Item key={index} className={`${css.sidebar__item}`}>
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
  /* match = {
    isExact: true,
    params: { projectId: number},
    url: "workbench/2" <!-- this is never null, otherwise this route wouldn't match
    path: "/workbench/:projectId"
  } */

  const currentUrl = match?.url ? match.url : '/workbench';
  const isProjectSelected = !!id;

  const selectProject = list.find((bank) => bank.id === id);

  const displayTitle = selectProject ? selectProject.title : '<None selected>';

  const routes = [
    { link: `${currentUrl}`, name: `Workbench: ${displayTitle}` },
    { link: `${currentUrl}/need`, name: 'Need' },
    { link: `${currentUrl}/requirement`, name: 'Requirement' },
    { link: `${currentUrl}/codelist`, name: 'Codelist' },
    { link: `${currentUrl}/product`, name: 'Products' }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column vh-100 ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectSelected)}
    </Nav>
  );
}

export default withRouter(SideBar);
