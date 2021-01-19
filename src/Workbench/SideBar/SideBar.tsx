import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import css from '../SideBar/SideBar.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';

interface IRouteLink {
  link: string;
  name: string;
}

interface RouteParams {
  projectId: string;
}

const renderRouteLinks = (routes: IRouteLink[], isProjectDisabled: boolean) => {
  return routes.map((route, index) => {
    return (
      <Nav.Item key={index} className={`${css.sidebar__item}`}>
        <Nav.Link
          as={NavLink}
          to={route.link}
          role="link"
          activeClassName={`${css.sidebar__item__active}`}
          disabled={!isProjectDisabled}
        >
          {route.name}
        </Nav.Link>
      </Nav.Item>
    );
  });
};

function SideBar(): ReactElement {
  const projectNumber = useSelector(
    (state: RootState) => state.kravbank.selectedProject
  );

  let match = useRouteMatch<RouteParams>('/workbench/:projectId');
  /* match = {
    isExact: true,
    params: { projectId: number},
    url: "workbench/2" <!-- this is never null, otherwise this route wouldn't match
    path: "/workbench/:projectId"
  }*/

  const currentUrl = match?.url ? match.url : '/workbench';
  const isProjectDisabled = projectNumber ? true : false;

  const routes = [
    { link: `${currentUrl}`, name: 'Workbench: (prosjektnavn hvis valgt)' },
    { link: `${currentUrl}/need`, name: 'Need' },
    { link: `${currentUrl}/requirement`, name: 'Requirement' },
    { link: `${currentUrl}/codelist`, name: 'Codelist' },
    { link: `${currentUrl}/product`, name: 'Products' }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column vh-100 ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectDisabled)}
    </Nav>
  );
}

export default withRouter(SideBar);
