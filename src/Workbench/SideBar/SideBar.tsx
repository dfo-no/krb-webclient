import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import css from '../SideBar/SideBar.module.scss';
import { useSelector } from 'react-redux';
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
  const projectBank = useSelector(
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
  const isProjectSelected = projectBank ? true : false;

  const displayTitle = projectBank ? projectBank.title : '<None selected>';

  const routes = [
    { link: `${currentUrl}`, name: 'Workbench: ' + displayTitle },
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
