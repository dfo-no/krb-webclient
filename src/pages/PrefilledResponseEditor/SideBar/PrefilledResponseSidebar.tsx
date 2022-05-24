import Nav from 'react-bootstrap/Nav';
import React, { ReactElement } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { withRouter } from 'react-router';

import css from './PrefilledResponseSideBar.module.scss';
import { useAppSelector } from '../../../store/hooks';

interface IRouteLink {
  link: string;
  name: string;
}

interface IRouteParams {
  projectId: string;
}

const renderRouteLinks = (
  routes: IRouteLink[],
  isProjectSelected: boolean
): ReactElement[] => {
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

function PrefilledResponseSideBar(): ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const match = useRouteMatch<IRouteParams>('/prefilledresponse/:bankId');
  const currentUrl = match?.url ? match.url : `/prefilledresponse/${id}`;
  const isProjectSelected = !!prefilledResponse.bank.id;

  const routes = [
    {
      link: `${currentUrl}`,
      name: `Prefilled Response: ${prefilledResponse.bank.title}`
    },
    { link: `${currentUrl}/requirement`, name: 'Requirements' },
    { link: `${currentUrl}/download`, name: 'Download' },
    { link: `${currentUrl}/product`, name: 'Products' },
    { link: `${currentUrl}/overview`, name: 'Overview' }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectSelected)}
    </Nav>
  );
}

export default withRouter(PrefilledResponseSideBar);
