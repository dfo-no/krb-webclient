import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import css from '../SideBar/SideBar.module.scss';

interface IRouteLink {
  link: string;
  name: string;
}

const routes = [
  { link: '/workbench', name: 'Workbench: (prosjektnavn hvis valgt)' },
  { link: '/workbench/need', name: 'Need' },
  { link: '/workbench/requirement', name: 'Requirement' },
  { link: '/workbench/codelist', name: 'Codelist' },
  { link: '/workbench/product', name: 'Products' }
];

const renderRouteLinks = (routes: IRouteLink[]) => {
  return routes.map((route, index) => {
    return (
      <Nav.Item key={index} className={`${css.sidebar__item}`}>
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

function SideBar(): ReactElement {
  return (
    <>
      <Nav className={`sidebar col-md-12 flex-column vh-100 ${css.sidebar}`}>
        {renderRouteLinks(routes)}
      </Nav>
    </>
  );
}

export default withRouter(SideBar);
