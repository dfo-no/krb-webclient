import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './ResponseSideBar.module.scss';
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

function ResponseSideBar(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { response } = useSelector((state: RootState) => state.response);

  const match = useRouteMatch<RouteParams>('/response/:bankId');
  const currentUrl = match?.url ? match.url : `/response/${id}`;
  const isProjectSelected = !!response.spesification.bankId;

  const routes = [
    {
      link: `${currentUrl}`,
      name: `Response: ${response.spesification.title}`
    },
    { link: `${currentUrl}/requirement`, name: 'Requirements' },
    { link: `${currentUrl}/download`, name: 'Download' },
    { link: `${currentUrl}/product`, name: 'Products' }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectSelected)}
    </Nav>
  );
}

export default withRouter(ResponseSideBar);
