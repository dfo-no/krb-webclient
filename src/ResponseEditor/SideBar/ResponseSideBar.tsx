import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import css from './ResponseSideBar.module.scss';

interface IRouteLink {
  link: string;
  name: string;
}

type TParams = { id: string };

const renderRouteLinks = (routes: IRouteLink[]) => {
  return routes.map((route) => {
    return (
      <Nav.Item key={route.name} className={`${css.sidebar__item}`}>
        <Nav.Link
          as={NavLink}
          to={route.link}
          role="link"
          activeClassName={`${css.sidebar__item__active}`}
        >
          {route.name}
        </Nav.Link>
      </Nav.Item>
    );
  });
};

function ResponseSideBar({
  match
}: RouteComponentProps<TParams>): ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const routes = [
    {
      link: `${match.url}`,
      name: `Response: ${response.spesification.title}`
    },
    { link: `${match.url}/requirement`, name: 'Requirements' },
    { link: `${match.url}/download`, name: 'Download' },
    { link: `${match.url}/product`, name: 'Products' },
    { link: `${match.url}/overview`, name: 'Overview' }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes)}
    </Nav>
  );
}

export default withRouter(ResponseSideBar);
